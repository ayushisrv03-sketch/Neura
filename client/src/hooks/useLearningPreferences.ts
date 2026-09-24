import { useCallback, useEffect, useMemo, useState } from "react";

export const SUBJECTS_STORAGE_KEY = "neura_selected_subjects";
export const PREFERENCES_EVENT = "neura-subjects-updated";

export const FORMATS_STORAGE_KEY = "neura_selected_formats";
export const FORMATS_EVENT = "neura-formats-updated";

export const DYSLEXIA_FONT_STORAGE_KEY = "neura_dyslexia_font";
export const DYSLEXIA_FONT_EVENT = "neura-dyslexia-font-updated";

export const DEFAULT_SUBJECTS = ["Mathematics", "Science"] as const;
export const DEFAULT_FORMATS = ["Text", "Visual", "Examples", "Step-by-step"] as const;

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
 * Reads stored subjects safely from localStorage.
 */
export function getStoredSubjects(): string[] {
  if (typeof window === "undefined") {
    return [...DEFAULT_SUBJECTS];
  }
  try {
    const raw = localStorage.getItem(SUBJECTS_STORAGE_KEY);
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
 * Writes stored subjects to localStorage and emits an event for instant cross-component synchronization.
 */
export function setStoredSubjects(subjects: string[]): void {
  if (typeof window === "undefined") return;
  const valid = subjects
    .map(s => normalizeSubject(String(s)))
    .filter((s): s is StandardSubject => s === "Mathematics" || s === "Science");
  const finalSubjects = valid.length > 0 ? Array.from(new Set(valid)) : [...DEFAULT_SUBJECTS];
  try {
    localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(finalSubjects));
    window.dispatchEvent(new CustomEvent(PREFERENCES_EVENT, { detail: finalSubjects }));
  } catch (err) {
    console.warn("[Preferences] Could not persist subjects to localStorage:", err);
  }
}

/**
 * Reads stored formats safely from localStorage.
 */
export function getStoredFormats(): string[] {
  if (typeof window === "undefined") {
    return [...DEFAULT_FORMATS];
  }
  try {
    const raw = localStorage.getItem(FORMATS_STORAGE_KEY);
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
 * Writes stored formats to localStorage and emits an event for instant cross-component synchronization.
 */
export function setStoredFormats(formats: string[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(FORMATS_STORAGE_KEY, JSON.stringify(formats));
    window.dispatchEvent(new CustomEvent(FORMATS_EVENT, { detail: formats }));
  } catch (err) {
    console.warn("[Preferences] Could not persist formats to localStorage:", err);
  }
}

/**
 * Reads stored dyslexia font preference safely from localStorage.
 * Defaults to false (OFF) for new users.
 */
export function getStoredDyslexiaFont(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    const raw = localStorage.getItem(DYSLEXIA_FONT_STORAGE_KEY);
    return raw === "true";
  } catch {
    return false;
  }
}

/**
 * Writes dyslexia font preference to localStorage, immediately updates the root
 * document class for zero-delay CSS response, and emits an event for instant
 * cross-component and cross-tab synchronization.
 */
export function setStoredDyslexiaFont(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(DYSLEXIA_FONT_STORAGE_KEY, enabled ? "true" : "false");
    document.documentElement.classList.add("font-toggling");
    if (document.body) {
      document.body.classList.add("font-toggling");
    }
    if (enabled) {
      document.documentElement.classList.add("dyslexia-font");
      if (document.body) document.body.classList.add("dyslexia-font");
    } else {
      document.documentElement.classList.remove("dyslexia-font");
      if (document.body) document.body.classList.remove("dyslexia-font");
    }
    setTimeout(() => {
      document.documentElement.classList.remove("font-toggling");
      if (document.body) document.body.classList.remove("font-toggling");
    }, 320);
    window.dispatchEvent(new CustomEvent(DYSLEXIA_FONT_EVENT, { detail: enabled }));
  } catch (err) {
    console.warn("[Preferences] Could not persist dyslexia font preference to localStorage:", err);
  }
}

/**
 * Applies the stored dyslexia font preference to document.documentElement and document.body.
 */
export function applyStoredDyslexiaFont(): void {
  if (typeof window === "undefined") return;
  const enabled = getStoredDyslexiaFont();
  if (enabled) {
    document.documentElement.classList.add("dyslexia-font");
    if (document.body) document.body.classList.add("dyslexia-font");
  } else {
    document.documentElement.classList.remove("dyslexia-font");
    if (document.body) document.body.classList.remove("dyslexia-font");
  }
}

/**
 * Hook providing reactive access to the user's selected subjects, formats,
 * and dyslexia font preference throughout the application.
 */
export function useLearningPreferences() {
  const [selectedSubjects, setSubjectsState] = useState<string[]>(() => getStoredSubjects());
  const [selectedFormats, setFormatsState] = useState<string[]>(() => getStoredFormats());
  const [dyslexiaFont, setDyslexiaFontState] = useState<boolean>(() => getStoredDyslexiaFont());

  useEffect(() => {
    // Ensure document.documentElement and document.body have the proper font class on mount
    applyStoredDyslexiaFont();

    // Sync with other tabs/windows or components in the same tab
    const handleStorage = (e: StorageEvent) => {
      if (e.key === SUBJECTS_STORAGE_KEY) {
        setSubjectsState(getStoredSubjects());
      }
      if (e.key === FORMATS_STORAGE_KEY) {
        setFormatsState(getStoredFormats());
      }
      if (e.key === DYSLEXIA_FONT_STORAGE_KEY) {
        const val = getStoredDyslexiaFont();
        setDyslexiaFontState(val);
        if (val) {
          document.documentElement.classList.add("dyslexia-font");
          if (document.body) document.body.classList.add("dyslexia-font");
        } else {
          document.documentElement.classList.remove("dyslexia-font");
          if (document.body) document.body.classList.remove("dyslexia-font");
        }
      }
    };

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail) {
        setSubjectsState(customEvent.detail);
      } else {
        setSubjectsState(getStoredSubjects());
      }
    };

    const handleFormatsEvent = (e: Event) => {
      const customEvent = e as CustomEvent<string[]>;
      if (customEvent.detail) {
        setFormatsState(customEvent.detail);
      } else {
        setFormatsState(getStoredFormats());
      }
    };

    const handleDyslexiaEvent = (e: Event) => {
      const customEvent = e as CustomEvent<boolean>;
      const val = typeof customEvent.detail === "boolean" ? customEvent.detail : getStoredDyslexiaFont();
      setDyslexiaFontState(val);
      if (val) {
        document.documentElement.classList.add("dyslexia-font");
        if (document.body) document.body.classList.add("dyslexia-font");
      } else {
        document.documentElement.classList.remove("dyslexia-font");
        if (document.body) document.body.classList.remove("dyslexia-font");
      }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(PREFERENCES_EVENT, handleCustomEvent);
    window.addEventListener(FORMATS_EVENT, handleFormatsEvent);
    window.addEventListener(DYSLEXIA_FONT_EVENT, handleDyslexiaEvent);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(PREFERENCES_EVENT, handleCustomEvent);
      window.removeEventListener(FORMATS_EVENT, handleFormatsEvent);
      window.removeEventListener(DYSLEXIA_FONT_EVENT, handleDyslexiaEvent);
    };
  }, []);

  const updateDyslexiaFont = useCallback((next: boolean | ((prev: boolean) => boolean)) => {
    setDyslexiaFontState(current => {
      const resolved = typeof next === "function" ? next(current) : next;
      setStoredDyslexiaFont(resolved);
      return resolved;
    });
  }, []);

  const toggleDyslexiaFont = useCallback(() => {
    updateDyslexiaFont(prev => !prev);
  }, [updateDyslexiaFont]);

  const updateFormats = useCallback((next: string[]) => {
    setFormatsState(next);
    setStoredFormats(next);
  }, []);

  const updateSubjects = useCallback((next: string[]) => {
    setSubjectsState(next);
    setStoredSubjects(next);
  }, []);

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
      setStoredSubjects(updated);
      return updated;
    });
  }, []);

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
    dyslexiaFont,
    setDyslexiaFont: updateDyslexiaFont,
    toggleDyslexiaFont,
  };
}

/**
 * Dedicated hook providing access to the dyslexia-friendly font preference.
 */
export function useDyslexiaFont() {
  const { dyslexiaFont, setDyslexiaFont, toggleDyslexiaFont } = useLearningPreferences();
  return { dyslexiaFont, setDyslexiaFont, toggleDyslexiaFont };
}
