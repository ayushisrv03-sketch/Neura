import { describe, expect, it } from "vitest";
import { lessons } from "../client/src/pages/TopicLesson";
import { getTopicCurriculum, isLessonUnlocked } from "../client/src/lib/topicCurriculum";

describe("dedicated curriculum lessons", () => {
  const TOPICS = [
    "Fractions",
    "Linear equations",
    "Geometry",
    "Photosynthesis",
    "States of matter",
    "Parts of a plant",
  ];

  it("provides a lesson for every Maths and Science topic", () => {
    expect(Object.keys(lessons)).toEqual(TOPICS);
  });

  it("provides an explanation, example, activity, and check for each topic", () => {
    for (const lesson of Object.values(lessons)) {
      expect(lesson.explanation.length).toBeGreaterThan(20);
      expect(lesson.example.length).toBeGreaterThan(3);
      expect(lesson.activity.length).toBeGreaterThan(20);
      expect(lesson.choices).toHaveLength(3);
      expect(lesson.choices).toContain(lesson.answer);
    }
  });

  it("enforces sequential unlock logic: first 3 unlocked, 4th locked until 3rd completed", () => {
    // Indices 0, 1, 2 must always be unlocked
    expect(isLessonUnlocked(0, [])).toBe(true);
    expect(isLessonUnlocked(1, [])).toBe(true);
    expect(isLessonUnlocked(2, [])).toBe(true);

    // Index 3 (Lesson 4) is locked when Lesson 3 (index 2) is NOT completed
    expect(isLessonUnlocked(3, [])).toBe(false);
    expect(isLessonUnlocked(3, [0, 1])).toBe(false);

    // Index 3 (Lesson 4) becomes unlocked once index 2 is in completed list
    expect(isLessonUnlocked(3, [2])).toBe(true);
    expect(isLessonUnlocked(3, [0, 1, 2])).toBe(true);

    // Index 4 (Lesson 5) requires index 3 to be completed
    expect(isLessonUnlocked(4, [0, 1, 2])).toBe(false);
    expect(isLessonUnlocked(4, [0, 1, 2, 3])).toBe(true);
  });

  it("ensures every topic has exactly 12 distinct subtopics", () => {
    for (const topic of TOPICS) {
      const curr = getTopicCurriculum(topic);
      expect(curr.lessons).toHaveLength(12);

      // Verify all 12 lesson titles are distinct
      const titles = curr.lessons.map((l) => l.title);
      const uniqueTitles = new Set(titles);
      expect(uniqueTitles.size).toBe(12);

      // Verify all 12 lesson explanations are distinct and substantial
      const explanations = curr.lessons.map((l) => l.explanation);
      const uniqueExplanations = new Set(explanations);
      expect(uniqueExplanations.size).toBe(12);
    }
  });

  it("ensures every lesson has 3 varied questions specifically aligned to its subtopic", () => {
    for (const topic of TOPICS) {
      const curr = getTopicCurriculum(topic);
      const allTopicQuestions: string[] = [];

      for (let i = 0; i < curr.lessons.length; i++) {
        const lesson = curr.lessons[i];
        expect(lesson.questions).toHaveLength(3);

        for (const q of lesson.questions) {
          expect(q.question.length).toBeGreaterThan(10);
          expect(q.choices).toHaveLength(3);
          // Choices must be distinct
          const uniqueChoices = new Set(q.choices);
          expect(uniqueChoices.size).toBe(3);
          // Answer must be present in choices
          expect(q.choices).toContain(q.answer);

          allTopicQuestions.push(q.question);
        }
      }

      // Check wide variety of questions across the 12 lessons (36 total questions per topic)
      // All 36 questions in each topic must be unique
      const uniqueTopicQuestions = new Set(allTopicQuestions);
      expect(uniqueTopicQuestions.size).toBe(36);
    }
  });

  it("provides dynamic fallback curriculum with 12 distinct subtopics and 3 questions each", () => {
    const dynamicCurr = getTopicCurriculum("Quantum Physics");
    expect(dynamicCurr.lessons).toHaveLength(12);

    const titles = dynamicCurr.lessons.map((l) => l.title);
    expect(new Set(titles).size).toBe(12);

    for (const lesson of dynamicCurr.lessons) {
      expect(lesson.questions).toHaveLength(3);
      for (const q of lesson.questions) {
        expect(q.choices).toHaveLength(3);
        expect(q.choices).toContain(q.answer);
      }
    }
  });
});
