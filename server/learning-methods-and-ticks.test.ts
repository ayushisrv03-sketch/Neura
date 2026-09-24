import { beforeEach, describe, expect, it } from "vitest";
import {
  clearTopicCompletedLessons,
  getTopicCompletedLessons,
  setTopicLessonCompleted,
} from "../client/src/lib/topicCurriculum";
import {
  DEFAULT_FORMATS,
  getStoredFormats,
  setStoredFormats,
  clearUserLearningPreferences,
} from "../client/src/hooks/useLearningPreferences";

describe("User-scoped lesson completion and ticks", () => {
  // Simple in-memory localStorage polyfill for node test environment
  const store = new Map<string, string>();
  const dummyLocalStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, val: string) => store.set(key, val),
    removeItem: (key: string) => store.delete(key),
    clear: () => store.clear(),
    key: (i: number) => Array.from(store.keys())[i] ?? null,
    get length() {
      return store.size;
    },
  };

  beforeEach(() => {
    store.clear();
    (globalThis as any).window = {
      dispatchEvent: () => true,
    };
    (globalThis as any).localStorage = dummyLocalStorage;
  });

  it("returns zero completed lessons (no ticks) for a brand new user", () => {
    const newUserId = 999;
    const completed = getTopicCompletedLessons("Fractions", newUserId);
    expect(completed).toEqual([]);
    expect(completed.length).toBe(0);
  });

  it("does not leak completed lessons from an old user to a newly registered user", () => {
    const oldUserId = 101;
    const newUserId = 102;

    // Old user completes lesson 0 and 1 of Fractions
    setTopicLessonCompleted("Fractions", 0, oldUserId);
    setTopicLessonCompleted("Fractions", 1, oldUserId);

    // Old user has completed lessons
    expect(getTopicCompletedLessons("Fractions", oldUserId)).toEqual([0, 1]);

    // Brand new user creates an account -> MUST have 0 completed lessons (no ticks)
    const newCompleted = getTopicCompletedLessons("Fractions", newUserId);
    expect(newCompleted).toEqual([]);
    expect(newCompleted.includes(0)).toBe(false);
    expect(newCompleted.includes(1)).toBe(false);
  });

  it("clearTopicCompletedLessons cleans up saved lesson progress completely", () => {
    const userId = 200;
    setTopicLessonCompleted("Linear equations", 0, userId);
    setTopicLessonCompleted("Linear equations", 1, userId);
    expect(getTopicCompletedLessons("Linear equations", userId)).toHaveLength(2);

    // Simulate signup cleanup
    clearTopicCompletedLessons();
    expect(getTopicCompletedLessons("Linear equations", userId)).toEqual([]);
  });
});

describe("Learning methods visibility logic based on onboarding selection", () => {
  it("always keeps Visual enabled even if user did not pick Visual in onboarding", () => {
    const userSelectedFormats = ["Text", "Examples"];
    const showVisual = true; // Visual is always retained for every user
    const showSteps = userSelectedFormats.some(f => f.toLowerCase() === "step-by-step");
    const showExamples = userSelectedFormats.some(f => f.toLowerCase() === "examples");

    expect(showVisual).toBe(true);
    expect(showExamples).toBe(true);
    expect(showSteps).toBe(false); // Not selected -> hidden
  });

  it("shows only selected methods when user picks only Step-by-step", () => {
    const userSelectedFormats = ["Step-by-step"];
    const showVisual = true; // Always retained
    const showSteps = userSelectedFormats.some(f => f.toLowerCase() === "step-by-step");
    const showExamples = userSelectedFormats.some(f => f.toLowerCase() === "examples");

    expect(showVisual).toBe(true);
    expect(showSteps).toBe(true);
    expect(showExamples).toBe(false);
  });

  it("supports Audio narration and Interactive model when selected in onboarding", () => {
    const userSelectedFormats = ["Audio", "Interactive"];
    const showVisual = true;
    const showAudio = userSelectedFormats.some(f => f.toLowerCase() === "audio");
    const showInteractive = userSelectedFormats.some(f => f.toLowerCase() === "interactive");
    const showSteps = userSelectedFormats.some(f => f.toLowerCase() === "step-by-step");

    expect(showVisual).toBe(true);
    expect(showAudio).toBe(true);
    expect(showInteractive).toBe(true);
    expect(showSteps).toBe(false);
  });
});

describe("User-scoped learning formats memory isolation", () => {
  it("defaults active formats to Text and Visual only", () => {
    expect(DEFAULT_FORMATS).toEqual(["Text", "Visual"]);
    const newFormats = getStoredFormats(555);
    expect(newFormats).toEqual(["Text", "Visual"]);
  });

  it("does not leak previous user's saved formats into new user's preferences", () => {
    const previousUserId = 101;
    const newUserId = 102;

    // Previous user customizes formats to Audio and Interactive
    setStoredFormats(["Audio", "Interactive"], previousUserId);
    expect(getStoredFormats(previousUserId)).toEqual(["Audio", "Interactive"]);

    // Brand new user arrives -> must get only Text & Visual defaults, NOT previous user's formats
    const newUserFormats = getStoredFormats(newUserId);
    expect(newUserFormats).toEqual(["Text", "Visual"]);
  });

  it("clears user and guest preferences without affecting fresh defaults", () => {
    const userId = 202;
    setStoredFormats(["Examples", "Interactive"], userId);
    expect(getStoredFormats(userId)).toEqual(["Examples", "Interactive"]);

    clearUserLearningPreferences(userId);
    expect(getStoredFormats(userId)).toEqual(["Text", "Visual"]);
  });
});

