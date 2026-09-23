import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { ENV } from "./_core/env";
import { invokeLLM, type Message } from "./_core/llm";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { getDashboardData, recordLearningMode, recordStudySession, resetDashboardData, setTaskStatus } from "./db";
import { buildTutorSystemPrompt } from "./aiPrompts";

function effectiveUserId(user: { id: number } | null | undefined) {
  // Guests get an isolated empty workspace (id 0), never another user's seeded data.
  return user?.id ?? 0;
}

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  dashboard: router({
    overview: publicProcedure.query(async ({ ctx }) => getDashboardData(effectiveUserId(ctx.user))),
    resetProgress: publicProcedure.mutation(async ({ ctx }) => {
      await resetDashboardData(effectiveUserId(ctx.user));
      return { success: true } as const;
    }),
    completeTask: publicProcedure
      .input(z.object({ taskId: z.number().int().positive(), completed: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        await setTaskStatus(effectiveUserId(ctx.user), input.taskId, input.completed);
        return { success: true } as const;
      }),
    logStudy: publicProcedure
      .input(z.object({ courseId: z.number().int().positive(), minutes: z.number().int().min(5).max(240) }))
      .mutation(async ({ ctx, input }) => {
        await recordStudySession(effectiveUserId(ctx.user), input.courseId, input.minutes);
        return { success: true } as const;
      }),
    recordLearningMode: publicProcedure
      .input(z.object({ courseId: z.number().int().positive(), topic: z.string().min(1), mode: z.string().min(1).max(40) }))
      .mutation(async ({ ctx, input }) => {
        await recordLearningMode(effectiveUserId(ctx.user), input.courseId, input.topic, input.mode);
        return { success: true } as const;
      }),
  }),
  ai: router({
    tutorChat: publicProcedure
      .input(
        z.object({
          topic: z.string(),
          lessonTitle: z.string(),
          lessonContent: z.string(),
          currentMode: z.string().optional(),
          currentQuestion: z
            .object({
              question: z.string(),
              options: z.array(z.string()).optional(),
            })
            .optional(),
          conversation: z.array(
            z.object({
              role: z.enum(["user", "assistant"]),
              content: z.string(),
            })
          ),
          message: z.string().min(1),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const systemPrompt = buildTutorSystemPrompt(input);

          const messages: Message[] = [
            { role: "system", content: systemPrompt },
            ...input.conversation.map((msg) => ({
              role: msg.role as "user" | "assistant",
              content: msg.content,
            })),
            { role: "user", content: input.message },
          ];

          const response = await invokeLLM({ messages });
          const firstChoice = response.choices?.[0]?.message?.content;
          let reply = "";
          if (typeof firstChoice === "string") {
            reply = firstChoice;
          } else if (Array.isArray(firstChoice)) {
            reply = firstChoice
              .map((part) => (part.type === "text" ? part.text : ""))
              .join("");
          }

          if (!reply.trim()) {
            reply =
              "I'm here to help! Could you please ask that in another way or specify which part of the lesson you'd like to explore?";
          }

          return { reply };
        } catch (error: any) {
          console.error("[AI Tutor] Error in tutorChat procedure:", error);
          const isMissingKey = !ENV.forgeApiKey || error?.message?.includes("OPENAI_API_KEY is not configured");
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: isMissingKey
              ? "OpenAI API key is missing. Please add OPENAI_API_KEY to your .env file and restart the server."
              : (error?.message ?? "Sorry, I couldn't connect to your AI Tutor right now. Try again in a moment."),
          });
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
