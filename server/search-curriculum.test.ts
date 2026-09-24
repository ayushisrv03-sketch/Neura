import { describe, expect, it } from "vitest";
import {
  getAllPredefinedLessons,
  getExactPredefinedTopicName,
  getTopicCurriculum,
  isPredefinedTopic,
  TOPIC_CURRICULA,
} from "../client/src/lib/topicCurriculum";

describe("Dashboard Search & Curriculum Verification", () => {
  const PREDEFINED = [
    "Fractions",
    "Linear equations",
    "Geometry",
    "Photosynthesis",
    "States of matter",
    "Parts of a plant",
  ];

  it("identifies all predefined topics accurately and case-insensitively", () => {
    for (const topic of PREDEFINED) {
      expect(isPredefinedTopic(topic)).toBe(true);
      expect(isPredefinedTopic(topic.toLowerCase())).toBe(true);
      expect(isPredefinedTopic(topic.toUpperCase())).toBe(true);
      expect(getExactPredefinedTopicName(topic.toLowerCase())).toBe(topic);
    }
  });

  it("returns false for non-curriculum topics and directs them to custom handling", () => {
    const nonCurriculumTopics = [
      "Calculus",
      "World War 2",
      "Quantum Mechanics",
      "Machine Learning",
      "Organic Chemistry",
      "Black Holes",
      "French Revolution",
    ];

    for (const topic of nonCurriculumTopics) {
      expect(isPredefinedTopic(topic)).toBe(false);
      expect(getExactPredefinedTopicName(topic)).toBeNull();
    }
  });

  it("retrieves all 72 lessons across all predefined topics with correct metadata", () => {
    const lessons = getAllPredefinedLessons();
    expect(lessons).toHaveLength(72); // 6 topics * 12 lessons

    for (const item of lessons) {
      expect(item.lessonNumber).toBeGreaterThanOrEqual(1);
      expect(item.lessonNumber).toBeLessThanOrEqual(12);
      expect(PREDEFINED).toContain(item.topic);
      expect(item.title.length).toBeGreaterThan(3);
      expect(item.subject).toMatch(/Maths|Science/);
    }
  });

  it("dynamically generates a structured curriculum for non-predefined topics so AI Tutor can teach it", () => {
    const customCurriculum = getTopicCurriculum("Quantum Physics");
    expect(customCurriculum).toBeDefined();
    expect(customCurriculum.lessons).toHaveLength(12);
    expect(customCurriculum.eyebrow).toContain("Quantum Physics");
    expect(customCurriculum.lessons[0].title).toContain("Quantum Physics");
    expect(customCurriculum.lessons[0].question).toContain("Quantum Physics");
  });

  it("supports lesson search matching within predefined curriculum", () => {
    const allLessons = getAllPredefinedLessons();

    // Searching for "Equivalent" should match Lesson 4 of Fractions
    const equivalentMatches = allLessons.filter((l) =>
      l.title.toLowerCase().includes("equivalent")
    );
    expect(equivalentMatches.length).toBeGreaterThan(0);
    expect(equivalentMatches[0].topic).toBe("Fractions");
    expect(equivalentMatches[0].lessonNumber).toBe(4);

    // Searching for "Chloroplast" should match Photosynthesis
    const chloroplastMatches = allLessons.filter(
      (l) =>
        l.title.toLowerCase().includes("chloroplast") ||
        l.intro.toLowerCase().includes("chloroplast")
    );
    expect(chloroplastMatches.length).toBeGreaterThan(0);
    expect(chloroplastMatches[0].topic).toBe("Photosynthesis");

    // Searching for "Sublimation" should match States of matter
    const sublimationMatches = allLessons.filter((l) =>
      l.title.toLowerCase().includes("sublimation")
    );
    expect(sublimationMatches.length).toBeGreaterThan(0);
    expect(sublimationMatches[0].topic).toBe("States of matter");
    expect(sublimationMatches[0].lessonNumber).toBe(8);
  });
});
