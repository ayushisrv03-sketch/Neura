import { useEffect, useMemo, useRef, useState } from "react";
import { getTopicCurriculum } from "@/lib/topicCurriculum";
import { trpc } from "@/lib/trpc";
import {
  type MLTeachingStrategy,
} from "@/lib/adaptiveStrategy";
import {
  Bot,
  Eye,
  HelpCircle,
  Leaf,
  Lightbulb,
  Loader2,
  Sparkles,
} from "lucide-react";

export interface AdaptiveBaselineQuizProps {
  selectedSubjects: string[];
  onComplete: (profileSummary?: any) => void;
  onBack: () => void;
}

const FIVE_STRATEGIES: MLTeachingStrategy[] = [
  "visual",
  "step-by-step",
  "example-based",
  "textual",
  "socratic",
];

function shuffleStrategies(): MLTeachingStrategy[] {
  const arr = [...FIVE_STRATEGIES];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function AdaptiveBaselineQuiz({
  selectedSubjects,
  onComplete,
  onBack,
}: AdaptiveBaselineQuizProps) {
  // Determine broad topic from the user's selected subjects
  const topic = useMemo(() => {
    const hasMath = selectedSubjects.some(
      (s) => s.toLowerCase().includes("math") || s.toLowerCase() === "mathematics"
    );
    if (hasMath) return "Fractions";
    const hasScience = selectedSubjects.some((s) => s.toLowerCase().includes("science"));
    if (hasScience) return "Photosynthesis";
    return "Fractions";
  }, [selectedSubjects]);

  const curriculum = useMemo(() => getTopicCurriculum(topic), [topic]);

  // Generate 5 distinct questions covering 5 distinct concepts within the topic, with randomized strategy assignments
  const questionsData = useMemo(() => {
    const strategies = shuffleStrategies();
    const lessonsList = curriculum?.lessons || [];

    return strategies.map((strategy, idx) => {
      const lesson = lessonsList[idx % lessonsList.length];
      const q = lesson?.questions?.[0] || {
        id: idx + 1,
        question: lesson?.question || "Select the correct statement:",
        choices: lesson?.choices || ["Option A", "Option B", "Option C"],
        answer: lesson?.answer || "Option A",
      };

      return {
        questionId: idx + 1,
        lessonId: lesson?.id ?? idx,
        lessonTitle: lesson?.title ?? `Concept ${idx + 1}`,
        intro: lesson?.intro ?? "",
        explanation: lesson?.explanation ?? "",
        example: lesson?.example ?? "",
        strategy,
        question: q.question,
        choices: q.choices,
        answer: q.answer,
      };
    });
  }, [curriculum, topic]);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [hintUsedMap, setHintUsedMap] = useState<Record<number, number>>({});
  const [attemptCounts, setAttemptCounts] = useState<Record<number, number>>({});
  const [recordedObservations, setRecordedObservations] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const questionStartTimeRef = useRef<number>(Date.now());
  const assessmentIdRef = useRef<string>(
    `baseline_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`
  );

  useEffect(() => {
    questionStartTimeRef.current = Date.now();
    setSelectedChoice(null);
    setShowHint(false);
  }, [currentIdx]);

  const submitBaselineMutation = trpc.adaptive.submitBaselineAssessment.useMutation();

  const currentQ = questionsData[currentIdx];
  const progressPercent = ((currentIdx + 1) / questionsData.length) * 100;

  const handleChoiceSelect = (choice: string) => {
    setSelectedChoice(choice);
    setAttemptCounts((prev) => ({
      ...prev,
      [currentIdx]: (prev[currentIdx] || 0) + 1,
    }));
  };

  const handleNext = async () => {
    if (!selectedChoice || isSubmitting) return;

    const timeTaken = Math.max(
      1,
      Math.round((Date.now() - questionStartTimeRef.current) / 1000)
    );
    const isCorrect = selectedChoice === currentQ.answer ? 1 : 0;
    const hints = hintUsedMap[currentIdx] ? 1 : 0;
    const attempts = attemptCounts[currentIdx] || 1;

    const observation = {
      lessonId: currentQ.lessonId,
      concept: currentQ.lessonTitle,
      strategy: currentQ.strategy,
      questionDifficulty: "medium",
      correct: isCorrect,
      score: isCorrect ? 100 : 0,
      timeTaken,
      attemptCount: attempts,
      hintUsed: hints,
    };

    const nextObs = [...recordedObservations, observation];
    setRecordedObservations(nextObs);

    if (currentIdx < questionsData.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Final question answered: save baseline to backend and proceed
      setIsSubmitting(true);
      try {
        const result = await submitBaselineMutation.mutateAsync({
          assessmentId: assessmentIdRef.current,
          topic,
          observations: nextObs,
        });
        onComplete(result);
      } catch (err) {
        console.warn("[Adaptive Baseline] Offline or save fallback, continuing:", err);
        onComplete();
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Strategy-specific teaching concept card
  const renderStrategyConcept = () => {
    switch (currentQ.strategy) {
      case "visual":
        return (
          <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-50 via-white to-sky-50/50 p-4 sm:p-5 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
              <Eye className="h-4 w-4" /> Visual Concept Model
            </div>
            <p className="text-sm font-semibold text-[#173c4b]">{currentQ.intro}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-bold text-[#159ac1]">
              <span className="rounded-lg bg-white px-3 py-1.5 border border-sky-200 shadow-2xs">
                Starting Idea
              </span>
              <span>→</span>
              <span className="rounded-lg bg-white px-3 py-1.5 border border-sky-200 shadow-2xs">
                {currentQ.example}
              </span>
            </div>
          </div>
        );

      case "step-by-step":
        return (
          <div className="rounded-2xl border border-sky-200/80 bg-white p-4 sm:p-5 space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700">
              <Sparkles className="h-4 w-4" /> Step-by-Step Breakdown
            </div>
            <ol className="list-decimal space-y-1.5 pl-5 text-xs sm:text-sm text-[#40474f] leading-relaxed">
              <li>
                <strong>Foundation:</strong> {currentQ.intro}
              </li>
              <li>
                <strong>Principle:</strong> {currentQ.explanation.split(".")[0]}.
              </li>
              <li>
                <strong>Observation:</strong> {currentQ.example}
              </li>
            </ol>
          </div>
        );

      case "example-based":
        return (
          <div className="rounded-2xl border border-amber-200/80 bg-[#fffdf9] p-4 sm:p-5 space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
              <Lightbulb className="h-4 w-4" /> Worked Real-World Example
            </div>
            <p className="text-xs text-[#5e7d87]">{currentQ.intro}</p>
            <div className="rounded-xl bg-white p-3.5 text-sm font-bold text-[#1d596b] border border-amber-100">
              {currentQ.example}
            </div>
          </div>
        );

      case "textual":
        return (
          <div className="rounded-2xl border border-[#dff0f4] bg-white p-4 sm:p-5 space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-[#159ac1]">
              <Leaf className="h-4 w-4" /> Direct Concept Definition
            </div>
            <p className="text-sm text-[#214554] leading-relaxed">
              <strong>{currentQ.intro}</strong> {currentQ.explanation}
            </p>
          </div>
        );

      case "socratic":
      default:
        return (
          <div className="rounded-2xl border border-indigo-200/80 bg-[#f9f8ff] p-4 sm:p-5 space-y-2.5 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-700">
              <Bot className="h-4 w-4" /> Guided Socratic Discovery
            </div>
            <p className="text-sm text-[#313852] italic leading-relaxed">
              "Notice how {currentQ.intro.toLowerCase()} What happens when you consider that {currentQ.example}?"
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header & Step progress */}
      <div className="flex flex-col gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-sky-600">
          Step 3 • Adaptive Baseline Quiz
        </span>
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight text-[#173c4b] sm:text-2xl">
            {currentQ.lessonTitle}
          </h1>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-800">
            Question {currentIdx + 1} of {questionsData.length}
          </span>
        </div>
        <p className="text-xs text-[#5e7d87]">
          Topic: <strong>{topic}</strong> • Testing your natural response across 5 adaptive teaching approaches.
        </p>

        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-[#e2e7ff]">
          <div
            className="h-full rounded-full bg-sky-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Teaching approach card */}
      {renderStrategyConcept()}

      {/* Question prompt & choices */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-[#173c4b] sm:text-lg">
          {currentQ.question}
        </h2>

        <div className="grid gap-2.5 sm:grid-cols-3">
          {currentQ.choices.map((choice) => {
            const isSelected = selectedChoice === choice;
            return (
              <button
                key={choice}
                type="button"
                onClick={() => handleChoiceSelect(choice)}
                className={`flex items-center justify-between rounded-xl border p-4 text-left text-sm font-semibold transition ${
                  isSelected
                    ? "border-sky-600 bg-sky-50/90 text-sky-900 ring-2 ring-sky-300/50"
                    : "border-[#c0c7d1]/50 bg-white text-[#40474f] hover:bg-[#f2f3ff] hover:border-sky-300"
                }`}
              >
                <span>{choice}</span>
                <span className={`text-base ${isSelected ? "text-sky-600 font-bold" : "text-[#c0c7d1]"}`}>
                  {isSelected ? "●" : "○"}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gentle hint button */}
      <div className="flex items-center justify-between pt-1">
        {!showHint ? (
          <button
            type="button"
            onClick={() => {
              setShowHint(true);
              setHintUsedMap((prev) => ({ ...prev, [currentIdx]: 1 }));
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8979d5] hover:text-[#6a56c7] transition"
          >
            <HelpCircle className="h-3.5 w-3.5" /> Need a gentle hint?
          </button>
        ) : (
          <p className="text-xs text-[#5e7d87] bg-[#f8f6ff] p-3 rounded-xl border border-[#e2e0f8] flex items-center gap-2">
            <strong>Hint:</strong> Look closely at the relationship in the concept card above and apply it to this question.
          </p>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="mt-2 flex items-center justify-between gap-3 border-t border-[#e2e7ff]/60 pt-6">
        <button
          type="button"
          onClick={() => {
            if (currentIdx > 0) setCurrentIdx((prev) => prev - 1);
            else onBack();
          }}
          className="rounded-full bg-[#eaedff] px-5 py-2.5 text-sm font-medium transition hover:bg-[#e2e7ff]"
        >
          ← Back
        </button>

        <button
          type="button"
          onClick={handleNext}
          disabled={!selectedChoice || isSubmitting}
          className={`rounded-full bg-sky-600 px-7 py-3 text-base font-medium text-white shadow-sm transition flex items-center gap-2 ${
            !selectedChoice || isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-sky-700"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving baseline...
            </>
          ) : currentIdx === questionsData.length - 1 ? (
            "Complete Quiz →"
          ) : (
            "Next Question →"
          )}
        </button>
      </div>
    </div>
  );
}
