import { describe, expect, it } from "vitest";
import {
  calculateStrategyScore,
  recordStrategyObservationsBatch,
  getStudentStrategyProfile,
} from "./db";
import { appRouter } from "./routers";

describe("Adaptive Baseline Quiz & Strategy Profiling", () => {
  it("calculates balanced scores based on accuracy, response time, attempts, and hints", () => {
    // Fast, correct, 1st attempt, no hint
    const strongObs = {
      concept: "Halves & Quarters",
      strategy: "visual",
      correct: 1,
      timeTaken: 10,
      attemptCount: 1,
      hintUsed: 0,
    };
    const strongScore = calculateStrategyScore(strongObs);
    expect(strongScore).toBe(100); // 50 + 20 + 15 + 15 = 100

    // Slower, correct, 2 attempts, hint used
    const mediumObs = {
      concept: "Fractions on a number line",
      strategy: "step-by-step",
      correct: 1,
      timeTaken: 30,
      attemptCount: 2,
      hintUsed: 1,
    };
    const mediumScore = calculateStrategyScore(mediumObs);
    expect(mediumScore).toBe(70); // 50 + 15 + 5 + 0 = 70

    // Incorrect, 45 seconds, 3 attempts
    const struggleObs = {
      concept: "Equivalent Fractions",
      strategy: "socratic",
      correct: 0,
      timeTaken: 50,
      attemptCount: 3,
      hintUsed: 1,
    };
    const struggleScore = calculateStrategyScore(struggleObs);
    expect(struggleScore).toBe(5); // 10 - 5 + 0 + 0 = 5
  });

  it("records a 5-question baseline assessment across distinct concepts and builds a profile", async () => {
    const userId = 999;
    const topic = "Fractions";
    const observations = [
      {
        concept: "Visualizing Fractions",
        strategy: "visual",
        correct: 1,
        timeTaken: 12,
        attemptCount: 1,
        hintUsed: 0,
      },
      {
        concept: "Step-by-step Simplification",
        strategy: "step-by-step",
        correct: 1,
        timeTaken: 22,
        attemptCount: 1,
        hintUsed: 0,
      },
      {
        concept: "Real World Pizza Sharing",
        strategy: "example-based",
        correct: 1,
        timeTaken: 14,
        attemptCount: 1,
        hintUsed: 0,
      },
      {
        concept: "Fraction Definitions",
        strategy: "textual",
        correct: 0,
        timeTaken: 40,
        attemptCount: 2,
        hintUsed: 1,
      },
      {
        concept: "Socratic Guided Discovery",
        strategy: "socratic",
        correct: 1,
        timeTaken: 30,
        attemptCount: 2,
        hintUsed: 0,
      },
    ];

    const result = await recordStrategyObservationsBatch(userId, topic, observations);

    expect(result.preferredStrategy).toBeDefined();
    expect(result.strategyScores).toHaveProperty("visual");
    expect(result.strategyScores).toHaveProperty("step-by-step");
    expect(result.strategyScores).toHaveProperty("example-based");
    expect(result.strategyScores).toHaveProperty("textual");
    expect(result.strategyScores).toHaveProperty("socratic");
    expect(result.confidenceScore).toBe(100);

    const savedProfile = await getStudentStrategyProfile(userId, topic);
    expect(savedProfile).not.toBeNull();
    expect(savedProfile?.preferredStrategy).toBe(result.preferredStrategy);
  });

  it("allows tRPC adaptive caller to submit baseline and retrieve strategy profile", async () => {
    const caller = appRouter.createCaller({
      user: { id: 101, openId: "test_baseline_user", role: "user" },
      req: {} as any,
      res: { clearCookie: () => {} } as any,
    });

    const submitRes = await caller.adaptive.submitBaselineAssessment({
      topic: "Photosynthesis",
      assessmentId: "test_quiz_101",
      observations: [
        {
          concept: "Light Absorption",
          strategy: "visual",
          correct: 1,
          timeTaken: 15,
        },
        {
          concept: "Chemical Equation Steps",
          strategy: "step-by-step",
          correct: 1,
          timeTaken: 18,
        },
        {
          concept: "Solar Panel Analogy",
          strategy: "example-based",
          correct: 1,
          timeTaken: 10,
        },
        {
          concept: "Chloroplast Vocabulary",
          strategy: "textual",
          correct: 1,
          timeTaken: 25,
        },
        {
          concept: "Stomata Gas Exchange",
          strategy: "socratic",
          correct: 1,
          timeTaken: 20,
        },
      ],
    });

    expect(submitRes.success).toBe(true);
    expect(submitRes.preferredStrategy).toBeDefined();

    const getRes = await caller.adaptive.getStrategyProfile({
      topic: "Photosynthesis",
    });

    expect(getRes.profile).not.toBeNull();
    expect(getRes.profile?.preferredStrategy).toBe(submitRes.preferredStrategy);
  });
});
