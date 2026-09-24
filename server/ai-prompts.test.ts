import { describe, expect, it } from "vitest";
import {
  buildTutorSystemPrompt,
  DEFAULT_TUTOR_SYSTEM_PROMPT,
  generateFallbackTutorReply,
} from "./aiPrompts";

describe("AI Tutor System Prompts", () => {
  it("provides a valid default system prompt", () => {
    expect(DEFAULT_TUTOR_SYSTEM_PROMPT).toContain("Neura AI Tutor");
    expect(DEFAULT_TUTOR_SYSTEM_PROMPT).toContain("PEDAGOGICAL GUIDELINES:");
  });

  it("builds a contextual prompt with lesson information", () => {
    const prompt = buildTutorSystemPrompt({
      topic: "Fractions",
      lessonTitle: "Visualizing Fractions: Halves & Quarters",
      lessonContent: "Fractions represent parts of a whole.",
      currentMode: "visual",
    });

    expect(prompt).toContain("You are the Neura AI Tutor");
    expect(prompt).toContain("Topic: Fractions");
    expect(prompt).toContain("Lesson Title: Visualizing Fractions: Halves & Quarters");
    expect(prompt).toContain("Fractions represent parts of a whole.");
    expect(prompt).toContain("Current Learning Mode: visual");
    expect(prompt).toContain("PEDAGOGICAL GUIDELINES:");
    expect(prompt).toContain("QUIZ HANDLING");
  });

  it("incorporates active quiz questions and multiple-choice options into system prompt", () => {
    const prompt = buildTutorSystemPrompt({
      topic: "Plant Life Cycles",
      lessonTitle: "Seeds and Germination",
      lessonContent: "Seeds need water, warmth, and oxygen.",
      currentQuestion: {
        question: "What triggers germination?",
        options: ["Moisture and warmth", "Complete darkness", "High nitrogen"],
      },
    });

    expect(prompt).toContain("Active Quiz Question: \"What triggers germination?\"");
    expect(prompt).toContain("(Options: Moisture and warmth, Complete darkness, High nitrogen)");
    expect(prompt).toContain("NEVER give away the correct answer or choice directly");
  });

  it("generates a structured educational reply for custom non-curriculum topics", () => {
    const reply1 = generateFallbackTutorReply({
      topic: "Quantum Computing",
      lessonTitle: "Exploring Quantum Computing",
      message: "Explain simply for a beginner",
    });

    expect(reply1).toContain("Understanding Quantum Computing Simply");
    expect(reply1).toContain("Quantum Computing");

    const reply2 = generateFallbackTutorReply({
      topic: "Black Holes",
      lessonTitle: "Exploring Black Holes",
      message: "What are the 3 core principles?",
    });

    expect(reply2).toContain("3 Core Principles of Black Holes");
    expect(reply2).toContain("Black Holes");

    const reply3 = generateFallbackTutorReply({
      topic: "Artificial Intelligence",
      lessonTitle: "Exploring Artificial Intelligence",
      message: "Give me a real-world example",
    });

    expect(reply3).toContain("Real-World Example of Artificial Intelligence");
    expect(reply3).toContain("Artificial Intelligence");
  });
});

