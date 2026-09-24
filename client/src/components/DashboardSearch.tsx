import { getAllPredefinedLessons, isPredefinedTopic } from "@/lib/topicCurriculum";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CheckCircle2,
  CornerDownLeft,
  GraduationCap,
  HelpCircle,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "wouter";

interface PredefinedTopicMeta {
  title: string;
  subject: string;
  level: string;
  eyebrow: string;
  accent: string;
  icon: "fraction" | "equation" | "geometry" | "leaf" | "matter" | "plant";
  keywords: string[];
}

const PREDEFINED_TOPICS: PredefinedTopicMeta[] = [
  {
    title: "Fractions",
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Parts of a whole",
    accent: "#4abbd4",
    icon: "fraction",
    keywords: ["fraction", "fractions", "numerator", "denominator", "half", "quarter", "maths", "math", "divide", "equivalent"],
  },
  {
    title: "Linear equations",
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Balance methods",
    accent: "#6bd6ae",
    icon: "equation",
    keywords: ["linear equations", "linear", "equations", "algebra", "variable", "solve for x", "maths", "math", "balance method", "unknowns"],
  },
  {
    title: "Geometry",
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Angles and shapes",
    accent: "#b4a6f4",
    icon: "geometry",
    keywords: ["geometry", "angle", "angles", "triangle", "triangles", "polygons", "circles", "area", "perimeter", "maths", "math", "shapes"],
  },
  {
    title: "Photosynthesis",
    subject: "Science",
    level: "Grade 6",
    eyebrow: "The role of sunlight",
    accent: "#43b485",
    icon: "leaf",
    keywords: ["photosynthesis", "chlorophyll", "plants", "sunlight", "glucose", "stomata", "science", "biology", "solar", "leaves"],
  },
  {
    title: "States of matter",
    subject: "Science",
    level: "Grade 6",
    eyebrow: "Particles in motion",
    accent: "#ed946a",
    icon: "matter",
    keywords: ["states of matter", "matter", "solids", "liquids", "gas", "plasma", "melting", "boiling", "condensation", "sublimation", "science", "physics"],
  },
  {
    title: "Parts of a plant",
    subject: "Science",
    level: "Grade 5",
    eyebrow: "Roots and their jobs",
    accent: "#e0a93a",
    icon: "plant",
    keywords: ["parts of a plant", "plant", "plants", "roots", "stem", "leaves", "flower", "pollination", "botany", "science", "biology"],
  },
];

interface DashboardSearchProps {
  className?: string;
  onSearchChange?: (query: string) => void;
  externalQuery?: string;
}

export function DashboardSearch({
  className = "",
  onSearchChange,
  externalQuery,
}: DashboardSearchProps) {
  const [, setLocation] = useLocation();
  const [internalQuery, setInternalQuery] = useState(externalQuery || "");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const query = externalQuery !== undefined ? externalQuery : internalQuery;

  const handleQueryChange = (val: string) => {
    setInternalQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
    setSelectedIndex(-1);
    if (!isOpen) setIsOpen(true);
  };

  // Close search dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Global keyboard shortcut: Ctrl+K or Cmd+K or / to focus search
  useEffect(() => {
    function handleGlobalKeyDown(e: KeyboardEvent) {
      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" &&
          document.activeElement?.tagName !== "INPUT" &&
          document.activeElement?.tagName !== "TEXTAREA")
      ) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      }
    }

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  const cleanQuery = query.trim().toLowerCase();

  // Search through all predefined curriculum lessons
  const allLessons = useMemo(() => getAllPredefinedLessons(), []);

  // Filter predefined topics
  const matchedTopics = useMemo(() => {
    if (!cleanQuery) return [];
    return PREDEFINED_TOPICS.filter((t) => {
      const titleMatch = t.title.toLowerCase().includes(cleanQuery);
      const subjectMatch = t.subject.toLowerCase().includes(cleanQuery);
      const keywordMatch = t.keywords.some((k) => k.includes(cleanQuery) || cleanQuery.includes(k));
      return titleMatch || subjectMatch || keywordMatch;
    });
  }, [cleanQuery]);

  // Filter predefined lessons
  const matchedLessons = useMemo(() => {
    if (!cleanQuery) return [];
    return allLessons
      .filter((lesson) => {
        const titleMatch = lesson.title.toLowerCase().includes(cleanQuery);
        const introMatch = lesson.intro.toLowerCase().includes(cleanQuery);
        return titleMatch || introMatch;
      })
      .slice(0, 4); // Limit to top 4 lessons
  }, [allLessons, cleanQuery]);

  const hasCurriculumMatch = matchedTopics.length > 0 || matchedLessons.length > 0;

  // Flatten selectable items for keyboard navigation
  const selectableItems = useMemo(() => {
    if (!cleanQuery) {
      return PREDEFINED_TOPICS.map((t) => ({
        type: "topic" as const,
        title: t.title,
        url: `/dashboard/lessons/${encodeURIComponent(t.title)}`,
      }));
    }

    if (hasCurriculumMatch) {
      const items: Array<{
        type: "topic" | "lesson" | "ai-fallback";
        title: string;
        url: string;
      }> = [];

      matchedTopics.forEach((t) => {
        items.push({
          type: "topic",
          title: t.title,
          url: `/dashboard/lessons/${encodeURIComponent(t.title)}`,
        });
      });

      matchedLessons.forEach((l) => {
        items.push({
          type: "lesson",
          title: l.title,
          url: `/dashboard/lessons/${encodeURIComponent(l.topic)}?lesson=${l.lessonNumber}`,
        });
      });

      return items;
    }

    // No curriculum match: AI Tutor is the primary action
    return [
      {
        type: "ai-tutor" as const,
        title: `Ask AI Tutor about "${query.trim()}"`,
        url: `/dashboard/tutor/${encodeURIComponent(query.trim())}`,
      },
    ];
  }, [cleanQuery, hasCurriculumMatch, matchedTopics, matchedLessons, query]);

  // Handle keyboard navigation (Arrow Up, Down, Enter, Escape)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < selectableItems.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : selectableItems.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && selectedIndex < selectableItems.length) {
        navigateTo(selectableItems[selectedIndex].url);
      } else if (cleanQuery) {
        if (hasCurriculumMatch && matchedTopics.length > 0) {
          navigateTo(`/dashboard/lessons/${encodeURIComponent(matchedTopics[0].title)}`);
        } else if (hasCurriculumMatch && matchedLessons.length > 0) {
          navigateTo(
            `/dashboard/lessons/${encodeURIComponent(matchedLessons[0].topic)}?lesson=${matchedLessons[0].lessonNumber}`
          );
        } else {
          // Guide to AI tutor
          navigateTo(
            `/dashboard/tutor/${encodeURIComponent(query.trim())}`
          );
        }
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const navigateTo = (url: string) => {
    setIsOpen(false);
    setLocation(url);
  };

  const handleLearnWithAITutor = (prompt?: string) => {
    const topicUrl = `/dashboard/tutor/${encodeURIComponent(query.trim())}${
      prompt ? `?prompt=${encodeURIComponent(prompt)}` : ""
    }`;
    navigateTo(topicUrl);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Search Input Bar */}
      <div className="relative flex items-center">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8aa7b1] pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search courses, lessons, or topics"
          aria-label="Search courses, lessons, or topics"
          className="h-11 w-full rounded-xl border border-[#e4eff2] bg-white pl-11 pr-16 text-sm text-[#214554] outline-none transition placeholder:text-[#9ab0b8] focus:border-[#8ad5e4] focus:ring-4 focus:ring-[#dff5fa]"
        />

        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1.5">
          {query ? (
            <button
              type="button"
              onClick={() => {
                handleQueryChange("");
                inputRef.current?.focus();
              }}
              className="grid h-6 w-6 place-items-center rounded-md text-[#9ab0b8] hover:bg-[#edf5f7] hover:text-[#214554] transition"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          ) : (
            <span className="hidden sm:inline-flex items-center rounded border border-[#e4eff2] bg-[#f8fcfd] px-1.5 py-0.5 text-[10px] font-semibold text-[#9ab0b8]">
              ⌘K
            </span>
          )}
        </div>
      </div>

      {/* Live Search Results Dropdown */}
      {isOpen && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full min-w-[320px] sm:min-w-[420px] max-w-[540px] overflow-hidden rounded-2xl border border-[#dff0f4] bg-white/95 p-3 shadow-[0_15px_45px_rgba(27,91,109,0.12)] backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
          {/* STATE 1: Empty Query - Predefined Topics List */}
          {!cleanQuery && (
            <div className="p-2">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#edf4f6]">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#159ac1]">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Predefined Curriculum Topics</span>
                </div>
                <span className="text-[11px] text-[#8aa7b1]">6 topics</span>
              </div>
              <p className="text-xs text-[#7897a2] mb-3">
                Click any topic to start learning, or type in the search bar to find specific lessons or custom topics.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {PREDEFINED_TOPICS.map((topic, idx) => {
                  const isSelected = selectedIndex === idx;
                  return (
                    <button
                      key={topic.title}
                      onClick={() =>
                        navigateTo(
                          `/dashboard/lessons/${encodeURIComponent(topic.title)}`
                        )
                      }
                      className={`flex items-center gap-2.5 rounded-xl border p-2.5 text-left transition ${
                        isSelected
                          ? "border-[#159ac1] bg-[#e8f8fc] shadow-sm"
                          : "border-[#e6f1f4] bg-white hover:border-[#bfe5ee] hover:bg-[#f4fbfd]"
                      }`}
                    >
                      <div
                        className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-white"
                        style={{ backgroundColor: topic.accent }}
                      >
                        {topic.icon === "leaf" || topic.icon === "plant" ? (
                          <BookOpen className="h-4 w-4" />
                        ) : (
                          <GraduationCap className="h-4 w-4" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs font-bold text-[#214554]">
                          {topic.title}
                        </p>
                        <p className="truncate text-[10px] text-[#8aa7b1]">
                          {topic.subject} · {topic.level}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 rounded-xl bg-[#f2fafc] p-2.5 flex items-center justify-between text-[11px] text-[#638794]">
                <span>Want to learn a custom topic?</span>
                <span className="font-semibold text-[#159ac1]">Type any topic to ask AI Tutor →</span>
              </div>
            </div>
          )}

          {/* STATE 2: Query matches predefined curriculum */}
          {cleanQuery && hasCurriculumMatch && (
            <div className="max-h-[380px] overflow-y-auto space-y-3 p-1">
              <div className="flex items-center justify-between px-2 pt-1 pb-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#277f59]">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#277f59]" />
                  <span>Found in Curriculum</span>
                </div>
                <span className="text-[11px] text-[#8aa7b1]">
                  {matchedTopics.length + matchedLessons.length} matches
                </span>
              </div>

              {/* Matched Topics Section */}
              {matchedTopics.length > 0 && (
                <div>
                  <p className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#98b0ba]">
                    Curriculum Topics
                  </p>
                  <div className="space-y-1.5">
                    {matchedTopics.map((topic, idx) => {
                      const isSelected = selectedIndex === idx;
                      return (
                        <button
                          key={topic.title}
                          onClick={() =>
                            navigateTo(
                              `/dashboard/lessons/${encodeURIComponent(topic.title)}`
                            )
                          }
                          className={`w-full flex items-center justify-between rounded-xl border p-3 text-left transition ${
                            isSelected
                              ? "border-[#159ac1] bg-[#e8f8fc] shadow-sm"
                              : "border-[#e6f1f4] bg-white hover:border-[#bfe5ee] hover:bg-[#f4fbfd]"
                          }`}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white"
                              style={{ backgroundColor: topic.accent }}
                            >
                              <GraduationCap className="h-4 w-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-[#173c4b]">
                                  {topic.title}
                                </span>
                                <span className="rounded-md bg-[#e8f8fc] px-2 py-0.5 text-[10px] font-bold text-[#159ac1]">
                                  {topic.subject}
                                </span>
                              </div>
                              <p className="text-xs text-[#7897a2] truncate mt-0.5">
                                {topic.eyebrow} · 12 lessons
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-[#159ac1] shrink-0 pl-2">
                            <span>Go to topic</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Matched Lessons Section */}
              {matchedLessons.length > 0 && (
                <div>
                  <p className="px-2 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[#98b0ba]">
                    Matching Lessons
                  </p>
                  <div className="space-y-1">
                    {matchedLessons.map((lesson, idx) => {
                      const itemIdx = matchedTopics.length + idx;
                      const isSelected = selectedIndex === itemIdx;
                      return (
                        <button
                          key={`${lesson.topic}-${lesson.lessonNumber}`}
                          onClick={() =>
                            navigateTo(
                              `/dashboard/lessons/${encodeURIComponent(lesson.topic)}?lesson=${lesson.lessonNumber}`
                            )
                          }
                          className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                            isSelected
                              ? "bg-[#e8f8fc] text-[#159ac1]"
                              : "hover:bg-[#f4fbfd] text-[#315866]"
                          }`}
                        >
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-semibold truncate">
                              Lesson {lesson.lessonNumber}: {lesson.title}
                            </p>
                            <p className="text-[10px] text-[#8aa7b1] truncate">
                              in {lesson.topic} ({lesson.subject})
                            </p>
                          </div>
                          <span className="text-[10px] font-bold text-[#159ac1] shrink-0 pl-2">
                            Open lesson →
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Guidance to AI Tutor for custom exploration */}
              <div className="mt-2 border-t border-[#edf4f6] pt-2 px-1">
                <button
                  onClick={() => handleLearnWithAITutor()}
                  className="w-full flex items-center justify-between rounded-xl bg-[#f5fbfd] p-2.5 text-xs text-[#528391] hover:bg-[#eaf5f8] hover:text-[#159ac1] transition"
                >
                  <span className="flex items-center gap-1.5">
                    <Bot className="h-3.5 w-3.5 text-[#159ac1]" />
                    <span>Have questions beyond these lessons?</span>
                  </span>
                  <span className="font-bold text-[#159ac1] flex items-center gap-1">
                    Ask AI Tutor <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STATE 3: Query DOES NOT exist in curriculum */}
          {cleanQuery && !hasCurriculumMatch && (
            <div className="p-3">
              {/* Not in curriculum notification */}
              <div className="rounded-2xl border border-[#fbd8c6] bg-[#fff6f0] p-4 text-[#8a421b]">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#ffe6d8] text-[#e0753a]">
                    <Bot className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1 rounded-full bg-[#fde1d3] px-2.5 py-0.5 text-[11px] font-bold text-[#bd541b]">
                      Not in curriculum right now
                    </div>
                    <h4 className="mt-1 text-sm font-bold text-[#2b1f1a]">
                      “{query.trim()}” is not in the curriculum right now
                    </h4>
                    <p className="mt-1 text-xs text-[#735043] leading-relaxed">
                      Our predefined curriculum does not currently include this topic, but you can learn it directly with your personal Neura AI Tutor!
                    </p>
                  </div>
                </div>

                {/* Primary CTA button to guide them to AI Tutor */}
                <button
                  onClick={() => handleLearnWithAITutor()}
                  className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#159ac1] py-2.5 px-4 text-xs font-bold text-white shadow-sm transition hover:bg-[#1088aa] active:scale-[0.99]"
                >
                  <Bot className="h-4 w-4" />
                  <span>Ask AI Tutor about “{query.trim()}”</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </div>

              {/* Guided Starter Prompts */}
              <div className="mt-3 pt-2 border-t border-[#edf4f6]">
                <p className="text-[11px] font-bold text-[#8aa7b1] mb-2 flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-[#159ac1]" />
                  Or start with a guided question:
                </p>
                <div className="space-y-1.5">
                  {[
                    `Explain ${query.trim()} simply for a beginner`,
                    `What are the 3 core principles of ${query.trim()}?`,
                    `Give me a step-by-step breakdown of ${query.trim()}`,
                  ].map((promptText) => (
                    <button
                      key={promptText}
                      onClick={() => handleLearnWithAITutor(promptText)}
                      className="w-full flex items-center justify-between rounded-xl border border-[#e8f2f5] bg-white px-3 py-2 text-left text-xs font-medium text-[#385f6e] hover:border-[#bce3ec] hover:bg-[#f6fbfd] hover:text-[#159ac1] transition"
                    >
                      <span className="truncate pr-2">💬 “{promptText}”</span>
                      <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-[#8aa7b1]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
