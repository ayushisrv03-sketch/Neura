import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";
import {
  DYSLEXIA_FONT_STORAGE_KEY,
  DYSLEXIA_FONT_EVENT,
  getStoredDyslexiaFont,
  setStoredDyslexiaFont,
  applyStoredDyslexiaFont,
} from "../client/src/hooks/useLearningPreferences";

describe("Dyslexia-Friendly Font Preference", () => {
  let mockStorage: Record<string, string> = {};
  let mockClassList: Set<string> = new Set();
  let dispatchedEvents: CustomEvent[] = [];

  beforeEach(() => {
    mockStorage = {};
    mockClassList = new Set();
    dispatchedEvents = [];

    // Setup mock browser window, localStorage, and documentElement
    const fakeLocalStorage = {
      getItem: vi.fn((key: string) => mockStorage[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        mockStorage[key] = String(value);
      }),
      removeItem: vi.fn((key: string) => {
        delete mockStorage[key];
      }),
      clear: vi.fn(() => {
        mockStorage = {};
      }),
    };

    const fakeDocumentElement = {
      classList: {
        add: vi.fn((cls: string) => {
          mockClassList.add(cls);
        }),
        remove: vi.fn((cls: string) => {
          mockClassList.delete(cls);
        }),
        contains: vi.fn((cls: string) => mockClassList.has(cls)),
      },
    };

    const fakeBody = {
      classList: {
        add: vi.fn((cls: string) => {
          mockClassList.add(`body:${cls}`);
        }),
        remove: vi.fn((cls: string) => {
          mockClassList.delete(`body:${cls}`);
        }),
        contains: vi.fn((cls: string) => mockClassList.has(`body:${cls}`)),
      },
    };

    const fakeWindow = {
      dispatchEvent: vi.fn((event: Event) => {
        dispatchedEvents.push(event as CustomEvent);
        return true;
      }),
    };

    vi.stubGlobal("localStorage", fakeLocalStorage);
    vi.stubGlobal("window", fakeWindow);
    vi.stubGlobal("document", { documentElement: fakeDocumentElement, body: fakeBody });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("defaults to OFF (false) for new users with no saved preference", () => {
    const isEnabled = getStoredDyslexiaFont();
    expect(isEnabled).toBe(false);
  });

  it("updates localStorage and applies dyslexia-font class when toggled ON", () => {
    setStoredDyslexiaFont(true);

    expect(mockStorage[DYSLEXIA_FONT_STORAGE_KEY]).toBe("true");
    expect(mockClassList.has("dyslexia-font")).toBe(true);
    expect(mockClassList.has("body:dyslexia-font")).toBe(true);
    expect(dispatchedEvents.some(e => e.type === DYSLEXIA_FONT_EVENT && e.detail === true)).toBe(true);
  });

  it("updates localStorage and removes dyslexia-font class when toggled OFF", () => {
    // First enable
    setStoredDyslexiaFont(true);
    expect(mockClassList.has("dyslexia-font")).toBe(true);
    expect(mockClassList.has("body:dyslexia-font")).toBe(true);

    // Then toggle OFF
    setStoredDyslexiaFont(false);
    expect(mockStorage[DYSLEXIA_FONT_STORAGE_KEY]).toBe("false");
    expect(mockClassList.has("dyslexia-font")).toBe(false);
    expect(mockClassList.has("body:dyslexia-font")).toBe(false);
    expect(dispatchedEvents.some(e => e.type === DYSLEXIA_FONT_EVENT && e.detail === false)).toBe(true);
  });

  it("preserves enabled state on reload (read from localStorage)", () => {
    mockStorage[DYSLEXIA_FONT_STORAGE_KEY] = "true";

    expect(getStoredDyslexiaFont()).toBe(true);

    applyStoredDyslexiaFont();
    expect(mockClassList.has("dyslexia-font")).toBe(true);
    expect(mockClassList.has("body:dyslexia-font")).toBe(true);
  });

  it("preserves disabled state on reload (read from localStorage)", () => {
    mockStorage[DYSLEXIA_FONT_STORAGE_KEY] = "false";

    expect(getStoredDyslexiaFont()).toBe(false);

    applyStoredDyslexiaFont();
    expect(mockClassList.has("dyslexia-font")).toBe(false);
    expect(mockClassList.has("body:dyslexia-font")).toBe(false);
  });
});
