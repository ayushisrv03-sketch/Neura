import { describe, expect, it } from "vitest";
import { lessons } from "../client/src/pages/TopicLesson";
import { getTopicCurriculum, isLessonUnlocked } from "../client/src/lib/topicCurriculum";

describe("dedicated curriculum lessons", () => {
  it("provides a lesson for every Maths and Science topic", () => {
    expect(Object.keys(lessons)).toEqual([
      "Fractions",
      "Linear equations",
      "Geometry",
      "Photosynthesis",
      "States of matter",
      "Parts of a plant",
    ]);
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

  it("provides dynamic curriculum for Fractions and other topics", () => {
    const fractionsCurr = getTopicCurriculum("Fractions");
    expect(fractionsCurr.lessons.length).toBe(12);
    expect(fractionsCurr.lessons[0].title).toContain("Understanding Fractions");
    expect(fractionsCurr.lessons[11].title).toContain("Real-World Fraction Problems");

    const geometryCurr = getTopicCurriculum("Geometry");
    expect(geometryCurr.lessons.length).toBe(14);
  });
});

