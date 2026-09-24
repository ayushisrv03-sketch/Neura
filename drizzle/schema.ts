import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }).unique(),
  // Hashed password (scrypt) for local email/password accounts created via
  // /api/auth/signup. Null for any account that never set a password.
  passwordHash: varchar("passwordHash", { length: 255 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const courses = mysqlTable("courses", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  subject: varchar("subject", { length: 80 }).notNull(),
  level: varchar("level", { length: 40 }).notNull(),
  progress: int("progress").default(0).notNull(),
  lessonsCompleted: int("lessonsCompleted").default(0).notNull(),
  lessonsTotal: int("lessonsTotal").default(1).notNull(),
  nextLesson: varchar("nextLesson", { length: 180 }).notNull(),
  accent: varchar("accent", { length: 24 }).notNull(),
  icon: varchar("icon", { length: 32 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const tasks = mysqlTable("tasks", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  course: varchar("course", { length: 120 }).notNull(),
  dueLabel: varchar("dueLabel", { length: 40 }).notNull(),
  priority: mysqlEnum("priority", ["Low", "Medium", "High"]).default("Medium").notNull(),
  status: mysqlEnum("status", ["pending", "completed"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const studySessions = mysqlTable("studySessions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  minutes: int("minutes").notNull(),
  sessionDate: timestamp("sessionDate").defaultNow().notNull(),
});

export const learningModeEvents = mysqlTable("learningModeEvents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  courseId: int("courseId").notNull(),
  topic: varchar("topic", { length: 180 }).notNull(),
  mode: varchar("mode", { length: 40 }).notNull(),
  selectedAt: timestamp("selectedAt").defaultNow().notNull(),
});

export const studentStrategyObservations = mysqlTable("studentStrategyObservations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  assessmentId: varchar("assessmentId", { length: 64 }),
  topic: varchar("topic", { length: 180 }).notNull(),
  lessonId: int("lessonId"),
  concept: varchar("concept", { length: 180 }).notNull(),
  strategy: varchar("strategy", { length: 50 }).notNull(),
  questionDifficulty: varchar("questionDifficulty", { length: 40 }).default("medium"),
  correct: int("correct").notNull(),
  score: int("score").default(0),
  timeTaken: int("timeTaken").notNull(),
  attemptCount: int("attemptCount").default(1),
  hintUsed: int("hintUsed").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const studentStrategyProfiles = mysqlTable("studentStrategyProfiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  topic: varchar("topic", { length: 180 }).notNull(),
  strategyScores: text("strategyScores").notNull(),
  preferredStrategy: varchar("preferredStrategy", { length: 50 }).notNull(),
  confidenceScore: int("confidenceScore").default(0),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Course = typeof courses.$inferSelect;
export type Task = typeof tasks.$inferSelect;
export type StudySession = typeof studySessions.$inferSelect;
export type LearningModeEvent = typeof learningModeEvents.$inferSelect;
export type StudentStrategyObservation = typeof studentStrategyObservations.$inferSelect;
export type InsertStudentStrategyObservation = typeof studentStrategyObservations.$inferInsert;
export type StudentStrategyProfile = typeof studentStrategyProfiles.$inferSelect;
export type InsertStudentStrategyProfile = typeof studentStrategyProfiles.$inferInsert;

const seedDate = new Date();

export const demoCourses = [
  { title: "Fractions", subject: "Maths", level: "Grade 7", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Equivalent fractions", accent: "sky", icon: "fraction" },
  { title: "Linear equations", subject: "Maths", level: "Grade 7", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Solving one-step equations", accent: "mint", icon: "equation" },
  { title: "Geometry", subject: "Maths", level: "Grade 7", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Angles and triangles", accent: "lilac", icon: "geometry" },
  { title: "Photosynthesis", subject: "Science", level: "Grade 6", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "The role of sunlight", accent: "green", icon: "leaf" },
  { title: "States of matter", subject: "Science", level: "Grade 6", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Particles in motion", accent: "orange", icon: "matter" },
  { title: "Parts of a plant", subject: "Science", level: "Grade 5", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Roots and jobs", accent: "yellow", icon: "plant" },
] as const;

export const demoTasks = [
  { title: "Practice equivalent fractions", course: "Fractions", dueLabel: "Today", priority: "High" as const },
  { title: "Review the plant diagram", course: "Parts of a plant", dueLabel: "Tomorrow", priority: "Medium" as const },
  { title: "Try the states of matter quiz", course: "States of matter", dueLabel: "Friday", priority: "Low" as const },
];

export { seedDate };

