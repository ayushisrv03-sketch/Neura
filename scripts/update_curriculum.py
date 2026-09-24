from pathlib import Path

schema = Path('/home/ubuntu/neura-student-dashboard/drizzle/schema.ts')
s = schema.read_text()
old_courses = '''export const demoCourses = [
  {
    title: "React Foundations",
    subject: "Development",
    level: "Intermediate",
    progress: 72,
    lessonsCompleted: 18,
    lessonsTotal: 25,
    nextLesson: "State & data flow",
    accent: "sky",
    icon: "code",
  },
  {
    title: "Data Structures",
    subject: "Computer Science",
    level: "Intermediate",
    progress: 48,
    lessonsCompleted: 12,
    lessonsTotal: 25,
    nextLesson: "Trees and traversal",
    accent: "mint",
    icon: "brackets",
  },
  {
    title: "UX Research Basics",
    subject: "Design",
    level: "Beginner",
    progress: 29,
    lessonsCompleted: 7,
    lessonsTotal: 24,
    nextLesson: "Interview synthesis",
    accent: "lilac",
    icon: "sparkles",
  },
] as const;

export const demoTasks = [
  { title: "Finish state patterns quiz", course: "React Foundations", dueLabel: "Today", priority: "High" as const },
  { title: "Review algorithm flashcards", course: "Data Structures", dueLabel: "Tomorrow", priority: "Medium" as const },
  { title: "Watch accessibility lesson", course: "React Foundations", dueLabel: "Friday", priority: "Low" as const },
];'''
new_courses = '''export const demoCourses = [
  { title: "Fractions", subject: "Maths", level: "Grade 7", progress: 72, lessonsCompleted: 9, lessonsTotal: 12, nextLesson: "Equivalent fractions", accent: "sky", icon: "fraction" },
  { title: "Linear equations", subject: "Maths", level: "Grade 7", progress: 48, lessonsCompleted: 6, lessonsTotal: 12, nextLesson: "Solving one-step equations", accent: "mint", icon: "equation" },
  { title: "Geometry", subject: "Maths", level: "Grade 7", progress: 29, lessonsCompleted: 4, lessonsTotal: 12, nextLesson: "Angles and triangles", accent: "lilac", icon: "geometry" },
  { title: "Photosynthesis", subject: "Science", level: "Grade 6", progress: 61, lessonsCompleted: 7, lessonsTotal: 12, nextLesson: "The role of sunlight", accent: "green", icon: "leaf" },
  { title: "States of matter", subject: "Science", level: "Grade 6", progress: 36, lessonsCompleted: 4, lessonsTotal: 12, nextLesson: "Particles in motion", accent: "orange", icon: "matter" },
  { title: "Parts of a plant", subject: "Science", level: "Grade 5", progress: 83, lessonsCompleted: 9, lessonsTotal: 12, nextLesson: "Roots and their jobs", accent: "yellow", icon: "plant" },
] as const;

export const demoTasks = [
  { title: "Practice equivalent fractions", course: "Fractions", dueLabel: "Today", priority: "High" as const },
  { title: "Review the plant diagram", course: "Parts of a plant", dueLabel: "Tomorrow", priority: "Medium" as const },
  { title: "Try the states of matter quiz", course: "States of matter", dueLabel: "Friday", priority: "Low" as const },
];'''
if old_courses not in s:
    raise SystemExit('schema seed block not found')
schema.write_text(s.replace(old_courses, new_courses, 1))

home = Path('/home/ubuntu/neura-student-dashboard/client/src/pages/Home.tsx')
s = home.read_text()
old_initial = '''const initialCourses = [
  { id: 1, title: "React Foundations", subject: "Development", level: "Intermediate", progress: 72, lessonsCompleted: 18, lessonsTotal: 25, nextLesson: "State & data flow", accent: "sky", icon: "code" },
  { id: 2, title: "Data Structures", subject: "Computer Science", level: "Intermediate", progress: 48, lessonsCompleted: 12, lessonsTotal: 25, nextLesson: "Trees and traversal", accent: "mint", icon: "brackets" },
  { id: 3, title: "UX Research Basics", subject: "Design", level: "Beginner", progress: 29, lessonsCompleted: 7, lessonsTotal: 24, nextLesson: "Interview synthesis", accent: "lilac", icon: "sparkles" },
];
const initialTasks = [
  { id: 1, title: "Finish state patterns quiz", course: "React Foundations", dueLabel: "Today", priority: "High", status: "pending" },
  { id: 2, title: "Review algorithm flashcards", course: "Data Structures", dueLabel: "Tomorrow", priority: "Medium", status: "pending" },
  { id: 3, title: "Watch accessibility lesson", course: "React Foundations", dueLabel: "Friday", priority: "Low", status: "pending" },
];'''
new_initial = '''const initialCourses = [
  { id: 1, title: "Fractions", subject: "Maths", level: "Grade 7", progress: 72, lessonsCompleted: 9, lessonsTotal: 12, nextLesson: "Equivalent fractions", accent: "sky", icon: "fraction" },
  { id: 2, title: "Linear equations", subject: "Maths", level: "Grade 7", progress: 48, lessonsCompleted: 6, lessonsTotal: 12, nextLesson: "Solving one-step equations", accent: "mint", icon: "equation" },
  { id: 3, title: "Geometry", subject: "Maths", level: "Grade 7", progress: 29, lessonsCompleted: 4, lessonsTotal: 12, nextLesson: "Angles and triangles", accent: "lilac", icon: "geometry" },
  { id: 4, title: "Photosynthesis", subject: "Science", level: "Grade 6", progress: 61, lessonsCompleted: 7, lessonsTotal: 12, nextLesson: "The role of sunlight", accent: "green", icon: "leaf" },
  { id: 5, title: "States of matter", subject: "Science", level: "Grade 6", progress: 36, lessonsCompleted: 4, lessonsTotal: 12, nextLesson: "Particles in motion", accent: "orange", icon: "matter" },
  { id: 6, title: "Parts of a plant", subject: "Science", level: "Grade 5", progress: 83, lessonsCompleted: 9, lessonsTotal: 12, nextLesson: "Roots and their jobs", accent: "yellow", icon: "plant" },
];
const initialTasks = [
  { id: 1, title: "Practice equivalent fractions", course: "Fractions", dueLabel: "Today", priority: "High", status: "pending" },
  { id: 2, title: "Review the plant diagram", course: "Parts of a plant", dueLabel: "Tomorrow", priority: "Medium", status: "pending" },
  { id: 3, title: "Try the states of matter quiz", course: "States of matter", dueLabel: "Friday", priority: "Low", status: "pending" },
];'''
if old_initial not in s:
    raise SystemExit('home initial data block not found')
s = s.replace(old_initial, new_initial, 1)
s = s.replace('''  if (icon === "sparkles") return <Sparkles className="h-5 w-5" />;
  return <Code2 className="h-5 w-5" />;''', '''  if (icon === "sparkles") return <Sparkles className="h-5 w-5" />;
  if (["leaf", "plant", "matter"].includes(icon)) return <BookOpen className="h-5 w-5" />;
  if (["fraction", "equation", "geometry"].includes(icon)) return <GraduationCap className="h-5 w-5" />;
  return <Code2 className="h-5 w-5" />;''', 1)
s = s.replace('helper="Across 3 courses"', 'helper={`Across ${courses.length} courses`}', 1)
home.write_text(s)

tests = Path('/home/ubuntu/neura-student-dashboard/server/dashboard.test.ts')
t = tests.read_text().replace('expect(dashboard.courses).toHaveLength(3);', 'expect(dashboard.courses).toHaveLength(6);')
t = t.replace('expect(demoCourses.map(course => course.title)).toContain("React Foundations");', '''expect(demoCourses.map(course => course.title)).toEqual([
      "Fractions",
      "Linear equations",
      "Geometry",
      "Photosynthesis",
      "States of matter",
      "Parts of a plant",
    ]);''')
tests.write_text(t)
