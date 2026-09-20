import { describe, expect, it } from "vitest";
import { demoCourses, demoTasks } from "../drizzle/schema";
import { fallbackDashboard } from "./db";

describe("dashboard data", () => {
  it("starts a new workspace at zero progress", () => {
    const dashboard = fallbackDashboard();
    expect(dashboard.courses).toHaveLength(6);
    expect(dashboard.tasks).toHaveLength(3);
    expect(dashboard.sessions.map(session => session.minutes)).toEqual([0, 0, 0, 0, 0, 0, 0]);
    expect(dashboard.courses.every(course => course.progress === 0 && course.lessonsCompleted === 0)).toBe(true);
    expect(dashboard.stats.streak).toBe(0);
    expect(dashboard.stats.xp).toBe(0);
    expect(dashboard.stats.weeklyMinutes).toBe(0);
    expect(dashboard.stats.recentActivity).toEqual([]);
  });

  it("keeps course and task seed content aligned with the product model", () => {
    expect(demoCourses.map(course => course.title)).toEqual([
      "Fractions",
      "Linear equations",
      "Geometry",
      "Photosynthesis",
      "States of matter",
      "Parts of a plant",
    ]);
    expect(demoTasks.every(task => task.title.length > 0 && task.course.length > 0)).toBe(true);
    expect(new Set(demoTasks.map(task => task.priority))).toEqual(new Set(["High", "Medium", "Low"]));
  });
});
