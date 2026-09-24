import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { DashboardSearch } from "@/components/DashboardSearch";
import { useLearningPreferences } from "@/hooks/useLearningPreferences";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import {
  ArrowRight,
  Bell,
  BookOpen,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Code2,
  Flame,
  GraduationCap,
  MoreHorizontal,
  Play,
  Plus,
  Search,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useLocation } from "wouter";

const initialCourses = [
  { id: 1, title: "Fractions", subject: "Maths", level: "Grade 7", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Equivalent fractions", accent: "sky", icon: "fraction" },
  { id: 2, title: "Linear equations", subject: "Maths", level: "Grade 7", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Solving one-step equations", accent: "mint", icon: "equation" },
  { id: 3, title: "Geometry", subject: "Maths", level: "Grade 7", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Angles and triangles", accent: "lilac", icon: "geometry" },
  { id: 4, title: "Photosynthesis", subject: "Science", level: "Grade 6", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "The role of sunlight", accent: "green", icon: "leaf" },
  { id: 5, title: "States of matter", subject: "Science", level: "Grade 6", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Particles in motion", accent: "orange", icon: "matter" },
  { id: 6, title: "Parts of a plant", subject: "Science", level: "Grade 5", progress: 0, lessonsCompleted: 0, lessonsTotal: 12, nextLesson: "Roots and their jobs", accent: "yellow", icon: "plant" },
];
const initialTasks = [
  { id: 1, title: "Practice equivalent fractions", course: "Fractions", dueLabel: "Today", priority: "High", status: "pending" },
  { id: 2, title: "Review the plant diagram", course: "Parts of a plant", dueLabel: "Tomorrow", priority: "Medium", status: "pending" },
  { id: 3, title: "Try the states of matter quiz", course: "States of matter", dueLabel: "Friday", priority: "Low", status: "pending" },
];
const initialSessions = [0, 0, 0, 0, 0, 0, 0];
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function initials(name: string) {
  return name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();
}

function progressColor(accent: string) {
  return accent === "mint" ? "#6bd6ae" : accent === "lilac" ? "#b4a6f4" : "#4abbd4";
}

function courseIcon(icon: string) {
  if (icon === "brackets") return <span className="font-mono text-lg font-bold">{`</>`}</span>;
  if (icon === "sparkles") return <Sparkles className="h-5 w-5" />;
  if (["leaf", "plant", "matter"].includes(icon)) return <BookOpen className="h-5 w-5" />;
  if (["fraction", "equation", "geometry"].includes(icon)) return <GraduationCap className="h-5 w-5" />;
  return <Code2 className="h-5 w-5" />;
}

function greetingForNow() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatStudyTime(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours <= 0) return `${minutes}m`;
  return `${hours}h ${minutes}m`;
}

function weekdayIndex(date = new Date()) {
  const day = date.getDay();
  return day === 0 ? 6 : day - 1;
}

export default function Home() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { data, isLoading, error } = trpc.dashboard.overview.useQuery();
  const utils = trpc.useUtils();
  const completeTask = trpc.dashboard.completeTask.useMutation();
  const [taskOverrides, setTaskOverrides] = useState<Record<number, boolean>>({});
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"courses" | "tasks">("courses");
  const { selectedSubjects, setSelectedSubjects, isSubjectSelected, subjectSummary, hasBoth } = useLearningPreferences(user?.id || user?.openId || user?.email);

  const allCourses = data?.courses?.length ? data.courses : initialCourses;
  const courses = useMemo(() => allCourses.filter(course => isSubjectSelected(course.subject)), [allCourses, isSubjectSelected]);
  const allTasks = data?.tasks?.length ? data.tasks : initialTasks;
  const tasks = useMemo(() => {
    return allTasks.filter(task => {
      const parentCourse = allCourses.find(c => c.title === task.course);
      if (parentCourse) {
        return isSubjectSelected(parentCourse.subject);
      }
      return true;
    });
  }, [allTasks, allCourses, isSubjectSelected]);
  const sessions = data?.sessions?.length ? data.sessions.map(session => session.minutes) : initialSessions;
  const stats = data?.stats;
  const displayName = user?.name || "there";
  const firstName = displayName.split(" ")[0];
  const totalMinutes = sessions.reduce((sum, value) => sum + value, 0);
  const weeklyGoal = stats?.weeklyGoal ?? 260;
  const weeklyProgress = Math.min(100, Math.round((totalMinutes / weeklyGoal) * 100));
  const minutesToGoal = Math.max(0, weeklyGoal - totalMinutes);
  const completedTasks = tasks.filter(task => taskOverrides[task.id] ?? task.status === "completed").length;
  const averageProgress = courses.length
    ? Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length)
    : 0;
  const maxSession = Math.max(...sessions, 0);
  const todayIndex = weekdayIndex();
  const streak = stats?.streak ?? 0;
  const bestStreak = stats?.bestStreak ?? 0;
  const xp = stats?.xp ?? 0;
  const weeklyXp = stats?.weeklyXp ?? 0;
  const recentActivity = stats?.recentActivity ?? [];
  const hasStarted = totalMinutes > 0 || averageProgress > 0 || xp > 0 || streak > 0 || completedTasks > 0;
  const filteredCourses = useMemo(() => courses.filter(course => `${course.title} ${course.subject}`.toLowerCase().includes(query.toLowerCase())), [courses, query]);

  const handleTaskToggle = (taskId: number, nextCompleted: boolean) => {
    setTaskOverrides(current => ({ ...current, [taskId]: nextCompleted }));
    completeTask.mutate({ taskId, completed: nextCompleted }, {
      onSuccess: () => {
        void utils.dashboard.overview.invalidate();
        toast.success(nextCompleted ? "Task completed" : "Task moved back to your list");
      },
      onError: () => toast.error("Could not save that task update. Try again."),
    });
  };

  if (isLoading && !data) return <DashboardLayout allowGuest><DashboardSkeleton /></DashboardLayout>;
  if (error && !data) toast.error("Showing demo data while your dashboard reconnects.");

  return (
    <DashboardLayout allowGuest>
      <div className="min-h-screen bg-[#f6fbfd] text-[#214554]">
        <header className="sticky top-0 z-30 border-b border-[#e5f0f3] bg-[#f6fbfd]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-3 px-5 sm:px-8 lg:px-10">
            <div className="flex min-w-0 items-center gap-3 shrink-0">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#159ac1] text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#173c4b]">neura</span>
            </div>
            <div className="flex-1 max-w-md mx-2 sm:mx-4">
              <DashboardSearch
                onSearchChange={setQuery}
                externalQuery={query}
              />
            </div>
            <div className="ml-auto flex items-center gap-2.5 sm:gap-3 shrink-0">
              <button aria-label="Notifications" onClick={() => toast("You're all caught up", { description: "No new learning notifications." })} className="relative grid h-10 w-10 place-items-center rounded-xl border border-[#e4eff2] bg-white text-[#72909c] transition hover:border-[#bde3eb] hover:text-[#159ac1]"><Bell className="h-[18px] w-[18px]" /><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#f59b75]" /></button>
              <div className="hidden h-8 w-px bg-[#e4eff2] sm:block" />
              <div className="flex items-center gap-2.5">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-[#dff5fb] text-xs font-bold text-[#159ac1]" title="Student profile">{initials(displayName)}</div>
              </div>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <section className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#e8f8fc] px-3 py-1.5 text-xs font-bold text-[#159ac1]">
                <Sparkles className="h-3.5 w-3.5" /> Your learning space
              </div>
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#f0edff] px-3 py-1.5 text-xs font-bold text-[#8979d5]">
                <span>Curriculum:</span>
                <span className="font-semibold">{subjectSummary}</span>
              </div>
            </div>
            <h1 className="text-[30px] font-bold tracking-[-0.04em] text-[#173c4b] sm:text-[36px]">{greetingForNow()}, {firstName} <span aria-hidden="true">✦</span></h1>
            <p className="mt-2 max-w-xl text-[15px] leading-6 text-[#7897a2]">{hasStarted ? "Keep your momentum going. You’re building a learning habit this week." : "Your workspace is ready. Complete a lesson to begin tracking progress."}</p>
          </section>

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard icon={<Flame className="h-5 w-5" />} label="Current streak" value={`${streak} ${streak === 1 ? "day" : "days"}`} helper={bestStreak > 0 ? `Best: ${bestStreak} days` : "Start today"} accent="orange" />
            <StatCard icon={<Clock3 className="h-5 w-5" />} label="Study time" value={formatStudyTime(totalMinutes)} helper="This week" accent="blue" />
            <StatCard icon={<Target className="h-5 w-5" />} label="Course progress" value={`${averageProgress}%`} helper={`Across ${courses.length} courses`} accent="purple" />
            <StatCard icon={<Trophy className="h-5 w-5" />} label="XP earned" value={xp.toLocaleString()} helper={weeklyXp > 0 ? `+${weeklyXp.toLocaleString()} this week` : "This week"} accent="green" />
          </section>

          <section className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,.8fr)]">
            <div className="overflow-hidden rounded-2xl border border-[#dff0f4] bg-white shadow-[0_10px_35px_rgba(27,91,109,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#edf4f6] px-5 py-5 sm:px-7"><div><h2 className="text-lg font-bold tracking-tight text-[#214554]">Your learning activity</h2><p className="mt-1 text-xs text-[#8aa7b1]">Minutes spent learning over the last 7 days</p></div><button onClick={() => toast("Weekly insights", { description: `${totalMinutes} minutes studied so far this week.` })} className="flex items-center gap-1 text-xs font-bold text-[#159ac1] transition hover:text-[#0e7795]">View insights <ChevronRight className="h-3.5 w-3.5" /></button></div>
              <div className="flex flex-col gap-6 px-5 py-6 sm:flex-row sm:items-center sm:px-7"><div className="relative grid h-36 w-36 shrink-0 place-items-center self-center rounded-full" style={{ background: `conic-gradient(#159ac1 ${weeklyProgress}%, #e8f4f6 0)` }}><div className="grid h-28 w-28 place-items-center rounded-full bg-white"><div className="text-center"><p className="text-3xl font-bold tracking-tight text-[#214554]">{weeklyProgress}%</p><p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8aa7b1]">weekly goal</p></div></div></div><div className="min-w-0 flex-1"><div className="mb-3 flex items-center justify-between"><p className="text-sm font-bold text-[#214554]">Weekly goal <span className="font-normal text-[#8aa7b1]">/ {weeklyGoal} min</span></p><span className="rounded-lg bg-[#e8f8fc] px-2 py-1 text-xs font-bold text-[#159ac1]">{totalMinutes} min</span></div><div className="flex h-32 items-end gap-2 sm:gap-3">{sessions.map((minutes, index) => <div key={`${days[index]}-${minutes}`} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><div className="group relative flex w-full items-end" style={{ height: "100%" }}><div className={`w-full rounded-lg transition-all duration-300 group-hover:opacity-80 ${index === todayIndex ? "bg-[#159ac1]" : "bg-[#cceef4]"}`} style={{ height: minutes === 0 ? "4px" : `${Math.max(12, (minutes / Math.max(maxSession, 1)) * 100)}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 rounded-md bg-[#214554] px-1.5 py-1 text-[10px] font-bold text-white group-hover:block">{minutes}m</span></div></div><span className="text-[10px] font-semibold text-[#9bb2ba]">{days[index]}</span></div>)}</div></div></div>
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-[#dff5fb] p-6 sm:p-7"><div className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[22px] border-white/35" /><div className="absolute -bottom-16 -right-3 h-44 w-44 rounded-full bg-[#b9e9f2]/60" /><div className="relative"><div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#159ac1] shadow-sm"><Zap className="h-5 w-5 fill-current" /></div><p className="text-xs font-bold uppercase tracking-[.14em] text-[#58a8ba]">Keep going</p><h2 className="mt-2 max-w-[220px] text-2xl font-bold leading-tight tracking-[-.03em] text-[#1d596b]">{hasStarted ? "Small steps add up to big progress." : "Your first session starts the streak."}</h2><p className="mt-3 max-w-[260px] text-sm leading-6 text-[#5e8a97]">{totalMinutes >= weeklyGoal ? "You hit this week’s goal. Keep the habit going." : hasStarted ? `You’re only ${minutesToGoal} minutes away from your weekly goal.` : "Complete lessons and your weekly goal, streak, and XP will start here."}</p><button onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#159ac1] shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">Explore courses <ArrowRight className="h-3.5 w-3.5" /></button></div></div>
          </section>

          <section id="courses" className="mt-9 scroll-mt-24">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight text-[#214554]">Continue learning</h2>
                  <span className="rounded-full bg-[#e8f8fc] px-2.5 py-0.5 text-xs font-bold text-[#159ac1]">
                    {subjectSummary}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#8aa7b1]">
                  Showing {courses.length} {courses.length === 1 ? "course" : "courses"} personalized for your subjects
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex rounded-xl bg-white p-1 border border-[#dfeef1] text-xs font-bold shadow-sm">
                  <button
                    onClick={() => setSelectedSubjects(["Mathematics"])}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      selectedSubjects.length === 1 && selectedSubjects[0] === "Mathematics"
                        ? "bg-[#159ac1] text-white"
                        : "text-[#6e8c97] hover:text-[#159ac1]"
                    }`}
                  >
                    Maths only
                  </button>
                  <button
                    onClick={() => setSelectedSubjects(["Science"])}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      selectedSubjects.length === 1 && selectedSubjects[0] === "Science"
                        ? "bg-[#159ac1] text-white"
                        : "text-[#6e8c97] hover:text-[#159ac1]"
                    }`}
                  >
                    Science only
                  </button>
                  <button
                    onClick={() => setSelectedSubjects(["Mathematics", "Science"])}
                    className={`px-3 py-1.5 rounded-lg transition ${
                      hasBoth
                        ? "bg-[#159ac1] text-white"
                        : "text-[#6e8c97] hover:text-[#159ac1]"
                    }`}
                  >
                    Both
                  </button>
                </div>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onStart={() => setLocation(`/dashboard/lessons/${encodeURIComponent(course.title)}`)}
                />
              ))}
              {!filteredCourses.length && (
                <div className="col-span-full rounded-2xl border border-[#fbd8c6] bg-white p-8 text-center shadow-sm">
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-[#fff2eb] text-[#e0753a]">
                    <Bot className="h-6 w-6" />
                  </div>
                  <span className="inline-block rounded-full bg-[#fde1d3] px-3 py-1 text-xs font-bold text-[#bd541b]">
                    Not in curriculum right now
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-[#173c4b]">
                    “{query}” is not in the curriculum right now
                  </h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-[#7897a2] leading-relaxed">
                    Our standard curriculum doesn't include this topic yet, but you don't have to miss out! You can learn “{query}” right now step-by-step with your personal Neura AI Tutor.
                  </p>
                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setLocation(`/dashboard/lessons/${encodeURIComponent(query.trim())}?mode=tutor`)}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#159ac1] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1088aa] transition"
                    >
                      <Bot className="h-4 w-4" />
                      Learn “{query}” with AI Tutor
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setQuery("")}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-[#e4eff2] bg-white px-4 py-2.5 text-xs font-bold text-[#688a95] hover:bg-[#f6fbfd] transition"
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="mt-9 grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)]">
            <div id="tasks" className="scroll-mt-24 rounded-2xl border border-[#dff0f4] bg-white shadow-[0_10px_35px_rgba(27,91,109,0.04)]"><div className="flex items-center justify-between border-b border-[#edf4f6] px-5 py-5 sm:px-7"><div><h2 className="text-lg font-bold tracking-tight text-[#214554]">Your tasks</h2><p className="mt-1 text-xs text-[#8aa7b1]">{completedTasks} of {tasks.length} completed</p></div><button onClick={() => toast("New task", { description: "Task creation will be available from the full planner." })} className="grid h-9 w-9 place-items-center rounded-lg bg-[#e8f8fc] text-[#159ac1] transition hover:bg-[#d7f2f7]" aria-label="Add a task"><Plus className="h-4 w-4" /></button></div><div className="flex gap-5 px-5 pt-4 sm:px-7"><button onClick={() => setActiveTab("courses")} className={`border-b-2 pb-3 text-xs font-bold ${activeTab === "courses" ? "border-[#159ac1] text-[#159ac1]" : "border-transparent text-[#9bb2ba]"}`}>Due soon</button><button onClick={() => setActiveTab("tasks")} className={`border-b-2 pb-3 text-xs font-bold ${activeTab === "tasks" ? "border-[#159ac1] text-[#159ac1]" : "border-transparent text-[#9bb2ba]"}`}>All tasks</button></div><div className="divide-y divide-[#edf4f6] px-5 pb-2 sm:px-7">{tasks.filter(task => activeTab === "tasks" || !(taskOverrides[task.id] ?? task.status === "completed")).map(task => { const isDone = taskOverrides[task.id] ?? task.status === "completed"; return <div key={task.id} className={`flex items-center gap-3 py-4 transition ${isDone ? "opacity-55" : ""}`}><button onClick={() => handleTaskToggle(task.id, !isDone)} aria-label={isDone ? `Mark ${task.title} as incomplete` : `Complete ${task.title}`} className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border transition ${isDone ? "border-[#159ac1] bg-[#159ac1] text-white" : "border-[#bed5dc] bg-white text-transparent hover:border-[#159ac1]"}`}><Check className="h-3.5 w-3.5" /></button><div className="min-w-0 flex-1"><p className={`truncate text-sm font-semibold ${isDone ? "text-[#91aab2] line-through" : "text-[#214554]"}`}>{task.title}</p><p className="mt-1 flex items-center gap-1.5 text-xs text-[#9bb2ba]"><BookOpen className="h-3 w-3" />{task.course}</p></div><div className="hidden text-right sm:block"><p className={`text-xs font-bold ${task.dueLabel === "Today" ? "text-[#ef946e]" : "text-[#8aa7b1]"}`}>{task.dueLabel}</p><span className={`text-[10px] font-semibold ${task.priority === "High" ? "text-[#ef946e]" : "text-[#9bb2ba]"}`}>{task.priority} priority</span></div><button onClick={() => toast(task.title, { description: `${task.course} · due ${task.dueLabel}` })} className="grid h-8 w-8 place-items-center rounded-lg text-[#a6bbc2] transition hover:bg-[#f2f8f9] hover:text-[#159ac1]" aria-label={`More details for ${task.title}`}><MoreHorizontal className="h-4 w-4" /></button></div> })}</div></div>
            <div id="insights" className="scroll-mt-24 rounded-2xl border border-[#dff0f4] bg-white p-5 shadow-[0_10px_35px_rgba(27,91,109,0.04)] sm:p-7"><div className="flex items-start justify-between"><div><h2 className="text-lg font-bold tracking-tight text-[#214554]">Recent activity</h2><p className="mt-1 text-xs text-[#8aa7b1]">{recentActivity.length ? "Your latest curriculum wins" : "Nothing logged yet"}</p></div><TrendingUp className="h-5 w-5 text-[#6bd6ae]" /></div><div className="mt-5 space-y-5">{recentActivity.length ? recentActivity.map(item => <ActivityItem key={item.id} icon={item.color === "green" ? <CheckCircle2 className="h-4 w-4" /> : (item.color as string) === "yellow" ? <Trophy className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />} title={item.title} subtitle={item.subtitle} time={item.time} color={item.color} />) : <p className="rounded-xl bg-[#f3fafb] px-4 py-6 text-center text-sm text-[#8aa7b1]">Complete a lesson to see activity here.</p>}</div><button onClick={() => toast("Activity history", { description: recentActivity.length ? `${recentActivity.length} recent updates from your learning.` : "No activity yet for this account." })} className="mt-6 flex w-full items-center justify-center gap-1 rounded-xl bg-[#f3fafb] py-3 text-xs font-bold text-[#159ac1] transition hover:bg-[#e7f6f9]">View full history <ArrowRight className="h-3.5 w-3.5" /></button></div>
          </section>

          <footer className="mt-10 flex flex-col justify-between gap-2 border-t border-[#e5f0f3] py-6 text-xs text-[#9bb2ba] sm:flex-row"><span>neura · learn with intention</span><span className="flex items-center gap-1">Built for curious minds <Sparkles className="h-3 w-3 text-[#159ac1]" /></span></footer>
        </main>
      </div>
    </DashboardLayout>
  );
}

function StatCard({ icon, label, value, helper, accent }: { icon: React.ReactNode; label: string; value: string; helper: string; accent: string }) {
  const styles: Record<string, string> = { orange: "bg-[#fff1e9] text-[#ed946a]", blue: "bg-[#e6f7fb] text-[#159ac1]", purple: "bg-[#f0edff] text-[#8979d5]", green: "bg-[#e5f8ef] text-[#43b485]" };
  return <div className="rounded-2xl border border-[#e5f0f3] bg-white p-5 shadow-[0_8px_25px_rgba(27,91,109,0.035)]"><div className="flex items-center justify-between"><div className={`grid h-10 w-10 place-items-center rounded-xl ${styles[accent]}`}>{icon}</div><MoreHorizontal className="h-4 w-4 text-[#c1d2d7]" /></div><p className="mt-5 text-xs font-semibold text-[#8aa7b1]">{label}</p><div className="mt-1 flex items-baseline gap-2"><span className="text-2xl font-bold tracking-tight text-[#214554]">{value}</span><span className="text-[11px] font-semibold text-[#6bc69f]">{helper}</span></div></div>;
}

function CourseCard({ course, onStart }: { course: { id: number; title: string; subject: string; level: string; progress: number; lessonsCompleted: number; lessonsTotal: number; nextLesson: string; accent: string; icon: string }; onStart: () => void }) {
  const color = progressColor(course.accent);
  return (
    <article
      onClick={onStart}
      className="group cursor-pointer rounded-2xl border border-[#dff0f4] bg-white p-5 shadow-[0_10px_35px_rgba(27,91,109,0.04)] transition hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(27,91,109,0.09)]"
    >
      <div className="mb-5 flex items-start justify-between">
        <div className="grid h-11 w-11 place-items-center rounded-2xl" style={{ backgroundColor: `${color}22`, color }}>
          <span>{courseIcon(course.icon)}</span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toast(course.title, { description: `${course.lessonsCompleted} of ${course.lessonsTotal} lessons complete.` });
          }}
          aria-label={`More details for ${course.title}`}
          className="grid h-8 w-8 place-items-center rounded-lg text-[#a6bbc2] hover:bg-[#f3fafb]"
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[.14em] text-[#94aeb7]">{course.subject} · {course.level}</p>
      <h3 className="mt-1.5 text-lg font-bold tracking-tight text-[#214554]">{course.title}</h3>
      <div className="mt-5 flex items-center justify-between text-xs">
        <span className="font-semibold text-[#7f9ba5]">{course.progress}% complete</span>
        <span className="text-[#a1b6bd]">{course.lessonsCompleted}/{course.lessonsTotal} lessons</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#edf5f7]">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${course.progress}%`, backgroundColor: color }} />
      </div>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#edf4f6] pt-4">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#a0b5bc]">Next up</p>
          <p className="mt-1 truncate text-xs font-semibold text-[#53737e]">{course.nextLesson}</p>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onStart();
          }}
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white transition hover:scale-105"
          style={{ backgroundColor: color }}
          aria-label={`Continue ${course.title}`}
        >
          <Play className="h-3.5 w-3.5 fill-current" />
        </button>
      </div>
    </article>
  );
}

function ActivityItem({ icon, title, subtitle, time, color }: { icon: React.ReactNode; title: string; subtitle: string; time: string; color: string }) {
  const colors: Record<string, string> = { green: "bg-[#e5f8ef] text-[#43b485]", yellow: "bg-[#fff4d9] text-[#e0a93a]", blue: "bg-[#e6f7fb] text-[#159ac1]" };
  return <div className="flex items-center gap-3"><div className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${colors[color]}`}>{icon}</div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-[#315866]">{title}</p><p className="mt-0.5 truncate text-xs text-[#9bb2ba]">{subtitle}</p></div><span className="shrink-0 text-[11px] font-semibold text-[#a5b8be]">{time}</span></div>;
}

function DashboardSkeleton() {
  return <div className="min-h-screen animate-pulse bg-[#f6fbfd] p-8"><div className="mx-auto max-w-6xl"><div className="h-10 w-64 rounded-xl bg-[#e1f0f3]" /><div className="mt-10 grid gap-4 sm:grid-cols-4">{[1, 2, 3, 4].map(item => <div key={item} className="h-32 rounded-2xl bg-white" />)}</div><div className="mt-5 h-80 rounded-2xl bg-white" /></div></div>;
}
