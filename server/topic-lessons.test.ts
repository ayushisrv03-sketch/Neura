import { describe, expect, it } from "vitest";
import { lessons } from "../client/src/pages/TopicLesson";

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
});
