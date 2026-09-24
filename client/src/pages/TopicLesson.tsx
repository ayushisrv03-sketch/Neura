import DashboardLayout from "@/components/DashboardLayout";
import { LessonVisualDispatcher } from "@/components/visuals/LessonVisualDispatcher";
import {
  getTopicCompletedLessons,
  getTopicCurriculum,
  isPredefinedTopic,
  lessons,
  setTopicLessonCompleted,
} from "@/lib/topicCurriculum";
import { useAuth } from "@/_core/hooks/useAuth";
import { useLearningPreferences } from "@/hooks/useLearningPreferences";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  CheckCircle2,
  Clock3,
  Eye,
  GraduationCap,
  HelpCircle,
  Layers,
  Leaf,
  Lightbulb,
  Loader2,
  Pause,
  Send,
  Sparkles,
  User,
  Volume2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useRoute } from "wouter";
import { Streamdown } from "streamdown";

type TutorMessage = {
  role: "user" | "assistant";
  content: string;
};

const INITIAL_TUTOR_MESSAGE: TutorMessage = {
  role: "assistant",
  content:
    "Hey! I'm your Neura AI Tutor. Ask me anything about this lesson, and I'll help you understand it step by step.",
};

export default function TopicLesson() {
  const [, params] = useRoute("/dashboard/lessons/:topic");
  const [, setLocation] = useLocation();
  const topic = decodeURIComponent(params?.topic ?? "");
  const curriculum = useMemo(() => getTopicCurriculum(topic), [topic]);

  const { user } = useAuth();
  const userId = user?.id || user?.openId || user?.email;

  const { selectedSubjects, setSelectedSubjects, isSubjectSelected, subjectSummary, selectedFormats } = useLearningPreferences(userId);

  // Learning methods visibility:
  // 1. Show visually is kept for EVERY user regardless of onboarding selection
  const showVisual = true;
  // 2. Other methods are shown ONLY if selected during onboarding
  const showSteps = selectedFormats.some((f) => f.toLowerCase() === "step-by-step" || f.toLowerCase() === "step by step");
  const showExamples = selectedFormats.some((f) => f.toLowerCase() === "examples" || f.toLowerCase() === "example");
  const showAudio = selectedFormats.some((f) => f.toLowerCase() === "audio");
  const showInteractive = selectedFormats.some((f) => f.toLowerCase() === "interactive");

  const { data } = trpc.dashboard.overview.useQuery();
  const utils = trpc.useUtils();
  const logStudy = trpc.dashboard.logStudy.useMutation();

  const [completedIndices, setCompletedIndices] = useState<number[]>(() =>
    getTopicCompletedLessons(topic, userId)
  );

  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      const param = search.get("lesson");
      if (param) {
        const parsed = parseInt(param, 10) - 1;
        if (parsed >= 0 && parsed < (curriculum?.lessons?.length ?? 0)) return parsed;
      }
    }
    return 0;
  });

  const isPredefined = useMemo(() => isPredefinedTopic(topic), [topic]);

  // If this topic is not in the predefined curriculum, navigate directly to the dedicated AI Tutor page
  useEffect(() => {
    if (topic && !isPredefinedTopic(topic)) {
      const search = window.location.search;
      setLocation(`/dashboard/tutor/${encodeURIComponent(topic)}${search}`, { replace: true });
    }
  }, [topic, setLocation]);

  const getInitialTutorGreeting = (topicName: string): TutorMessage => {
    if (isPredefinedTopic(topicName)) {
      return INITIAL_TUTOR_MESSAGE;
    }
    return {
      role: "assistant",
      content: `Hey! While **${topicName}** is not in our standard curriculum right now, I'm your Neura AI Tutor and I'm ready to teach you everything about it step by step! What would you like to explore or learn first?`,
    };
  };

  const [activeMode, setActiveMode] = useState<
    "steps" | "visual" | "example" | "audio" | "hint" | "stuck" | "tutor"
  >(() => {
    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      const modeParam = search.get("mode");
      if (modeParam === "tutor") return "tutor";
    }
    if (!isPredefinedTopic(topic)) return "tutor";
    return "visual";
  });
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [tutorMessages, setTutorMessages] = useState<TutorMessage[]>([
    getInitialTutorGreeting(topic),
  ]);
  const [tutorInput, setTutorInput] = useState("");
  const [tutorError, setTutorError] = useState<string | null>(null);
  const tutorScrollRef = useRef<HTMLDivElement>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const activeLesson = curriculum?.lessons?.[activeLessonIdx] || curriculum?.lessons?.[0];

  const toggleAudioPlay = () => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    if (!activeLesson) return;
    const textToSpeak = `${activeLesson.title}. ${activeLesson.intro}. ${activeLesson.explanation}. Worked example: ${activeLesson.example}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeLessonIdx, topic]);

  useEffect(() => {
    if (activeMode === "steps" && !showSteps) setActiveMode("visual");
    if (activeMode === "example" && !showExamples) setActiveMode("visual");
    if (activeMode === "audio" && !showAudio) setActiveMode("visual");
  }, [activeMode, showSteps, showExamples, showAudio]);

  const tutorMutation = trpc.ai.tutorChat.useMutation({
    onSuccess: (res) => {
      setTutorMessages((prev) => [...prev, { role: "assistant", content: res.reply }]);
      setTutorError(null);
    },
    onError: (err) => {
      setTutorError(err.message || "Sorry, I couldn't connect to your AI Tutor right now. Try again in a moment.");
    },
  });

  useEffect(() => {
    const handleSync = () => {
      const search = new URLSearchParams(window.location.search);
      const param = search.get("lesson");
      if (param && curriculum) {
        const parsed = parseInt(param, 10) - 1;
        if (parsed >= 0 && parsed < curriculum.lessons.length) {
          setActiveLessonIdx(parsed);
        }
      } else {
        setActiveLessonIdx(0);
      }
      setCompletedIndices(getTopicCompletedLessons(topic, userId));
      setAnswers({});
      setCurrentQIdx(0);
      setTutorMessages([getInitialTutorGreeting(topic)]);
      setTutorError(null);
      setTutorInput("");
    };

    const handleLessonSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ topic: string; completed: number[]; userKey?: string }>;
      if (customEvent.detail) {
        if (!customEvent.detail.topic || customEvent.detail.topic === topic) {
          setCompletedIndices(customEvent.detail.completed || []);
        }
      }
    };

    window.addEventListener("popstate", handleSync);
    window.addEventListener("neura-lesson-completed", handleLessonSync);

    return () => {
      window.removeEventListener("popstate", handleSync);
      window.removeEventListener("neura-lesson-completed", handleLessonSync);
    };
  }, [topic, curriculum?.lessons?.length, userId]);

  useEffect(() => {
    setCompletedIndices(getTopicCompletedLessons(topic, userId));
    setAnswers({});
    setCurrentQIdx(0);
    setTutorMessages([getInitialTutorGreeting(topic)]);
    setTutorError(null);
    setTutorInput("");
  }, [topic, activeLessonIdx, userId]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      const modeParam = search.get("mode");
      const promptParam = search.get("prompt");

      if (modeParam === "tutor" || !isPredefined) {
        setActiveMode("tutor");
        setTimeout(() => {
          document.getElementById("ai-tutor-container")?.scrollIntoView({ behavior: "smooth" });
        }, 200);
      }

      if (promptParam && promptParam.trim()) {
        const text = promptParam.trim();
        const baseGreeting = getInitialTutorGreeting(topic);
        setTutorMessages([
          baseGreeting,
          { role: "user", content: text },
        ]);
        tutorMutation.mutate({
          topic,
          lessonTitle: activeLesson?.title || topic,
          lessonContent: `${activeLesson?.intro || ""} ${activeLesson?.explanation || ""}`,
          currentMode: "tutor",
          conversation: [],
          message: text,
        });
      }
    }
  }, [topic, isPredefined]);

  useEffect(() => {
    if (activeMode === "tutor") {
      tutorScrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [tutorMessages, tutorMutation.isPending, tutorError, activeMode]);

  const isLessonCompleted = completedIndices.includes(activeLessonIdx);
  const isLastLesson = curriculum ? activeLessonIdx >= curriculum.lessons.length - 1 : true;

  const lessonQuestions = useMemo(() => {
    if (!activeLesson) return [];
    if (Array.isArray((activeLesson as any).questions) && (activeLesson as any).questions.length > 0) {
      return (activeLesson as any).questions as { question: string; choices: string[]; answer: string }[];
    }
    return [
      {
        question: activeLesson.question,
        choices: activeLesson.choices,
        answer: activeLesson.answer,
      },
    ];
  }, [activeLesson]);

  const activeQ = lessonQuestions[currentQIdx] || lessonQuestions[0] || activeLesson;
  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(
    ([idx, ans]) => lessonQuestions[Number(idx)]?.answer === ans
  ).length;

  const isLastQuestion = lessonQuestions.length > 0 && currentQIdx === lessonQuestions.length - 1;
  const isCurrentAnswered = Boolean(answers[currentQIdx]);
  const allQuestionsAnswered =
    lessonQuestions.length > 0 && lessonQuestions.every((_, idx) => Boolean(answers[idx]));
  const canGoNext = isCurrentAnswered || isLessonCompleted;

  const handleNextQuestion = () => {
    if (currentQIdx < lessonQuestions.length - 1) {
      setCurrentQIdx((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIdx > 0) {
      setCurrentQIdx((prev) => prev - 1);
    }
  };

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

  if (isPredefined && !isSubjectSelected(curriculum.subject))
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
  const completeLesson = () => {
    if (isLessonCompleted) return;
    const updated = setTopicLessonCompleted(topic, activeLessonIdx, userId);
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

  const handleSendTutorMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = tutorInput.trim();
    if (!trimmed || tutorMutation.isPending) return;

    const newMessages: TutorMessage[] = [...tutorMessages, { role: "user", content: trimmed }];
    setTutorMessages(newMessages);
    setTutorInput("");
    setTutorError(null);

    const lessonContent = [
      `Introduction: ${activeLesson.intro}`,
      `Explanation: ${activeLesson.explanation}`,
      `Example: ${activeLesson.example}`,
      activeLesson.activity ? `Activity: ${activeLesson.activity}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    tutorMutation.mutate({
      topic,
      lessonTitle: activeLesson.title,
      lessonContent,
      currentMode: activeMode,
      currentQuestion: activeQ
        ? {
            question: activeQ.question,
            options: activeQ.choices,
          }
        : undefined,
      conversation: tutorMessages
        .filter((m) => m !== INITIAL_TUTOR_MESSAGE)
        .map((m) => ({ role: m.role, content: m.content })),
      message: trimmed,
    });
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
    ) : activeMode === "audio" ? (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-[#315866]">
            Audio Narration &amp; Calm Read-Aloud
          </p>
          <button
            type="button"
            onClick={toggleAudioPlay}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold text-white transition ${
              isSpeaking ? "bg-amber-500 hover:bg-amber-600" : "bg-[#159ac1] hover:bg-[#0e7795]"
            }`}
          >
            {isSpeaking ? (
              <>
                <Pause className="h-3.5 w-3.5" /> Pause narration
              </>
            ) : (
              <>
                <Volume2 className="h-3.5 w-3.5" /> Listen to lesson
              </>
            )}
          </button>
        </div>
        <p className="text-sm text-[#5e7d87] leading-relaxed italic bg-white p-3.5 rounded-xl border border-[#e1f0f4]">
          "{activeLesson.intro} {activeLesson.explanation}"
        </p>
      </div>
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
    ) : activeMode === "tutor" ? (
      <div id="ai-tutor-container" className="space-y-4">
        <div className="border-b border-[#dff0f4] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e8f8fc] text-[#159ac1]">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#173c4b]">Neura AI Tutor</h4>
              <p className="text-xs text-[#7897a2]">Ask me anything about this lesson.</p>
            </div>
          </div>
        </div>

        <div className="max-h-[360px] min-h-[160px] overflow-y-auto space-y-3 pr-1">
          {tutorMessages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.role === "assistant" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e8f8fc] text-[#159ac1] mt-0.5">
                  <Bot className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#159ac1] text-white rounded-tr-sm"
                    : "bg-white text-[#214554] border border-[#dff0f4] shadow-[0_2px_10px_rgba(27,91,109,0.03)] rounded-tl-sm"
                }`}
              >
                {msg.role === "assistant" ? (
                  <div className="prose prose-sm max-w-none text-[#214554] [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-4 [&>ol]:list-decimal [&>ol]:pl-4 [&>code]:bg-[#edf5f7] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded">
                    <Streamdown>{msg.content}</Streamdown>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap">{msg.content}</p>
                )}
              </div>
              {msg.role === "user" && (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#edf5f7] text-[#6e8c97] mt-0.5">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {tutorMutation.isPending && (
            <div className="flex items-start gap-2.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e8f8fc] text-[#159ac1] mt-0.5">
                <Bot className="h-4 w-4" />
              </div>
              <div className="rounded-2xl rounded-tl-sm border border-[#dff0f4] bg-white px-4 py-2.5 text-sm shadow-[0_2px_10px_rgba(27,91,109,0.03)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#159ac1]">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}

          {tutorError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
              {tutorError}
            </div>
          )}

          <div ref={tutorScrollRef} />
        </div>

        <form onSubmit={handleSendTutorMessage} className="flex items-center gap-2 pt-2">
          <input
            type="text"
            value={tutorInput}
            onChange={(e) => setTutorInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendTutorMessage();
              }
            }}
            placeholder="Ask me anything about this lesson..."
            disabled={tutorMutation.isPending}
            className="flex-1 rounded-xl border border-[#dfeef1] bg-white px-4 py-2.5 text-sm text-[#214554] placeholder-[#8aa7b1] focus:border-[#159ac1] focus:outline-none focus:ring-1 focus:ring-[#159ac1] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!tutorInput.trim() || tutorMutation.isPending}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#159ac1] text-white transition hover:bg-[#1088aa] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Send message"
          >
            {tutorMutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    ) : null;

  return (
    <DashboardLayout allowGuest>
      <div className="min-h-screen bg-[#f6fbfd] text-[#214554]">
        <main className="mx-auto max-w-[1300px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 mb-2">
            <button
              onClick={() => setLocation("/dashboard")}
              className="flex items-center gap-2 text-sm font-bold text-[#159ac1] transition hover:text-[#0e7795]"
            >
              <ArrowLeft className="h-4 w-4" /> Back to dashboard
            </button>
          </div>

          {!isPredefined && (
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-[#bde9f3] bg-[#e8f8fc] p-4 text-[#1d596b] shadow-sm">
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#159ac1] shadow-xs">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#159ac1] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      AI Tutor Custom Topic
                    </span>
                    <span className="text-xs font-semibold text-[#528795]">Not in standard curriculum</span>
                  </div>
                  <h2 className="mt-1 text-base font-bold text-[#173c4b]">
                    Learning “{topic}” with Neura AI Tutor
                  </h2>
                  <p className="mt-0.5 text-xs text-[#5e818d] leading-relaxed">
                    This topic is not part of the standard curriculum. Neura's AI Tutor has crafted this 12-lesson study path for you and is ready to teach you every step.
                  </p>
                </div>
              </div>
              {activeMode !== "tutor" && (
                <button
                  onClick={() => {
                    setActiveMode("tutor");
                    document.getElementById("ai-tutor-container")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="shrink-0 rounded-xl bg-[#159ac1] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1088aa] transition"
                >
                  Open AI Tutor →
                </button>
              )}
            </div>
          )}
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

          <section className="mt-7">
            <article className="w-full rounded-2xl border border-[#dff0f4] bg-white p-6 shadow-[0_10px_35px_rgba(27,91,109,0.04)] sm:p-8 lg:p-10">
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
              <div id="interactive-visual-sandbox" className="mt-7">
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
                  {/* Visual is kept for every user */}
                  <button
                    onClick={() => setActiveMode("visual")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "visual"
                      ? "bg-[#159ac1] text-white"
                      : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                      }`}
                  >
                    <Eye className="mr-1 inline h-3.5 w-3.5" /> Show visually
                  </button>

                  {/* Step by step - only if selected in onboarding */}
                  {showSteps && (
                    <button
                      onClick={() => setActiveMode("steps")}
                      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "steps"
                        ? "bg-[#159ac1] text-white"
                        : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                        }`}
                    >
                      <Sparkles className="mr-1 inline h-3.5 w-3.5" /> Step by step
                    </button>
                  )}

                  {/* Show an example - only if selected in onboarding */}
                  {showExamples && (
                    <button
                      onClick={() => setActiveMode("example")}
                      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "example"
                        ? "bg-[#159ac1] text-white"
                        : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                        }`}
                    >
                      <Lightbulb className="mr-1 inline h-3.5 w-3.5" /> Show an example
                    </button>
                  )}

                  {/* Audio narration - only if selected in onboarding */}
                  {showAudio && (
                    <button
                      onClick={() => {
                        setActiveMode("audio");
                        toggleAudioPlay();
                      }}
                      className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "audio"
                        ? "bg-[#159ac1] text-white"
                        : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                        }`}
                    >
                      <Volume2 className="mr-1 inline h-3.5 w-3.5" /> Audio narration
                    </button>
                  )}

                  {/* Interactive model - only if selected in onboarding */}
                  {showInteractive && (
                    <button
                      onClick={() => {
                        setActiveMode("visual");
                        const el = document.getElementById("interactive-visual-sandbox");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="rounded-full px-3 py-2 text-xs font-semibold bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7] transition"
                    >
                      <Layers className="mr-1 inline h-3.5 w-3.5" /> Interactive model
                    </button>
                  )}

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
                  <button
                    onClick={() => setActiveMode("tutor")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${activeMode === "tutor"
                      ? "bg-[#159ac1] text-white"
                      : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                      }`}
                  >
                    <Bot className="mr-1 inline h-3.5 w-3.5" /> AI Tutor
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
                            : activeMode === "audio"
                              ? "Audio narration"
                              : activeMode === "hint"
                                ? "A gentle hint"
                                : activeMode === "stuck"
                                  ? "You are not alone"
                                  : "Neura AI Tutor"}
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
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveMode("tutor");
                        const el = document.getElementById("ai-tutor-container");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="flex items-center gap-1 rounded-full bg-[#e8f8fc] px-2.5 py-1 text-xs font-semibold text-[#159ac1] transition hover:bg-[#d7f2f7]"
                    >
                      <Bot className="h-3.5 w-3.5" /> Ask AI Tutor
                    </button>
                    {answeredCount > 0 && (
                      <span className="text-xs font-bold text-[#277f59] bg-[#eaf7f1] px-2.5 py-1 rounded-full">
                        Score: {correctCount}/{lessonQuestions.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Selector Tabs */}
                <div className="flex gap-2 mb-4">
                  {lessonQuestions.map((_, idx: number) => (
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

                <p className="text-sm font-semibold text-[#214554]">{activeQ?.question}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {activeQ?.choices.map((choice: string) => (
                    <button
                      key={choice}
                      onClick={() => setAnswers((prev) => ({ ...prev, [currentQIdx]: choice }))}
                      className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${answers[currentQIdx] === choice
                          ? choice === activeQ.answer
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
                    className={`mt-3 text-xs font-semibold ${answers[currentQIdx] === activeQ?.answer ? "text-[#318c60]" : "text-[#bd6d39]"
                      }`}
                  >
                    {answers[currentQIdx] === activeQ?.answer
                      ? "Correct — great reasoning."
                      : `Not quite. Correct answer: ${activeQ?.answer}`}
                  </p>
                )}

                {/* Question Navigation & Lesson Completion */}
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-[#f0f7f9]">
                  {currentQIdx > 0 && (
                    <button
                      type="button"
                      onClick={handlePrevQuestion}
                      className="flex h-12 w-full sm:w-auto sm:min-w-[160px] items-center justify-center gap-2 rounded-xl border border-[#dfeef1] bg-white px-5 text-sm font-bold text-[#426b78] transition hover:bg-[#f2f9fb] hover:border-[#159ac1]/40"
                    >
                      <ArrowLeft className="h-4 w-4" /> Previous question
                    </button>
                  )}

                  {!isLastQuestion ? (
                    <button
                      type="button"
                      onClick={handleNextQuestion}
                      disabled={!canGoNext}
                      className={`flex h-12 flex-1 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition shadow-xs ${
                        canGoNext
                          ? "bg-[#159ac1] text-white hover:bg-[#1088aa] cursor-pointer"
                          : "bg-[#e5eff2] text-[#8aa7b1] cursor-not-allowed border border-[#d6e7ec]"
                      }`}
                    >
                      Next question <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={completeLesson}
                      disabled={isLessonCompleted || !isCurrentAnswered || !allQuestionsAnswered}
                      className={`flex h-12 flex-1 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition shadow-xs ${
                        isLessonCompleted
                          ? "bg-[#67c9a0] text-white cursor-default"
                          : isCurrentAnswered && allQuestionsAnswered
                            ? "bg-[#159ac1] text-white hover:bg-[#1088aa] cursor-pointer"
                            : "bg-[#e5eff2] text-[#8aa7b1] cursor-not-allowed border border-[#d6e7ec]"
                      }`}
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      {isLessonCompleted
                        ? `Lesson ${activeLessonIdx + 1} completed (+15 min logged)`
                        : !allQuestionsAnswered
                          ? `Answer all questions to complete (${answeredCount}/${lessonQuestions.length})`
                          : "Mark lesson complete"}
                    </button>
                  )}
                </div>
              </div>

              {isLessonCompleted && !isLastLesson && (
                <button
                  type="button"
                  onClick={() => {
                    const nextIdx = activeLessonIdx + 1;
                    setActiveLessonIdx(nextIdx);
                    const search = new URLSearchParams(window.location.search);
                    search.set("lesson", (nextIdx + 1).toString());
                    const newUrl = `${window.location.pathname}?${search.toString()}`;
                    window.history.pushState({}, "", newUrl);
                    window.dispatchEvent(new Event("popstate"));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#159ac1] bg-[#e8f8fc] text-sm font-bold text-[#159ac1] transition hover:bg-[#d4f2f8]"
                >
                  Continue to next lesson: Lesson {activeLessonIdx + 2} <ArrowRight className="h-4 w-4" />
                </button>
              )}
              {isLessonCompleted && isLastLesson && nextTopic && (
                <button
                  type="button"
                  onClick={() => setLocation(`/dashboard/lessons/${encodeURIComponent(nextTopic.title)}`)}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#159ac1] bg-[#e8f8fc] text-sm font-bold text-[#159ac1] transition hover:bg-[#d4f2f8]"
                >
                  Continue to next topic: {nextTopic.title} <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </article>
          </section>
        </main>
      </div>
    </DashboardLayout>
  );
}

export { lessons };
