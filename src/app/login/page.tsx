"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Tab = "login" | "signup";

export default function NeuraAuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("login");
  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showSignupPw, setShowSignupPw] = useState(false);
  const [dyslexiaOn, setDyslexiaOn] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const isSignup = tab === "signup";

  function handleReadAloud() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setNotice("Read aloud active: Take your time entering your credentials.");
      return;
    }

    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const text = isSignup
      ? "Create your Neura account. Provide your preferred name, email address, and a memorable password. There are no timers or penalties."
      : "Welcome to Neura. Enter your email and password to log in. Take all the time you need.";

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/onboarding");
  }

  function handleSignupSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push("/onboarding");
  }

  return (
    <div
      className={`min-h-screen bg-[#faf8ff] text-slate-800 font-sans flex flex-col justify-between antialiased selection:bg-sky-100 selection:text-sky-900 transition-colors duration-300 ${
        dyslexiaOn ? "dyslexia-mode" : ""
      }`}
    >
      {/* Top Utility Ribbon */}
      <header className="w-full max-w-6xl mx-auto px-6 pt-5 flex items-center justify-between text-xs text-slate-500">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-800 font-medium">
            <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Untimed, gentle space
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span className="hidden sm:inline text-slate-500">Take all the time you need</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setDyslexiaOn((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition text-xs font-medium focus:outline-none focus:ring-2 focus:ring-sky-600/30 ${
              dyslexiaOn
                ? "bg-sky-50 border-sky-400 text-sky-900"
                : "bg-white border-slate-200 hover:border-sky-300 text-slate-600 hover:text-sky-900"
            }`}
          >
            <span className="font-bold">Tt</span>
            <span>Dyslexia Font</span>
          </button>
          <a className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-800 transition text-xs font-medium" href="#">
            Back to Home
          </a>
        </div>
      </header>

      {/* Main Centered Experience */}
      <main className="w-full flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center gap-2.5 mb-2">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6 text-sky-100" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
                <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
              </svg>
            </div>
            <span className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-sans">Neura</span>
          </div>
          <p className="text-sm sm:text-base text-slate-600 font-sans max-w-sm mx-auto">
            Supportive learning designed for diverse minds.
          </p>
        </div>

        {/* Card */}
        <div className="w-full max-w-[480px] bg-white rounded-2xl border border-[#eaedff] shadow-calm p-6 sm:p-8 relative">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span className="text-xs font-medium text-slate-600">
                {isSignup ? "New explorer • Create your quiet account" : "Welcome back • Log in to your space"}
              </span>
            </div>
            <button
              onClick={handleReadAloud}
              type="button"
              title="Read form instructions aloud"
              aria-label="Read form instructions aloud"
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium transition focus:outline-none focus:ring-2 focus:ring-sky-600/30 ${
                speaking ? "bg-sky-100 border-sky-400" : "bg-slate-50 hover:bg-sky-50 border-slate-200 hover:border-sky-200 text-slate-600 hover:text-sky-800"
              }`}
            >
              <svg className="w-3.5 h-3.5 text-sky-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Read Aloud</span>
            </button>
          </div>

          {/* Tabs */}
          <div aria-label="Authentication Options" role="tablist" className="grid grid-cols-2 p-1.5 bg-[#f2f3ff] rounded-xl mb-6">
            <button
              role="tab"
              type="button"
              aria-selected={!isSignup}
              onClick={() => { setTab("login"); setNotice(null); }}
              className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                !isSignup ? "bg-white text-sky-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <svg className={`w-4 h-4 ${!isSignup ? "text-sky-600" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Log In</span>
            </button>
            <button
              role="tab"
              type="button"
              aria-selected={isSignup}
              onClick={() => { setTab("signup"); setNotice(null); }}
              className={`py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                isSignup ? "bg-white text-sky-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <svg className={`w-4 h-4 ${isSignup ? "text-sky-600" : "text-slate-400"}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Sign Up</span>
            </button>
          </div>

          {!isSignup ? (
            <form className="space-y-4" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="login-email">
                  Email address
                </label>
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  defaultValue="maya.learns@example.com"
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10 text-slate-900 placeholder-slate-400 text-sm font-sans transition"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-slate-700" htmlFor="login-password">
                    Password
                  </label>
                  <a className="text-xs font-medium text-sky-700 hover:text-sky-900 underline underline-offset-2" href="#">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    id="login-password"
                    name="password"
                    type={showLoginPw ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10 text-slate-900 placeholder-slate-400 text-sm font-sans transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showLoginPw ? "Hide password" : "Show password"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
                <p className="mt-1.5 text-xs text-slate-500 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Stored with zero clinical tracking &amp; FERPA privacy protection</span>
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-600/20"
                >
                  <span>Log In to Neura</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-4" onSubmit={handleSignupSubmit}>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="signup-name">
                  Preferred Name or Nickname
                </label>
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  required
                  placeholder="How you'd like us to greet you"
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10 text-slate-900 placeholder-slate-400 text-sm font-sans transition"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Aliases are 100% welcome. No formal legal names required.</span>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="signup-email">
                  Email address
                </label>
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10 text-slate-900 placeholder-slate-400 text-sm font-sans transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="signup-password">
                  Create a Password
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    name="password"
                    type={showSignupPw ? "text" : "password"}
                    minLength={8}
                    required
                    placeholder="At least 8 characters"
                    className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10 text-slate-900 placeholder-slate-400 text-sm font-sans transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPw((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
                    aria-label={showSignupPw ? "Hide password" : "Show password"}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="signup-confirm">
                  Confirm Password
                </label>
                <input
                  id="signup-confirm"
                  name="confirm_password"
                  type="password"
                  required
                  placeholder="Re-type your password"
                  className="w-full px-3.5 py-3 rounded-xl border border-slate-200 focus:border-sky-600 focus:ring-4 focus:ring-sky-600/10 text-slate-900 placeholder-slate-400 text-sm font-sans transition"
                />
                <div className="mt-2 p-2.5 bg-amber-50/70 border border-amber-200/60 rounded-lg flex items-start gap-2 text-xs text-amber-800">
                  <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Friendly tip: Passwords match best when kept simple to remember. No timed lockout if you make a typo.</span>
                </div>
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-medium text-sm flex items-center justify-center gap-2 shadow-sm transition transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-sky-600/20"
                >
                  <span>Create Free Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </form>
          )}

          {notice && (
            <div className="mt-4 p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-800 text-center font-medium">
              {notice}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-400">
            <svg className="w-3.5 h-3.5 text-sky-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Zero diagnostic prerequisites • Your learning rhythm is yours alone</span>
          </div>
        </div>

        {/* Below Card Alternate Action Switcher */}
        <div className="mt-5 text-center text-xs text-slate-600">
          {!isSignup ? (
            <div>
              <span>Don&apos;t have an account yet?</span>
              <button
                type="button"
                onClick={() => setTab("signup")}
                className="ml-1 font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-2 focus:outline-none"
              >
                Create a free account
              </button>
            </div>
          ) : (
            <div>
              <span>Already have an existing space?</span>
              <button
                type="button"
                onClick={() => setTab("login")}
                className="ml-1 font-semibold text-sky-700 hover:text-sky-900 underline underline-offset-2 focus:outline-none"
              >
                Log In to your space
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-[#eaedff] py-5 px-6 bg-white/50 backdrop-blur-sm text-xs text-slate-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">Neura</span>
            <span>•</span>
            <span>Compassionate AI learning platform</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-medium">
            <a className="hover:text-sky-700 transition" href="#">Accessibility Statement</a>
            <span className="text-slate-300">•</span>
            <a className="hover:text-sky-700 transition" href="#">Sensory Settings</a>
            <span className="text-slate-300">•</span>
            <a className="hover:text-sky-700 transition" href="#">Help Desk</a>
          </div>
          <div className="text-slate-400 text-[11px]">Adheres to WCAG 2.1 AAA</div>
        </div>
      </footer>
    </div>
  );
}
