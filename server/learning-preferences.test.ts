import { describe, expect, it } from "vitest";
import { demoCourses, demoTasks } from "../drizzle/schema";
import { lessons } from "../client/src/pages/TopicLesson";
import {
  isSubjectSelected,
  normalizeSubject,
} from "../client/src/hooks/useLearningPreferences";

describe("learning preferences subject filtering", () => {
  it("normalizes common subject representations correctly", () => {
    expect(normalizeSubject("Maths")).toBe("Mathematics");
    expect(normalizeSubject("mathematics")).toBe("Mathematics");
    expect(normalizeSubject("math")).toBe("Mathematics");
    expect(normalizeSubject("Science")).toBe("Science");
    expect(normalizeSubject("science")).toBe("Science");
  });

  describe("when user chooses only Mathematics", () => {
    const activeSubjects = ["Mathematics"];

    it("accepts Maths and rejects Science", () => {
      expect(isSubjectSelected("Maths", activeSubjects)).toBe(true);
      expect(isSubjectSelected("Mathematics", activeSubjects)).toBe(true);
      expect(isSubjectSelected("Science", activeSubjects)).toBe(false);
    });

    it("filters dashboard courses to only Mathematics topics", () => {
      const filteredCourses = demoCourses.filter(c => isSubjectSelected(c.subject, activeSubjects));
      expect(filteredCourses).toHaveLength(3);
      expect(filteredCourses.map(c => c.title)).toEqual([
        "Fractions",
        "Linear equations",
        "Geometry",
      ]);
      expect(filteredCourses.every(c => c.subject === "Maths")).toBe(true);
    });

    it("filters dashboard tasks to only Mathematics tasks", () => {
      const filteredTasks = demoTasks.filter(t => {
        const course = demoCourses.find(c => c.title === t.course);
        return course ? isSubjectSelected(course.subject, activeSubjects) : false;
      });
      expect(filteredTasks).toHaveLength(1);
      expect(filteredTasks[0].title).toBe("Practice equivalent fractions");
    });

    it("filters further lessons to only Mathematics lessons", () => {
      const currentTopic = "Fractions";
      const furtherLessons = Object.entries(lessons)
        .filter(([title, l]) => title !== currentTopic && isSubjectSelected(l.subject, activeSubjects))
        .map(([title]) => title);

      expect(furtherLessons).toEqual(["Linear equations", "Geometry"]);
    });
  });

  describe("when user chooses only Science", () => {
    const activeSubjects = ["Science"];

    it("accepts Science and rejects Maths", () => {
      expect(isSubjectSelected("Science", activeSubjects)).toBe(true);
      expect(isSubjectSelected("Maths", activeSubjects)).toBe(false);
      expect(isSubjectSelected("Mathematics", activeSubjects)).toBe(false);
    });

    it("filters dashboard courses to only Science topics", () => {
      const filteredCourses = demoCourses.filter(c => isSubjectSelected(c.subject, activeSubjects));
      expect(filteredCourses).toHaveLength(3);
      expect(filteredCourses.map(c => c.title)).toEqual([
        "Photosynthesis",
        "States of matter",
        "Parts of a plant",
      ]);
      expect(filteredCourses.every(c => c.subject === "Science")).toBe(true);
    });

    it("filters dashboard tasks to only Science tasks", () => {
      const filteredTasks = demoTasks.filter(t => {
        const course = demoCourses.find(c => c.title === t.course);
        return course ? isSubjectSelected(course.subject, activeSubjects) : false;
      });
      expect(filteredTasks).toHaveLength(2);
      expect(filteredTasks.map(t => t.title)).toEqual([
        "Review the plant diagram",
        "Try the states of matter quiz",
      ]);
    });

    it("filters further lessons to only Science lessons", () => {
      const currentTopic = "Photosynthesis";
      const furtherLessons = Object.entries(lessons)
        .filter(([title, l]) => title !== currentTopic && isSubjectSelected(l.subject, activeSubjects))
        .map(([title]) => title);

      expect(furtherLessons).toEqual(["States of matter", "Parts of a plant"]);
    });
  });

  describe("when user chooses both subjects", () => {
    const activeSubjects = ["Mathematics", "Science"];

    it("accepts both Mathematics and Science", () => {
      expect(isSubjectSelected("Maths", activeSubjects)).toBe(true);
      expect(isSubjectSelected("Science", activeSubjects)).toBe(true);
    });

    it("shows all 6 courses in the dashboard", () => {
      const filteredCourses = demoCourses.filter(c => isSubjectSelected(c.subject, activeSubjects));
      expect(filteredCourses).toHaveLength(6);
    });

    it("shows all 3 tasks in the dashboard", () => {
      const filteredTasks = demoTasks.filter(t => {
        const course = demoCourses.find(c => c.title === t.course);
        return course ? isSubjectSelected(course.subject, activeSubjects) : false;
      });
      expect(filteredTasks).toHaveLength(3);
    });

    it("shows further lessons across both subjects", () => {
      const currentTopic = "Fractions";
      const furtherLessons = Object.entries(lessons)
        .filter(([title, l]) => title !== currentTopic && isSubjectSelected(l.subject, activeSubjects))
        .map(([title]) => title);

      expect(furtherLessons).toHaveLength(5);
    });
  });
});
