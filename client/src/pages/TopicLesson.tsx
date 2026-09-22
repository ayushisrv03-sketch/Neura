import DashboardLayout from "@/components/DashboardLayout";
import { LessonVisualDispatcher } from "@/components/visuals/LessonVisualDispatcher";
import {
  getTopicCompletedLessons,
  getTopicCurriculum,
  lessons,
  setTopicLessonCompleted,
} from "@/lib/topicCurriculum";
import { useLearningPreferences } from "@/hooks/useLearningPreferences";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Eye,
  GraduationCap,
  HelpCircle,
  Leaf,
  Lightbulb,
  Play,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useRoute } from "wouter";

export default function TopicLesson() {
  const [, params] = useRoute("/dashboard/lessons/:topic");
  const [, setLocation] = useLocation();
  const topic = decodeURIComponent(params?.topic ?? "");
  const curriculum = useMemo(() => getTopicCurriculum(topic), [topic]);

  const { data } = trpc.dashboard.overview.useQuery();
  const utils = trpc.useUtils();
  const logStudy = trpc.dashboard.logStudy.useMutation();

  const [completedIndices, setCompletedIndices] = useState<number[]>(() =>
    getTopicCompletedLessons(topic)
  );

  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      const param = search.get("lesson");
      if (param) {
        const parsed = parseInt(param, 10) - 1;
        if (parsed >= 0 && parsed < curriculum.lessons.length) return parsed;
      }
    }
    return 0;
  });

  const [answer, setAnswer] = useState<string | null>(null);
  const [activeMode, setActiveMode] = useState<"steps" | "visual" | "example" | "simple" | "hint" | "stuck" | "visual">(
    "visual"
  );

  useEffect(() => {
    const handleSync = () => {
      const search = new URLSearchParams(window.location.search);
      const param = search.get("lesson");
      if (param) {
        const parsed = parseInt(param, 10) - 1;
        if (parsed >= 0 && parsed < curriculum.lessons.length) {
          setActiveLessonIdx(parsed);
        }
      } else {
        setActiveLessonIdx(0);
      }
      setCompletedIndices(getTopicCompletedLessons(topic));
      setAnswers({});
      setCurrentQIdx(0);
    };

    window.addEventListener("popstate", handleSync);
    window.addEventListener("neura-lesson-completed", handleSync);

    return () => {
      window.removeEventListener("popstate", handleSync);
      window.removeEventListener("neura-lesson-completed", handleSync);
    };
  }, [topic, curriculum.lessons.length]);

  useEffect(() => {
    setCompletedIndices(getTopicCompletedLessons(topic));
    setAnswers({});
    setCurrentQIdx(0);
  }, [topic, activeLessonIdx]);

  const activeLesson = curriculum?.lessons?.[activeLessonIdx] || curriculum?.lessons?.[0];
  const isLessonCompleted = completedIndices.includes(activeLessonIdx);

  const course = useMemo(() => data?.courses.find((item) => item.title === topic), [data, topic]);

  const furtherLessons = useMemo(() => {
    return Object.entries(lessons)
      .filter(([title, l]) => title !== topic && isSubjectSelected(l.subject))
      .map(([title, l]) => ({ title, ...l }));
  }, [topic, isSubjectSelected]);

  const nextTopic = furtherLessons[0];

  if (!topic || !curriculum || !activeLesson) {
    return (
      <DashboardLayout allowGuest>
        <div className="min-h-screen bg-[#f6fbfd] p-8 text-[#214554]">
          <button
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-2 text-sm font-bold text-[#159ac1]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </button>
          <h1 className="mt-8 text-2xl font-bold">Lesson not found</h1>
        </div>
      </DashboardLayout>
    );
  }

  const lesson = activeLesson;
  const totalLessonsCount = curriculum.lessons.length;
  const completedLessonsCount = completedIndices.length;
  const calculatedProgress =
    totalLessonsCount > 0
      ? Math.round((completedLessonsCount / totalLessonsCount) * 100)
      : 0;

<<<<<<< Updated upstream
=======
  if (!isSubjectSelected(curriculum.subject))
    return (
      <DashboardLayout allowGuest>
        <div className="min-h-screen bg-[#f6fbfd] p-8 text-[#214554]">
          <button
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-2 text-sm font-bold text-[#159ac1] transition hover:text-[#0e7795]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </button>
          <div className="mt-8 max-w-lg rounded-2xl border border-[#dff0f4] bg-white p-8 shadow-[0_10px_35px_rgba(27,91,109,0.04)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-800 border border-amber-200">
              <GraduationCap className="h-4 w-4" /> Subject not in active curriculum
            </div>
            <h1 className="text-2xl font-bold text-[#173c4b]">{topic}</h1>
            <p className="mt-2 text-sm leading-relaxed text-[#7897a2]">
              This topic belongs to <strong>{curriculum.subject}</strong>. Your current curriculum is set to{" "}
              <strong>{subjectSummary}</strong>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => setLocation("/dashboard")}
                className="rounded-xl bg-[#159ac1] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#1088aa]"
              >
                Return to {subjectSummary}
              </button>
              <button
                onClick={() => {
                  setSelectedSubjects([...selectedSubjects, curriculum.subject]);
                }}
                className="rounded-xl border border-[#dfeef1] bg-white px-5 py-2.5 text-sm font-bold text-[#6e8c97] transition hover:bg-[#f0fafc] hover:text-[#159ac1]"
              >
                Enable {curriculum.subject} &amp; continue
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );

  const progress = course?.progress ?? 0;
  const lessonsCompleted = course?.lessonsCompleted ?? 0;
  const lessonsTotal = course?.lessonsTotal ?? 1;
>>>>>>> Stashed changes
  const completeLesson = () => {
    if (isLessonCompleted) return;
    const updated = setTopicLessonCompleted(topic, activeLessonIdx);
    setCompletedIndices(updated);

    if (course) {
      logStudy.mutate(
        { courseId: course.id, minutes: 15 },
        { onSuccess: () => void utils.dashboard.overview.invalidate() }
      );
    }

    if (!isLastLesson) {
      const nextIdx = activeLessonIdx + 1;
      setActiveLessonIdx(nextIdx);
      const search = new URLSearchParams(window.location.search);
      search.set("lesson", (nextIdx + 1).toString());
      const newUrl = `${window.location.pathname}?${search.toString()}`;
      window.history.pushState({}, "", newUrl);
      window.dispatchEvent(new Event("popstate"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setLocation("/dashboard");
    }
  };

  const modeContent =
    activeMode === "steps" ? (
      <ol className="list-decimal space-y-2 pl-5 text-sm text-[#5e7d87]">
        <li>Start with the key idea: {activeLesson.intro}</li>
        <li>Focus on the important relationship in {topic}.</li>
        <li>Use the worked example: {activeLesson.example}.</li>
        <li>Try the quick check and explain your reasoning.</li>
      </ol>
    ) : activeMode === "visual" ? (
      <div className="space-y-4">
        <p className="text-sm font-semibold text-[#315866]">
          Interactive Visual Model — test controls & observe live changes:
        </p>
        <LessonVisualDispatcher topic={topic} lessonIndex={activeLessonIdx} />
      </div>
    ) : activeMode === "example" ? (
      <div>
        <p className="text-sm text-[#5e7d87]">Here is a worked example for {topic}:</p>
        <p className="mt-3 rounded-xl bg-white p-4 text-lg font-bold text-[#1d596b] border border-[#e1f0f4]">
          {activeLesson.example}
        </p>
        <p className="mt-3 text-sm text-[#5e7d87]">{activeLesson.activity}</p>
      </div>
    ) : activeMode === "simple" ? (
      <p className="text-sm text-[#5e7d87]">{activeLesson.explanation.split(".")[0]}.</p>
    ) : activeMode === "hint" ? (
      <p className="text-sm text-[#5e7d87]">
        <strong>Hint:</strong> Look at the key relationship in the worked example, then apply the same idea to the
        question.
      </p>
    ) : activeMode === "stuck" ? (
      <div className="text-sm text-[#5e7d87]">
        <p>It is completely okay to feel stuck. Take one small step:</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Read the short explanation again.</li>
          <li>Interact with the visual model above.</li>
          <li>Try the easiest part of the question first.</li>
        </ul>
      </div>
    ) : null;

  return (
    <DashboardLayout allowGuest>
      <div className="min-h-screen bg-[#f6fbfd] text-[#214554]">
        <main className="mx-auto max-w-[1100px] px-5 py-8 sm:px-8 lg:px-10">
          <button
            onClick={() => setLocation("/dashboard")}
            className="flex items-center gap-2 text-sm font-bold text-[#159ac1] transition hover:text-[#0e7795]"
          >
            <ArrowLeft className="h-4 w-4" /> Back to dashboard
          </button>
          <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#e8f8fc] px-3 py-1.5 text-xs font-bold text-[#159ac1]">
                <GraduationCap className="h-3.5 w-3.5" /> {curriculum.subject} · {curriculum.level}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[#173c4b] sm:text-4xl">{topic}</h1>
              <p className="mt-2 text-base text-[#7897a2]">{curriculum.eyebrow}</p>
            </div>
            <div className="rounded-2xl border border-[#dff0f4] bg-white px-5 py-4">
              <div className="flex items-center justify-between gap-8">
                <span className="text-xs font-bold text-[#8aa7b1]">Topic progress</span>
                <span className="text-lg font-bold text-[#159ac1]">
                  {calculatedProgress}%
                </span>
              </div>
              <div className="mt-2 h-2.5 w-48 overflow-hidden rounded-full bg-[#edf5f7]">
                <div
                  className="h-full rounded-full bg-[#159ac1] transition-all duration-300"
                  style={{ width: `${calculatedProgress}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] font-semibold text-[#9bb2ba]">
                {completedLessonsCount}/{totalLessonsCount} lessons complete
              </p>
            </div>
          </div>

          <section className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article className="rounded-2xl border border-[#dff0f4] bg-white p-6 shadow-[0_10px_35px_rgba(27,91,109,0.04)] sm:p-8">
              <div className="flex items-center justify-between border-b border-[#f0f7f9] pb-4">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8aa7b1]">
                  <Clock3 className="h-4 w-4" /> 15 minute lesson
                </div>
                <span className="rounded-full bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1]">
                  Lesson {activeLessonIdx + 1} of {totalLessonsCount}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#214554]">
                {activeLesson.title}
              </h2>
              <p className="mt-3 text-base font-semibold text-[#315866]">{activeLesson.intro}</p>
              <p className="mt-3 text-sm leading-7 text-[#66828c]">{activeLesson.explanation}</p>

              {/* Featured Interactive Visual Sandbox */}
              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-bold text-[#315866] flex items-center gap-2">
                    <Eye className="h-4 w-4 text-[#159ac1]" />
                    Interactive Visual Explanation Model
                  </h3>
                  <span className="text-xs font-semibold text-[#159ac1] bg-[#e8f8fc] px-2.5 py-1 rounded-full">
                    Live Simulation
                  </span>
                </div>
                <LessonVisualDispatcher topic={topic} lessonIndex={activeLessonIdx} />
              </div>

              {/* Mode Switcher */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-bold text-[#315866]">Choose how you would like to learn</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveMode("visual")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "visual"
                      ? "bg-[#159ac1] text-white"
                      : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                      }`}
                  >
                    <Eye className="mr-1 inline h-3.5 w-3.5" /> Show visually
                  </button>
                  <button
                    onClick={() => setActiveMode("steps")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "steps"
                      ? "bg-[#159ac1] text-white"
                      : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                      }`}
                  >
                    <Sparkles className="mr-1 inline h-3.5 w-3.5" /> Step by step
                  </button>
                  <button
                    onClick={() => setActiveMode("example")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "example"
                      ? "bg-[#159ac1] text-white"
                      : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                      }`}
                  >
                    <Lightbulb className="mr-1 inline h-3.5 w-3.5" /> Show an example
                  </button>
                  <button
                    onClick={() => setActiveMode("simple")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "simple"
                      ? "bg-[#159ac1] text-white"
                      : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                      }`}
                  >
                    <BookOpenIcon /> Explain simply
                  </button>
                  <button
                    onClick={() => setActiveMode("hint")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "hint"
                      ? "bg-[#159ac1] text-white"
                      : "bg-[#f0edff] text-[#8979d5] hover:bg-[#e7e2f7]"
                      }`}
                  >
                    <HelpCircle className="mr-1 inline h-3.5 w-3.5" /> Give me a hint
                  </button>
                  <button
                    onClick={() => setActiveMode("stuck")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "stuck"
                      ? "bg-[#ef946e] text-white"
                      : "bg-[#fff1e9] text-[#bd6d39] hover:bg-[#ffe4d7]"
                      }`}
                  >
                    <HelpCircle className="mr-1 inline h-3.5 w-3.5" /> I’m stuck
                  </button>
                </div>
                {activeMode && activeMode !== "visual" && (
                  <div
                    className="mt-4 rounded-2xl border border-[#dff0f4] bg-[#fbfeff] p-5 text-sm leading-6 text-[#5e7d87]"
                    aria-live="polite"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-bold text-[#315866]">
                        {activeMode === "steps"
                          ? "Step-by-step explanation"
                          : activeMode === "example"
                            ? "Example learning"
                            : activeMode === "simple"
                              ? "Simpler explanation"
                              : activeMode === "hint"
                                ? "A gentle hint"
                                : "You are not alone"}
                      </span>
                      <button onClick={() => setActiveMode("visual")} className="text-xs font-semibold text-[#159ac1]">
                        Hide extra details
                      </button>
                    </div>
                    {modeContent}
                  </div>
                )}
              </div>

              <div className="mt-6 rounded-2xl bg-[#e8f8fc] p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-[#159ac1]">
                  <Leaf className="h-4 w-4" /> Worked example
                </div>
                <p className="mt-3 text-lg font-bold text-[#1d596b]">{activeLesson.example}</p>
                <p className="mt-2 text-sm leading-6 text-[#5e8a97]">{activeLesson.activity}</p>
              </div>

              {/* Multi-Question Understanding Check Quiz */}
              <div className="mt-6 rounded-2xl border border-[#e5f0f3] p-5">
                <div className="flex items-center justify-between border-b border-[#f0f7f9] pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#315866]">Understanding Check</span>
                    <span className="rounded-full bg-[#e8f8fc] px-2.5 py-0.5 text-xs font-bold text-[#159ac1]">
                      Question {currentQIdx + 1} of {lessonQuestions.length}
                    </span>
                  </div>
                  {answeredCount > 0 && (
                    <span className="text-xs font-bold text-[#277f59] bg-[#eaf7f1] px-2.5 py-1 rounded-full">
                      Score: {correctCount}/{lessonQuestions.length}
                    </span>
                  )}
                </div>

                {/* Question Selector Tabs */}
                <div className="flex gap-2 mb-4">
                  {lessonQuestions.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentQIdx(idx)}
                      className={`rounded-lg px-3 py-1 text-xs font-bold transition ${currentQIdx === idx
                          ? "bg-[#159ac1] text-white"
                          : answers[idx]
                            ? "bg-[#eaf7f1] text-[#277f59]"
                            : "bg-[#edf5f7] text-[#6e8c97] hover:bg-[#e2eff2]"
                        }`}
                    >
                      Q{idx + 1} {answers[idx] ? "✓" : ""}
                    </button>
                  ))}
                </div>

                <p className="text-sm font-semibold text-[#214554]">{activeQ.question}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {activeLesson.choices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => setAnswer(choice)}
                      className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${answer === choice
                          ? choice === activeLesson.answer
                            ? "border-[#67c9a0] bg-[#e5f8ef] text-[#318c60]"
                            : "border-[#efab87] bg-[#fff1e9] text-[#bd6d39]"
                          : "border-[#dfeef1] text-[#6e8c97] hover:border-[#8ad5e4]"
                        }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
                {answers[currentQIdx] && (
                  <p
                    className={`mt-3 text-xs font-semibold ${answer === activeLesson.answer ? "text-[#318c60]" : "text-[#bd6d39]"
                      }`}
                  >
                    {answers[currentQIdx] === activeQ.answer
                      ? "Correct — great reasoning."
                      : `Not quite. Correct answer: ${activeQ.answer}`}
                  </p>
                )}
              </div>

              <button
                onClick={completeLesson}
                disabled={isLessonCompleted}
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#159ac1] text-sm font-bold text-white transition hover:bg-[#1088aa] disabled:cursor-default disabled:bg-[#67c9a0]"
              >
                <CheckCircle2 className="h-4 w-4" />
                {isLessonCompleted
                  ? `Lesson ${activeLessonIdx + 1} completed (+15 min logged)`
                  : `Mark Lesson ${activeLessonIdx + 1} complete`}
              </button>
<<<<<<< Updated upstream
=======
              {isLessonCompleted && nextTopic && (
                <button
                  onClick={() => setLocation(`/dashboard/lessons/${encodeURIComponent(nextTopic.title)}`)}
                  className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#159ac1] bg-[#e8f8fc] text-sm font-bold text-[#159ac1] transition hover:bg-[#d4f2f8]"
                >
                  Continue to next lesson: {nextTopic.title} <ArrowRight className="h-4 w-4" />
                </button>
              )}
>>>>>>> Stashed changes
            </article>

            <aside className="space-y-5">
              <div className="rounded-2xl bg-[#dff5fb] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#159ac1]">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-[#1d596b]">Keep exploring</h2>
                <p className="mt-2 text-sm leading-6 text-[#5e8a97]">
                  Use the interactive visual simulation above, answer all 3 questions, and click Next Lesson to advance.
                </p>
              </div>

              {furtherLessons.length > 0 && (
                <div className="rounded-2xl border border-[#dff0f4] bg-white p-6 shadow-[0_10px_35px_rgba(27,91,109,0.04)]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#315866] flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-[#159ac1]" /> Further lessons
                    </h3>
                    <span className="text-[10px] font-bold text-[#159ac1] bg-[#e8f8fc] px-2 py-0.5 rounded-full">
                      {subjectSummary}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#8aa7b1]">Topics in your active curriculum:</p>
                  <div className="mt-4 space-y-2">
                    {furtherLessons.map((item) => (
                      <button
                        key={item.title}
                        onClick={() => setLocation(`/dashboard/lessons/${encodeURIComponent(item.title)}`)}
                        className="w-full rounded-xl border border-[#e5f0f3] bg-[#fbfeff] p-3 text-left transition hover:border-[#159ac1] hover:bg-[#f0f9fb] group"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#173c4b] group-hover:text-[#159ac1]">{item.title}</span>
                          <span className="text-[10px] font-semibold text-[#8aa7b1] bg-[#edf4f6] px-1.5 py-0.5 rounded-md">{item.subject}</span>
                        </div>
                        <p className="mt-1 text-[11px] text-[#7897a2] truncate">{item.eyebrow}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl border border-[#dff0f4] bg-white p-6">
                <div className="flex items-center gap-2 text-sm font-bold text-[#315866]">
                  <RotateCcw className="h-4 w-4 text-[#159ac1]" /> Topic status
                </div>
                <p className="mt-4 text-3xl font-bold text-[#214554]">
                  {calculatedProgress === 100 ? "Complete" : `${calculatedProgress}%`}
                </p>
                <p className="mt-1 text-xs text-[#9bb2ba]">
                  Progress and study time are updated live on your dashboard.
                </p>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
}

function BookOpenIcon() {
  return <span className="mr-1 inline-block text-[13px]">▣</span>;
}

export { lessons };
