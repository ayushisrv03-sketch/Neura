import { COOKIE_NAME } from "@shared/const";
import { z } from "zod";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { getDashboardData, recordLearningMode, recordStudySession, resetDashboardData, setTaskStatus } from "./db";

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
});

export type AppRouter = typeof appRouter;
