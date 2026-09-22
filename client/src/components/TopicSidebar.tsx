import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { getTopicCompletedLessons, getTopicCurriculum, isLessonUnlocked } from "@/lib/topicCurriculum";
import { ArrowLeft, CheckCircle2, Lock, PanelLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface TopicSidebarProps {
  topicName: string;
}

export function TopicSidebar({ topicName }: TopicSidebarProps) {
  const [, setLocation] = useLocation();
  const { state, setOpenMobile, toggleSidebar } = useSidebar();
  const isCollapsed = state === "collapsed";

  const curriculum = getTopicCurriculum(topicName);
  const totalLessons = curriculum.lessons.length;

  const [completedIndices, setCompletedIndices] = useState<number[]>(() =>
    getTopicCompletedLessons(topicName)
  );

  // Read current active lesson from URL search query (e.g., ?lesson=1 => index 0)
  const [currentLessonIdx, setCurrentLessonIdx] = useState<number>(() => {
    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      const lessonParam = search.get("lesson");
      if (lessonParam) {
        const parsed = parseInt(lessonParam, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= totalLessons) {
          return parsed - 1;
        }
      }
    }
    return 0;
  });

  // Listen to window location search changes and completion custom events
  useEffect(() => {
    const handleLocationChange = () => {
      const search = new URLSearchParams(window.location.search);
      const lessonParam = search.get("lesson");
      if (lessonParam) {
        const parsed = parseInt(lessonParam, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= totalLessons) {
          setCurrentLessonIdx(parsed - 1);
        }
      } else {
        setCurrentLessonIdx(0);
      }
    };

    const handleLessonCompleted = (e: Event) => {
      const customEvent = e as CustomEvent<{ topic: string; completed: number[] }>;
      if (customEvent.detail && customEvent.detail.topic === topicName) {
        setCompletedIndices(customEvent.detail.completed);
      }
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("neura-lesson-completed", handleLessonCompleted);

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("neura-lesson-completed", handleLessonCompleted);
    };
  }, [topicName, totalLessons]);

  // Keep state synced when topic changes
  useEffect(() => {
    setCompletedIndices(getTopicCompletedLessons(topicName));
  }, [topicName]);

  const selectLesson = (index: number) => {
    if (!isLessonUnlocked(index, completedIndices)) return;
    setCurrentLessonIdx(index);
    setLocation(`/dashboard/lessons/${encodeURIComponent(topicName)}?lesson=${index + 1}`);
    window.dispatchEvent(new Event("popstate"));
    setOpenMobile(false);
  };

  const handleBackToDashboard = () => {
    setLocation("/dashboard");
    setOpenMobile(false);
  };

  return (
    <>
      <SidebarHeader className="border-b border-[#e6f0f3] p-4">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={handleBackToDashboard}
            className="flex items-center gap-2 text-xs font-bold text-[#159ac1] transition hover:text-[#0e7795] group-data-[collapsible=icon]:justify-center"
            title="Back to dashboard"
          >
            <ArrowLeft className="h-4 w-4 shrink-0" />
            <span className="group-data-[collapsible=icon]:hidden">Back to dashboard</span>
          </button>
          <button
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e3f7fb] text-[#159ac1] transition hover:bg-[#d4f1f8]"
          >
            <PanelLeft className="h-4 w-4" />
          </button>
        </div>

        {!isCollapsed && (
          <div className="mt-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#173c4b]">
              {topicName}
            </h2>
            <p className="mt-0.5 text-[11px] font-semibold text-[#8aa7b1]">
              {totalLessons} Lessons
            </p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        {!isCollapsed && (
          <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.16em] text-[#a2bac3]">
            Lessons Overview
          </p>
        )}

        <SidebarMenu className="space-y-1">
          {curriculum.lessons.map((lesson, idx) => {
            const unlocked = isLessonUnlocked(idx, completedIndices);
            const isCompleted = completedIndices.includes(idx);
            const isActive = currentLessonIdx === idx;

            return (
              <SidebarMenuItem key={lesson.id}>
                <SidebarMenuButton
                  isActive={isActive}
                  disabled={!unlocked}
                  onClick={() => selectLesson(idx)}
                  tooltip={`${lesson.title}${!unlocked ? " (Locked)" : isCompleted ? " (Completed)" : ""}`}
                  className={`group relative flex h-10 w-full items-center justify-between rounded-xl px-3 text-xs font-medium transition ${
                    isActive
                      ? "bg-[#e5f8fc] font-bold text-[#128eaf] shadow-sm"
                      : isCompleted
                      ? "bg-[#f2faf6] text-[#277f59] hover:bg-[#e6f6ee]"
                      : unlocked
                      ? "text-[#5e7d87] hover:bg-[#f0fafc] hover:text-[#173c4b]"
                      : "cursor-not-allowed text-[#b2c8cf] opacity-50 hover:bg-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    {/* Status Icon or Index Badge */}
                    {isCompleted ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#277f59]" />
                    ) : !unlocked ? (
                      <Lock className="h-3.5 w-3.5 shrink-0 text-[#9bb3bc]" />
                    ) : (
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                          isActive
                            ? "bg-[#159ac1] text-white"
                            : "bg-[#e6f3f7] text-[#159ac1]"
                        }`}
                      >
                        {idx + 1}
                      </span>
                    )}

                    <span className="truncate group-data-[collapsible=icon]:hidden">
                      {lesson.title}
                    </span>
                  </div>

                  {/* Right side checkmark indicator for completed lessons */}
                  {isCompleted && !isCollapsed && (
                    <span className="text-[10px] font-bold text-[#277f59] group-data-[collapsible=icon]:hidden">
                      ✓
                    </span>
                  )}
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
