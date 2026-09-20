import DashboardLayout from "@/components/DashboardLayout";
import FractionVisual from "@/components/visuals/FractionVisual";
import GeometryVisual from "@/components/visuals/GeometryVisual";
import LinearEquationVisual from "@/components/visuals/LinearEquationVisual";
import PhotosynthesisVisual from "@/components/visuals/PhotosynthesisVisual";
import PlantPartsVisual from "@/components/visuals/PlantPartsVisual";
import StatesOfMatterVisual from "@/components/visuals/StatesOfMatterVisual";
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
import { useMemo, useState } from "react";
import { useLocation, useRoute } from "wouter";

const lessons = {
  Fractions: {
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Parts of a whole",
    intro: "Fractions describe equal parts of a whole and help us compare quantities clearly.",
    explanation:
      "A fraction has a numerator, which tells us how many parts we have, and a denominator, which tells us how many equal parts make the whole.",
    example: "3/4 = 6/8",
    activity: "Shade 3 of 4 equal parts, then find an equivalent fraction by multiplying both numbers by 2.",
    question: "Which fraction is equivalent to 1/2?",
    choices: ["2/4", "1/3", "3/5"],
    answer: "2/4",
  },
  "Linear equations": {
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Balance methods",
    intro: "Solve for an unknown by keeping both sides of the equation balanced.",
    explanation:
      "Whatever operation you apply to one side of an equation, apply the same operation to the other side so the equality stays true.",
    example: "2x + 3 = 11 → x = 4",
    activity: "Subtract 3 from both sides, then divide both sides by 2.",
    question: "What is x in 2x + 3 = 11?",
    choices: ["3", "4", "7"],
    answer: "4",
  },
  Geometry: {
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Angles and triangles",
    intro: "Geometry helps us describe shapes, space, and the relationships between lines and angles.",
    explanation:
      "The angles inside every triangle add up to 180°. Use known angles to work out the missing one.",
    example: "60° + 50° + 70° = 180°",
    activity: "Draw a triangle and label two angles. Calculate the third angle using the triangle rule.",
    question: "What is the angle sum of a triangle?",
    choices: ["90°", "180°", "360°"],
    answer: "180°",
  },
  Photosynthesis: {
    subject: "Science",
    level: "Grade 6",
    eyebrow: "Light-dependent reactions",
    intro: "Plants use light energy to make the food they need.",
    explanation:
      "In photosynthesis, leaves use sunlight, water, and carbon dioxide to produce glucose and oxygen inside chloroplasts.",
    example: "Sunlight + water + carbon dioxide → glucose + oxygen",
    activity: "Trace the path from sunlight to glucose in a leaf, then explain why oxygen is released.",
    question: "Which gas do plants take in during photosynthesis?",
    choices: ["Oxygen", "Carbon dioxide", "Nitrogen"],
    answer: "Carbon dioxide",
  },
  "States of matter": {
    subject: "Science",
    level: "Grade 6",
    eyebrow: "Particles in motion",
    intro: "Matter can be solid, liquid, or gas depending on how its particles are arranged and moving.",
    explanation:
      "Heating gives particles more energy. They move further apart and can change from solid to liquid to gas.",
    example: "ice → water → steam",
    activity: "Compare the particle spacing in ice, water, and steam and describe what heating changes.",
    question: "Which state has particles moving most freely?",
    choices: ["Solid", "Liquid", "Gas"],
    answer: "Gas",
  },
  "Parts of a plant": {
    subject: "Science",
    level: "Grade 5",
    eyebrow: "Roots, stems, and leaves",
    intro: "Each plant part has a role that helps the plant grow and survive.",
    explanation:
      "Roots absorb water, stems support and transport materials, and leaves use light to make food.",
    example: "Roots → water | Stem → transport | Leaves → food",
    activity: "Match each plant part to its job, then explain how the parts work together.",
    question: "Which plant part absorbs water from the soil?",
    choices: ["Roots", "Leaves", "Flowers"],
    answer: "Roots",
  },
} as const;

type Topic = keyof typeof lessons;

function renderVisualComponent(topic: Topic) {
  switch (topic) {
    case "Fractions":
      return <FractionVisual />;
    case "Linear equations":
      return <LinearEquationVisual />;
    case "Geometry":
      return <GeometryVisual />;
    case "Photosynthesis":
      return <PhotosynthesisVisual />;
    case "States of matter":
      return <StatesOfMatterVisual />;
    case "Parts of a plant":
      return <PlantPartsVisual />;
    default:
      return null;
  }
}

export default function TopicLesson() {
  const [, params] = useRoute("/dashboard/lessons/:topic");
  const [, setLocation] = useLocation();
  const topic = decodeURIComponent(params?.topic ?? "") as Topic;
  const lesson = lessons[topic];
  const { data } = trpc.dashboard.overview.useQuery();
  const utils = trpc.useUtils();
  const logStudy = trpc.dashboard.logStudy.useMutation();
  const [answer, setAnswer] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [activeMode, setActiveMode] = useState<"steps" | "visual" | "example" | "simple" | "hint" | "stuck" | "visual">(
    "visual"
  );

  const course = useMemo(() => data?.courses.find((item) => item.title === topic), [data, topic]);
  if (!lesson)
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

  const progress = course?.progress ?? 0;
  const lessonsCompleted = course?.lessonsCompleted ?? 0;
  const lessonsTotal = course?.lessonsTotal ?? 1;
  const completeLesson = () => {
    if (completed) return;
    setCompleted(true);
    if (course) {
      logStudy.mutate(
        { courseId: course.id, minutes: 15 },
        { onSuccess: () => void utils.dashboard.overview.invalidate() }
      );
    }
  };

  const modeContent =
    activeMode === "steps" ? (
      <ol className="list-decimal space-y-2 pl-5 text-sm text-[#5e7d87]">
        <li>Start with the key idea: {lesson.intro}</li>
        <li>Focus on the important relationship in {topic}.</li>
        <li>Use the worked example: {lesson.example}.</li>
        <li>Try the quick check and explain your reasoning.</li>
      </ol>
    ) : activeMode === "visual" ? (
      <div className="space-y-4">
        <p className="text-sm font-semibold text-[#315866]">
          Interactive Visual Model — test controls & observe live changes:
        </p>
        {renderVisualComponent(topic)}
      </div>
    ) : activeMode === "example" ? (
      <div>
        <p className="text-sm text-[#5e7d87]">Here is a worked example for {topic}:</p>
        <p className="mt-3 rounded-xl bg-white p-4 text-lg font-bold text-[#1d596b] border border-[#e1f0f4]">
          {lesson.example}
        </p>
        <p className="mt-3 text-sm text-[#5e7d87]">{lesson.activity}</p>
      </div>
    ) : activeMode === "simple" ? (
      <p className="text-sm text-[#5e7d87]">{lesson.explanation.split(".")[0]}.</p>
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
                <GraduationCap className="h-3.5 w-3.5" /> {lesson.subject} · {lesson.level}
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-[#173c4b] sm:text-4xl">{topic}</h1>
              <p className="mt-2 text-base text-[#7897a2]">{lesson.eyebrow}</p>
            </div>
            <div className="rounded-2xl border border-[#dff0f4] bg-white px-5 py-4">
              <div className="flex items-center justify-between gap-8">
                <span className="text-xs font-bold text-[#8aa7b1]">Topic progress</span>
                <span className="text-lg font-bold text-[#159ac1]">
                  {completed ? Math.min(100, progress + 12) : progress}%
                </span>
              </div>
              <div className="mt-2 h-2.5 w-48 overflow-hidden rounded-full bg-[#edf5f7]">
                <div
                  className="h-full rounded-full bg-[#159ac1] transition-all"
                  style={{ width: `${completed ? Math.min(100, progress + 12) : progress}%` }}
                />
              </div>
              <p className="mt-2 text-[11px] text-[#9bb2ba]">
                {completed ? Math.min(lessonsTotal, lessonsCompleted + 1) : lessonsCompleted}/{lessonsTotal} lessons
                complete
              </p>
            </div>
          </div>

          <section className="mt-7 grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <article className="rounded-2xl border border-[#dff0f4] bg-white p-6 shadow-[0_10px_35px_rgba(27,91,109,0.04)] sm:p-8">
              <div className="flex items-center gap-2 text-xs font-bold text-[#8aa7b1]">
                <Clock3 className="h-4 w-4" /> 15 minute lesson
              </div>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-[#214554]">{lesson.intro}</h2>
              <p className="mt-4 text-sm leading-7 text-[#66828c]">{lesson.explanation}</p>

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
                {renderVisualComponent(topic)}
              </div>

              {/* Mode Switcher */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-bold text-[#315866]">Choose how you would like to learn</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveMode("visual")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                      activeMode === "visual"
                        ? "bg-[#159ac1] text-white"
                        : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                    }`}
                  >
                    <Eye className="mr-1 inline h-3.5 w-3.5" /> Show visually
                  </button>
                  <button
                    onClick={() => setActiveMode("steps")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                      activeMode === "steps"
                        ? "bg-[#159ac1] text-white"
                        : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                    }`}
                  >
                    <Sparkles className="mr-1 inline h-3.5 w-3.5" /> Step by step
                  </button>
                  <button
                    onClick={() => setActiveMode("example")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                      activeMode === "example"
                        ? "bg-[#159ac1] text-white"
                        : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                    }`}
                  >
                    <Lightbulb className="mr-1 inline h-3.5 w-3.5" /> Show an example
                  </button>
                  <button
                    onClick={() => setActiveMode("simple")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                      activeMode === "simple"
                        ? "bg-[#159ac1] text-white"
                        : "bg-[#e8f8fc] text-[#159ac1] hover:bg-[#d7f2f7]"
                    }`}
                  >
                    <BookOpenIcon /> Explain simply
                  </button>
                  <button
                    onClick={() => setActiveMode("hint")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                      activeMode === "hint"
                        ? "bg-[#159ac1] text-white"
                        : "bg-[#f0edff] text-[#8979d5] hover:bg-[#e7e2f7]"
                    }`}
                  >
                    <HelpCircle className="mr-1 inline h-3.5 w-3.5" /> Give me a hint
                  </button>
                  <button
                    onClick={() => setActiveMode("stuck")}
                    className={`rounded-full px-3 py-2 text-xs font-semibold transition ${
                      activeMode === "stuck"
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
                <p className="mt-3 text-lg font-bold text-[#1d596b]">{lesson.example}</p>
                <p className="mt-2 text-sm leading-6 text-[#5e8a97]">{lesson.activity}</p>
              </div>

              <div className="mt-6 rounded-2xl border border-[#e5f0f3] p-5">
                <p className="text-sm font-bold text-[#315866]">Quick understanding check</p>
                <p className="mt-3 text-sm text-[#66828c]">{lesson.question}</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-3">
                  {lesson.choices.map((choice) => (
                    <button
                      key={choice}
                      onClick={() => setAnswer(choice)}
                      className={`rounded-xl border px-3 py-3 text-left text-sm font-semibold transition ${
                        answer === choice
                          ? choice === lesson.answer
                            ? "border-[#67c9a0] bg-[#e5f8ef] text-[#318c60]"
                            : "border-[#efab87] bg-[#fff1e9] text-[#bd6d39]"
                          : "border-[#dfeef1] text-[#6e8c97] hover:border-[#8ad5e4]"
                      }`}
                    >
                      {choice}
                    </button>
                  ))}
                </div>
                {answer && (
                  <p
                    className={`mt-3 text-xs font-semibold ${
                      answer === lesson.answer ? "text-[#318c60]" : "text-[#bd6d39]"
                    }`}
                  >
                    {answer === lesson.answer
                      ? "Correct — great reasoning."
                      : `Not quite. Try again: ${lesson.answer} is the best answer.`}
                  </p>
                )}
              </div>

              <button
                onClick={completeLesson}
                disabled={completed}
                className="mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#159ac1] text-sm font-bold text-white transition hover:bg-[#1088aa] disabled:cursor-default disabled:bg-[#67c9a0]"
              >
                <CheckCircle2 className="h-4 w-4" />
                {completed ? "Lesson completed (+15 min logged)" : "Mark lesson complete"}
              </button>
            </article>

            <aside className="space-y-5">
              <div className="rounded-2xl bg-[#dff5fb] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#159ac1]">
                  <Play className="h-5 w-5 fill-current" />
                </div>
                <h2 className="mt-5 text-xl font-bold text-[#1d596b]">Keep exploring</h2>
                <p className="mt-2 text-sm leading-6 text-[#5e8a97]">
                  Use the interactive visual simulation above, answer the check, and mark this topic complete when
                  you’re ready.
                </p>
              </div>

              <div className="rounded-2xl border border-[#dff0f4] bg-white p-6">
                <div className="flex items-center gap-2 text-sm font-bold text-[#315866]">
                  <RotateCcw className="h-4 w-4 text-[#159ac1]" /> Topic status
                </div>
                <p className="mt-4 text-3xl font-bold text-[#214554]">
                  {completed ? "Complete" : `${progress}%`}
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
