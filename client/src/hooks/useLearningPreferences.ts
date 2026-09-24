import { useCallback, useEffect, useMemo, useState } from "react";
import { getCurrentUserKey } from "../lib/topicCurriculum";

export const SUBJECTS_STORAGE_KEY = "neura_selected_subjects";
export const PREFERENCES_EVENT = "neura-subjects-updated";

export const FORMATS_STORAGE_KEY = "neura_selected_formats";
export const FORMATS_EVENT = "neura-formats-updated";

export const DEFAULT_SUBJECTS = ["Mathematics", "Science"] as const;
export const DEFAULT_FORMATS = ["Text", "Visual"] as const;

export type StandardSubject = "Mathematics" | "Science";

/**
 * Normalizes subject names to a standard representation ("Mathematics" | "Science").
 * Handles common variants such as "Maths", "math", "Math", "Science", etc.
 */
export function normalizeSubject(subject: string): StandardSubject | string {
  if (!subject) return "";
  const cleaned = subject.trim().toLowerCase();
  if (cleaned === "maths" || cleaned === "mathematics" || cleaned === "math") {
    return "Mathematics";
  }
  if (cleaned === "science") {
    return "Science";
  }
  return subject;
}

/**
 * Checks if a given course/topic subject matches any of the active subjects.
 */
export function isSubjectSelected(subject: string, activeSubjects: string[]): boolean {
  if (!subject || !activeSubjects || !activeSubjects.length) return true;
  const normalized = normalizeSubject(subject);
  return activeSubjects.some(active => normalizeSubject(active) === normalized);
}

/**
 * Reads stored subjects safely from localStorage scoped to user.
 */
export function getStoredSubjects(userId?: string | number | null): string[] {
  if (typeof window === "undefined") {
    return [...DEFAULT_SUBJECTS];
  }
  const userKey = getCurrentUserKey(userId);
  try {
    const scopedKey = userKey === "guest" ? `${SUBJECTS_STORAGE_KEY}_guest` : `${SUBJECTS_STORAGE_KEY}_${userKey}`;
    const raw = localStorage.getItem(scopedKey);
    // If not set for this user, return fresh defaults without falling back to previous users' legacy memory
    if (!raw) return [...DEFAULT_SUBJECTS];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Clean and normalize
      const valid = parsed
        .map(s => normalizeSubject(String(s)))
        .filter((s): s is StandardSubject => s === "Mathematics" || s === "Science");
      return valid.length > 0 ? Array.from(new Set(valid)) : [...DEFAULT_SUBJECTS];
    }
  } catch {
    // Ignore JSON errors and fallback
  }
  return [...DEFAULT_SUBJECTS];
}

/**
 * Writes stored subjects to localStorage scoped to user and emits an event for instant cross-component synchronization.
 */
export function setStoredSubjects(subjects: string[], userId?: string | number | null): void {
  if (typeof window === "undefined") return;
  const userKey = getCurrentUserKey(userId);
  const scopedKey = userKey === "guest" ? `${SUBJECTS_STORAGE_KEY}_guest` : `${SUBJECTS_STORAGE_KEY}_${userKey}`;
  const valid = subjects
    .map(s => normalizeSubject(String(s)))
    .filter((s): s is StandardSubject => s === "Mathematics" || s === "Science");
  const finalSubjects = valid.length > 0 ? Array.from(new Set(valid)) : [...DEFAULT_SUBJECTS];
  try {
    localStorage.setItem(scopedKey, JSON.stringify(finalSubjects));
    localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(finalSubjects));
    window.dispatchEvent(new CustomEvent(PREFERENCES_EVENT, { detail: { subjects: finalSubjects, userKey } }));
  } catch (err) {
    console.warn("[Preferences] Could not persist subjects to localStorage:", err);
  }
}

/**
 * Reads stored formats safely from localStorage scoped to user.
 */
export function getStoredFormats(userId?: string | number | null): string[] {
  if (typeof window === "undefined") {
    return [...DEFAULT_FORMATS];
  }
  const userKey = getCurrentUserKey(userId);
  try {
    const scopedKey = userKey === "guest" ? `${FORMATS_STORAGE_KEY}_guest` : `${FORMATS_STORAGE_KEY}_${userKey}`;
    const raw = localStorage.getItem(scopedKey);
    // If not set for this user, return fresh defaults without falling back to previous users' legacy memory
    if (!raw) return [...DEFAULT_FORMATS];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map(String);
    }
  } catch {
    // Ignore JSON errors and fallback
  }
  return [...DEFAULT_FORMATS];
}

/**
 * Writes stored formats to localStorage scoped to user and emits an event for instant cross-component synchronization.
 */
export function setStoredFormats(formats: string[], userId?: string | number | null): void {
  if (typeof window === "undefined") return;
  const userKey = getCurrentUserKey(userId);
  const scopedKey = userKey === "guest" ? `${FORMATS_STORAGE_KEY}_guest` : `${FORMATS_STORAGE_KEY}_${userKey}`;
  try {
    localStorage.setItem(scopedKey, JSON.stringify(formats));
    localStorage.setItem(FORMATS_STORAGE_KEY, JSON.stringify(formats));
    window.dispatchEvent(new CustomEvent(FORMATS_EVENT, { detail: { formats, userKey } }));
  } catch (err) {
    console.warn("[Preferences] Could not persist formats to localStorage:", err);
  }
}

/**
 * Clears stored learning preferences to prevent memory leakage between users.
 */
export function clearUserLearningPreferences(userId?: string | number | null): void {
  if (typeof window === "undefined") return;
  try {
    const userKey = getCurrentUserKey(userId);
    if (userKey && userKey !== "guest") {
      localStorage.removeItem(`${FORMATS_STORAGE_KEY}_${userKey}`);
      localStorage.removeItem(`${SUBJECTS_STORAGE_KEY}_${userKey}`);
    }
    localStorage.removeItem(FORMATS_STORAGE_KEY);
    localStorage.removeItem(SUBJECTS_STORAGE_KEY);
    localStorage.removeItem(`${FORMATS_STORAGE_KEY}_guest`);
    localStorage.removeItem(`${SUBJECTS_STORAGE_KEY}_guest`);
    window.dispatchEvent(new CustomEvent(FORMATS_EVENT, { detail: { formats: [...DEFAULT_FORMATS], userKey } }));
    window.dispatchEvent(new CustomEvent(PREFERENCES_EVENT, { detail: { subjects: [...DEFAULT_SUBJECTS], userKey } }));
  } catch (err) {
    console.warn("[Preferences] Could not clear learning preferences:", err);
  }
}

/**
 * Hook providing reactive access to the user's selected subjects and formats throughout the application.
 */
export function useLearningPreferences(explicitUserId?: string | number | null) {
  const [selectedSubjects, setSubjectsState] = useState<string[]>(() => getStoredSubjects(explicitUserId));
  const [selectedFormats, setFormatsState] = useState<string[]>(() => getStoredFormats(explicitUserId));

  // Re-sync when userId changes
  useEffect(() => {
    setSubjectsState(getStoredSubjects(explicitUserId));
    setFormatsState(getStoredFormats(explicitUserId));
  }, [explicitUserId]);

  useEffect(() => {
    // Sync with other tabs/windows or components in the same tab
    const handleStorage = (e: StorageEvent) => {
      const currentUserKey = getCurrentUserKey(explicitUserId);
      const subjectsKey = currentUserKey === "guest" ? `${SUBJECTS_STORAGE_KEY}_guest` : `${SUBJECTS_STORAGE_KEY}_${currentUserKey}`;
      const formatsKey = currentUserKey === "guest" ? `${FORMATS_STORAGE_KEY}_guest` : `${FORMATS_STORAGE_KEY}_${currentUserKey}`;

      if (e.key === "manus-runtime-user-info" || e.key === subjectsKey || e.key === SUBJECTS_STORAGE_KEY) {
        setSubjectsState(getStoredSubjects(explicitUserId));
      }
      if (e.key === "manus-runtime-user-info" || e.key === formatsKey || e.key === FORMATS_STORAGE_KEY) {
        setFormatsState(getStoredFormats(explicitUserId));
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ subjects?: string[]; userKey?: string } | string[]>;
      const currentUserKey = getCurrentUserKey(explicitUserId);
      if (customEvent.detail) {
        if (Array.isArray(customEvent.detail)) {
          setSubjectsState(customEvent.detail);
        } else if (customEvent.detail.subjects) {
          if (!customEvent.detail.userKey || customEvent.detail.userKey === currentUserKey) {
            setSubjectsState(customEvent.detail.subjects);
          }
        }
      } else {
        setSubjectsState(getStoredSubjects(explicitUserId));
      }
    };

    const handleFormatsEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ formats?: string[]; userKey?: string } | string[]>;
      const currentUserKey = getCurrentUserKey(explicitUserId);
      if (customEvent.detail) {
        if (Array.isArray(customEvent.detail)) {
          setFormatsState(customEvent.detail);
        } else if (customEvent.detail.formats) {
          if (!customEvent.detail.userKey || customEvent.detail.userKey === currentUserKey) {
            setFormatsState(customEvent.detail.formats);
          }
        }
      } else {
        setFormatsState(getStoredFormats(explicitUserId));
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(PREFERENCES_EVENT, handleCustomEvent);
    window.addEventListener(FORMATS_EVENT, handleFormatsEvent);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(PREFERENCES_EVENT, handleCustomEvent);
      window.removeEventListener(FORMATS_EVENT, handleFormatsEvent);
    };
  }, [explicitUserId]);

  const updateFormats = useCallback((next: string[]) => {
    setFormatsState(next);
    setStoredFormats(next, explicitUserId);
  }, [explicitUserId]);

  const updateSubjects = useCallback((next: string[]) => {
    setSubjectsState(next);
    setStoredSubjects(next, explicitUserId);
  }, [explicitUserId]);

  const toggleSubject = useCallback((subject: string) => {
    const norm = normalizeSubject(subject);
    setSubjectsState(current => {
      const exists = current.some(s => normalizeSubject(s) === norm);
      let updated: string[];
      if (exists) {
        // Prevent removing the last subject
        if (current.length <= 1) {
          return current;
        }
        updated = current.filter(s => normalizeSubject(s) !== norm);
      } else {
        updated = [...current, norm];
      }
      setStoredSubjects(updated, explicitUserId);
      return updated;
    });
  }, [explicitUserId]);

  const hasMath = useMemo(
    () => selectedSubjects.some(s => normalizeSubject(s) === "Mathematics"),
    [selectedSubjects]
  );

  const hasScience = useMemo(
    () => selectedSubjects.some(s => normalizeSubject(s) === "Science"),
    [selectedSubjects]
  );

  const hasBoth = hasMath && hasScience;

  const subjectSummary = useMemo(() => {
    if (hasBoth) return "Mathematics & Science";
    if (hasMath) return "Mathematics";
    if (hasScience) return "Science";
    return "All topics";
  }, [hasBoth, hasMath, hasScience]);

  const checkSelected = useCallback(
    (subject: string) => isSubjectSelected(subject, selectedSubjects),
    [selectedSubjects]
  );

  return {
    selectedSubjects,
    setSelectedSubjects: updateSubjects,
    toggleSubject,
    isSubjectSelected: checkSelected,
    hasMath,
    hasScience,
    hasBoth,
    subjectSummary,
    selectedFormats,
    setSelectedFormats: updateFormats,
    isFormatSelected: (format: string) =>
      selectedFormats.some((f) => f.toLowerCase() === format.toLowerCase()),
  };
}
