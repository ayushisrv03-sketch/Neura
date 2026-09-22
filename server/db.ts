import { and, desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  Course,
  InsertUser,
  LearningModeEvent,
  StudySession,
  Task,
  User,
  courses,
  demoCourses,
  demoTasks,
  learningModeEvents,
  studySessions,
  tasks,
  users,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// In-memory fallback store when MySQL database is not connected or unreachable
const inMemoryUsersByOpenId = new Map<string, User>();
const inMemoryUsersByEmail = new Map<string, User>();
let nextFallbackUserId = 1;

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required for upsert");
  const db = await getDb();
  if (db) {
    try {
      const values: InsertUser = { openId: user.openId };
      const updateSet: Record<string, unknown> = {};
      const textFields = ["name", "email", "loginMethod"] as const;

      for (const field of textFields) {
        if (user[field] !== undefined) {
          values[field] = user[field] ?? null;
          updateSet[field] = user[field] ?? null;
        }
      }
      if (user.lastSignedIn !== undefined) {
        values.lastSignedIn = user.lastSignedIn;
        updateSet.lastSignedIn = user.lastSignedIn;
      }
      if (user.role !== undefined) {
        values.role = user.role;
        updateSet.role = user.role;
      } else if (user.openId === ENV.ownerOpenId) {
        values.role = "admin";
        updateSet.role = "admin";
      }
      values.lastSignedIn ??= new Date();
      if (!Object.keys(updateSet).length) updateSet.lastSignedIn = new Date();

      await db.insert(users).values(values).onDuplicateKeyUpdate({ set: updateSet });
      return;
    } catch (error) {
      console.warn("[Database] Upsert user query failed, using in-memory fallback:", error);
    }
  }

  // Fallback in-memory upsert
  let existing = inMemoryUsersByOpenId.get(user.openId);
  if (!existing) {
    existing = {
      id: nextFallbackUserId++,
      openId: user.openId,
      name: user.name ?? null,
      email: user.email ?? null,
      passwordHash: null,
      loginMethod: user.loginMethod ?? null,
      role: user.role ?? (user.openId === ENV.ownerOpenId ? "admin" : "user"),
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: user.lastSignedIn ?? new Date(),
    };
  } else {
    existing = {
      ...existing,
      name: user.name !== undefined ? user.name : existing.name,
      email: user.email !== undefined ? user.email : existing.email,
      lastSignedIn: user.lastSignedIn !== undefined ? user.lastSignedIn : existing.lastSignedIn,
      updatedAt: new Date(),
    };
  }
  inMemoryUsersByOpenId.set(user.openId, existing);
  if (existing.email) {
    inMemoryUsersByEmail.set(existing.email.toLowerCase(), existing);
  }
}

export async function getUserByOpenId(openId: string): Promise<User | undefined> {
  const db = await getDb();
  if (db) {
    try {
      const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
      if (result[0]) return result[0];
    } catch (error) {
      console.warn("[Database] getUserByOpenId query failed, using in-memory fallback:", error);
    }
  }
  return inMemoryUsersByOpenId.get(openId);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDb();
  if (db) {
    try {
      const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
      if (result[0]) return result[0];
    } catch (error) {
      console.warn("[Database] getUserByEmail query failed, using in-memory fallback:", error);
    }
  }
  return inMemoryUsersByEmail.get(email.toLowerCase());
}

/**
 * Create a new local (email/password) account. `openId` is synthesized as
 * `local:<uuid>` so local accounts live in the same `users` table and share
 * every downstream code path (session cookie, dashboard data, etc.) with the
 * legacy OAuth-provisioned accounts.
 */
export async function createLocalUser(user: { openId: string; name: string; email: string; passwordHash: string }): Promise<User | undefined> {
  const db = await getDb();
  if (db) {
    try {
      await db.insert(users).values({
        openId: user.openId,
        name: user.name,
        email: user.email,
        passwordHash: user.passwordHash,
        loginMethod: "password",
        lastSignedIn: new Date(),
      });
      return await getUserByOpenId(user.openId);
    } catch (error) {
      console.warn("[Database] createLocalUser query failed, falling back to in-memory store:", error);
    }
  }

  // Fallback in-memory creation
  const newUser: User = {
    id: nextFallbackUserId++,
    openId: user.openId,
    name: user.name,
    email: user.email,
    passwordHash: user.passwordHash,
    loginMethod: "password",
    role: user.openId === ENV.ownerOpenId ? "admin" : "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  inMemoryUsersByOpenId.set(user.openId, newUser);
  if (user.email) {
    inMemoryUsersByEmail.set(user.email.toLowerCase(), newUser);
  }
  return newUser;
}

export async function updateUserName(openId: string, name: string): Promise<User | undefined> {
  await upsertUser({ openId, name });
  return getUserByOpenId(openId);
}

export const WEEKLY_GOAL_MINUTES = 260;
const LESSON_XP = 50;
const MINUTE_XP = 4;
const TASK_XP = 25;

type MemoryDashboard = {
  courses: Course[];
  tasks: Task[];
  sessions: StudySession[];
  learningModes: LearningModeEvent[];
  nextSessionId: number;
  nextModeId: number;
};

const memoryDashboards = new Map<number, MemoryDashboard>();

function dayKey(date: Date) {
  const value = new Date(date);
  return `${value.getFullYear()}-${value.getMonth() + 1}-${value.getDate()}`;
}

function startOfMonday(from = new Date()) {
  const date = new Date(from);
  date.setHours(0, 0, 0, 0);
  const day = date.getDay();
  date.setDate(date.getDate() + (day === 0 ? -6 : 1 - day));
  return date;
}

function relativeTime(date: Date) {
  const minutes = Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return hours === 1 ? "1h ago" : `${hours}h ago`;
  const days = Math.round(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}

function calcStreak(dates: Date[]) {
  const days = new Set(dates.map(dayKey));
  if (!days.size) return { current: 0, best: 0 };

  const sorted = Array.from(days).sort((a, b) => {
    const [ay, am, ad] = a.split("-").map(Number);
    const [by, bm, bd] = b.split("-").map(Number);
    return new Date(ay, am - 1, ad).getTime() - new Date(by, bm - 1, bd).getTime();
  });

  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    const [py, pm, pd] = sorted[i - 1].split("-").map(Number);
    const [cy, cm, cd] = sorted[i].split("-").map(Number);
    const prev = new Date(py, pm - 1, pd);
    const curr = new Date(cy, cm - 1, cd);
    const diff = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    run = diff === 1 ? run + 1 : 1;
    best = Math.max(best, run);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const cursor = new Date(today);
  if (!days.has(dayKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!days.has(dayKey(cursor))) return { current: 0, best };
  }

  let current = 0;
  while (days.has(dayKey(cursor))) {
    current += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return { current, best: Math.max(best, current) };
}

function weekMinuteBuckets(allSessions: StudySession[], userId: number) {
  const monday = startOfMonday();
  const buckets = [0, 0, 0, 0, 0, 0, 0];
  for (const session of allSessions) {
    const offset = Math.floor((new Date(session.sessionDate).getTime() - monday.getTime()) / 86400000);
    if (offset >= 0 && offset < 7) buckets[offset] += session.minutes;
  }
  return buckets.map((minutes, index) => {
    const sessionDate = new Date(monday);
    sessionDate.setDate(monday.getDate() + index);
    return { id: index + 1, userId, courseId: allSessions[0]?.courseId ?? 0, minutes, sessionDate };
  });
}

function buildDashboard(
  userId: number,
  courseRows: Course[],
  taskRows: Task[],
  allSessions: StudySession[],
  learningModes: LearningModeEvent[],
) {
  const sessions = weekMinuteBuckets(allSessions, userId);
  const weeklyMinutes = sessions.reduce((sum, session) => sum + session.minutes, 0);
  const totalMinutes = allSessions.reduce((sum, session) => sum + session.minutes, 0);
  const lessonsCompleted = courseRows.reduce((sum, course) => sum + course.lessonsCompleted, 0);
  const completedTasks = taskRows.filter(task => task.status === "completed");
  const { current, best } = calcStreak(allSessions.filter(session => session.minutes > 0).map(session => new Date(session.sessionDate)));
  const weeklyGoal = WEEKLY_GOAL_MINUTES;
  const weeklyProgress = Math.min(100, Math.round((weeklyMinutes / weeklyGoal) * 100));

  const courseTitle = (courseId: number) => courseRows.find(course => course.id === courseId)?.title ?? "Your course";
  const recentFromSessions = [...allSessions]
    .filter(session => session.minutes > 0)
    .sort((a, b) => new Date(b.sessionDate).getTime() - new Date(a.sessionDate).getTime())
    .slice(0, 5)
    .map(session => ({
      id: `session-${session.id}`,
      title: `Studied for ${session.minutes} min`,
      subtitle: courseTitle(session.courseId),
      time: relativeTime(new Date(session.sessionDate)),
      color: "blue" as const,
    }));
  const recentFromTasks = completedTasks
    .slice(0, 3)
    .map(task => ({
      id: `task-${task.id}`,
      title: "Completed a task",
      subtitle: task.title,
      time: relativeTime(new Date(task.updatedAt)),
      color: "green" as const,
    }));

  return {
    courses: courseRows,
    tasks: taskRows,
    sessions,
    learningModes,
    stats: {
      streak: current,
      bestStreak: best,
      weeklyMinutes,
      weeklyGoal,
      weeklyProgress,
      minutesToGoal: Math.max(0, weeklyGoal - weeklyMinutes),
      xp: lessonsCompleted * LESSON_XP + totalMinutes * MINUTE_XP + completedTasks.length * TASK_XP,
      weeklyXp: weeklyMinutes * MINUTE_XP,
      recentActivity: [...recentFromSessions, ...recentFromTasks].slice(0, 5),
    },
  };
}

function createEmptyDashboard(userId: number): MemoryDashboard {
  const now = new Date();
  return {
    courses: demoCourses.map((course, index) => ({
      ...course,
      id: index + 1,
      userId,
      createdAt: now,
      updatedAt: now,
    })) as Course[],
    tasks: demoTasks.map((task, index) => ({
      ...task,
      id: index + 1,
      userId,
      status: "pending" as const,
      createdAt: now,
      updatedAt: now,
    })) as Task[],
    sessions: [],
    learningModes: [],
    nextSessionId: 1,
    nextModeId: 1,
  };
}

function memoryDashboard(userId: number) {
  let stored = memoryDashboards.get(userId);
  if (!stored) {
    stored = createEmptyDashboard(userId);
    memoryDashboards.set(userId, stored);
  }
  return buildDashboard(userId, stored.courses, stored.tasks, stored.sessions, stored.learningModes);
}

export async function seedDashboardData(userId: number) {
  const db = await getDb();
  if (!db) {
    if (!memoryDashboards.has(userId)) memoryDashboards.set(userId, createEmptyDashboard(userId));
    return;
  }

  try {
    await db.insert(courses).values(
      demoCourses.map(course => ({ ...course, userId }))
    );
    await db.insert(tasks).values(
      demoTasks.map(task => ({ ...task, userId, status: "pending" as const }))
    );
  } catch (error) {
    console.warn("[Database] seedDashboardData query failed:", error);
  }
}

export async function resetDashboardData(userId: number) {
  memoryDashboards.set(userId, createEmptyDashboard(userId));
  const db = await getDb();
  if (!db) return;
  try {
    await db.update(courses)
      .set({ progress: 0, lessonsCompleted: 0, updatedAt: new Date() })
      .where(eq(courses.userId, userId));
    await db.update(tasks)
      .set({ status: "pending", updatedAt: new Date() })
      .where(eq(tasks.userId, userId));
    await db.delete(studySessions).where(eq(studySessions.userId, userId));
    await db.delete(learningModeEvents).where(eq(learningModeEvents.userId, userId));
  } catch (error) {
    console.warn("[Database] resetDashboardData failed:", error);
  }
}

export function fallbackDashboard() {
  const empty = createEmptyDashboard(0);
  return buildDashboard(0, empty.courses, empty.tasks, empty.sessions, empty.learningModes);
}

export async function getDashboardData(userId: number) {
  if (userId <= 0) return memoryDashboard(userId);

  const db = await getDb();
  if (!db) return memoryDashboard(userId);

  try {
    let [courseRows, taskRows] = await Promise.all([
      db.select().from(courses).where(eq(courses.userId, userId)).orderBy(desc(courses.updatedAt)),
      db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(desc(tasks.createdAt)),
    ]);

    const curriculumTitles = new Set<string>(demoCourses.map(course => course.title));
    const hasRequestedCurriculum = courseRows.some(course => curriculumTitles.has(course.title));
    const hasLegacyCurriculum = courseRows.length > 0 && !hasRequestedCurriculum;

    if (hasLegacyCurriculum) {
      await db.delete(tasks).where(eq(tasks.userId, userId));
      await db.delete(courses).where(eq(courses.userId, userId));
      await db.delete(studySessions).where(eq(studySessions.userId, userId));
      await seedDashboardData(userId);
      [courseRows, taskRows] = await Promise.all([
        db.select().from(courses).where(eq(courses.userId, userId)).orderBy(desc(courses.updatedAt)),
        db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(desc(tasks.createdAt)),
      ]);
    } else if (!courseRows.length && !taskRows.length) {
      await seedDashboardData(userId);
      [courseRows, taskRows] = await Promise.all([
        db.select().from(courses).where(eq(courses.userId, userId)).orderBy(desc(courses.updatedAt)),
        db.select().from(tasks).where(eq(tasks.userId, userId)).orderBy(desc(tasks.createdAt)),
      ]);
    }

    const allSessions = await db.select().from(studySessions)
      .where(eq(studySessions.userId, userId))
      .orderBy(studySessions.sessionDate);
    const learningModes = await db.select().from(learningModeEvents)
      .where(eq(learningModeEvents.userId, userId))
      .orderBy(desc(learningModeEvents.selectedAt))
      .limit(5);

    return buildDashboard(userId, courseRows, taskRows, allSessions, learningModes);
  } catch (error) {
    console.warn("[Database] getDashboardData query failed, using in-memory dashboard:", error);
    return memoryDashboard(userId);
  }
}

export async function setTaskStatus(userId: number, taskId: number, completed: boolean) {
  const stored = memoryDashboards.get(userId) ?? createEmptyDashboard(userId);
  memoryDashboards.set(userId, stored);
  const task = stored.tasks.find(item => item.id === taskId);
  if (task) {
    task.status = completed ? "completed" : "pending";
    task.updatedAt = new Date();
  }

  const db = await getDb();
  if (!db) return;
  try {
    await db.update(tasks)
      .set({ status: completed ? "completed" : "pending", updatedAt: new Date() })
      .where(and(eq(tasks.id, taskId), eq(tasks.userId, userId)));
  } catch (error) {
    console.warn("[Database] setTaskStatus failed:", error);
  }
}

export async function recordStudySession(userId: number, courseId: number, minutes: number) {
  const stored = memoryDashboards.get(userId) ?? createEmptyDashboard(userId);
  memoryDashboards.set(userId, stored);
  stored.sessions.push({
    id: stored.nextSessionId++,
    userId,
    courseId,
    minutes,
    sessionDate: new Date(),
  });
  const memoryCourse = stored.courses.find(course => course.id === courseId);
  if (memoryCourse) {
    memoryCourse.progress = Math.min(100, memoryCourse.progress + 3);
    memoryCourse.lessonsCompleted = Math.min(memoryCourse.lessonsTotal, memoryCourse.lessonsCompleted + 1);
    memoryCourse.updatedAt = new Date();
  }

  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(studySessions).values({ userId, courseId, minutes, sessionDate: new Date() });
    const course = await db.select().from(courses).where(and(eq(courses.id, courseId), eq(courses.userId, userId))).limit(1);
    if (course[0]) {
      await db.update(courses).set({
        progress: Math.min(100, course[0].progress + 3),
        lessonsCompleted: Math.min(course[0].lessonsTotal, course[0].lessonsCompleted + 1),
        updatedAt: new Date(),
      }).where(and(eq(courses.id, courseId), eq(courses.userId, userId)));
    }
  } catch (error) {
    console.warn("[Database] recordStudySession failed:", error);
  }
}

export async function recordLearningMode(userId: number, courseId: number, topic: string, mode: string) {
  const stored = memoryDashboards.get(userId) ?? createEmptyDashboard(userId);
  memoryDashboards.set(userId, stored);
  stored.learningModes.unshift({
    id: stored.nextModeId++,
    userId,
    courseId,
    topic,
    mode,
    selectedAt: new Date(),
  });

  const db = await getDb();
  if (!db) return;
  try {
    await db.insert(learningModeEvents).values({ userId, courseId, topic, mode });
  } catch (error) {
    console.warn("[Database] recordLearningMode failed:", error);
  }
}
