import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import {
  ArrowLeft,
  Bot,
  Compass,
  CornerDownLeft,
  HelpCircle,
  Lightbulb,
  Loader2,
  MessageSquare,
  Pause,
  RotateCcw,
  Send,
  Sparkles,
  User,
  Volume2,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Streamdown } from "streamdown";
import { useLocation, useRoute } from "wouter";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
};

const SUGGESTED_PROMPTS = [
  { label: "Explain simply", prompt: "Explain the core idea simply as if I am a beginner." },
  { label: "Real-world example", prompt: "Give me an interesting real-world example of how this is used." },
  { label: "3 Key principles", prompt: "What are the 3 most important principles or rules I should know?" },
  { label: "Step-by-step breakdown", prompt: "Break down how this works step by step." },
  { label: "Why does it matter?", prompt: "Why is this topic important, and what problem does it solve?" },
  { label: "Check my understanding", prompt: "Ask me a gentle question to check if I understood the basics." },
];

export default function AITutorPage() {
  const [, params] = useRoute("/dashboard/tutor/:topic");
  const [, setLocation] = useLocation();

  // Extract topic from route param or fallback to search query ?topic=...
  const rawTopic = useMemo(() => {
    if (params?.topic) {
      return decodeURIComponent(params.topic).trim();
    }
    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      const q = search.get("topic");
      if (q) return decodeURIComponent(q).trim();
    }
    return "Exploring Ideas";
  }, [params]);

  const topic = rawTopic || "Your Chosen Topic";

  const getInitialGreeting = (topicName: string): ChatMessage => ({
    id: "initial-greeting",
    role: "assistant",
    content: `Hello! I'm your **Neura AI Tutor**.\n\nI'm ready to explore **${topicName}** with you! There are no timers, no scores, and no rush here. What would you like to know or understand first?`,
    timestamp: "Just now",
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    getInitialGreeting(topic),
  ]);
  const [inputValue, setInputValue] = useState("");
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialPromptHandled = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // tRPC mutation for communicating with the AI Tutor
  const tutorMutation = trpc.ai.tutorChat.useMutation({
    onSuccess: (res) => {
      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    },
    onError: (err) => {
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content: `I ran into a small hiccup connecting to the educational engine. ${
          err.message || "Please try sending your question again in a moment."
        }`,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  // Handle incoming initial prompt from URL search param (?prompt=...)
  useEffect(() => {
    if (initialPromptHandled.current) return;
    if (typeof window !== "undefined") {
      const search = new URLSearchParams(window.location.search);
      const promptParam = search.get("prompt");
      if (promptParam && promptParam.trim()) {
        initialPromptHandled.current = true;
        const text = decodeURIComponent(promptParam).trim();
        handleSendMessage(text);
      }
    }
  }, [topic]);

  // Audio Speech Synthesis for calm read-aloud
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown asterisks/hashes for natural speech
    const cleanText = text.replace(/[#*`_]/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.92;
    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);
    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend !== undefined ? textToSend : inputValue).trim();
    if (!text || tutorMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const nextConversation = [...messages, userMessage];
    setMessages(nextConversation);
    setInputValue("");

    tutorMutation.mutate({
      topic,
      lessonTitle: `Exploring ${topic}`,
      lessonContent: `Open inquiry learning session on "${topic}". The learner is exploring this topic with their Neura AI Tutor. Provide encouraging, supportive, step-by-step explanations with analogies.`,
      currentMode: "open-tutor",
      conversation: nextConversation
        .filter((m) => m.id !== "initial-greeting")
        .map((m) => ({ role: m.role, content: m.content })),
      message: text,
    });

    setTimeout(() => {
      inputRef.current?.focus();
    }, 10);
  };

  const handleResetChat = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
    setMessages([getInitialGreeting(topic)]);
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <DashboardLayout allowGuest>
      <div className="min-h-screen bg-[#f6fbfd] text-[#214554] flex flex-col">
        {/* Top Header Ribbon */}
        <header className="sticky top-0 z-30 border-b border-[#e5f0f3] bg-[#f6fbfd]/90 backdrop-blur-xl">
          <div className="mx-auto flex h-[72px] max-w-[1100px] items-center justify-between gap-3 px-4 sm:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setLocation("/dashboard")}
                className="flex items-center gap-2 rounded-xl border border-[#e1eff2] bg-white px-3 py-1.5 text-xs font-bold text-[#159ac1] shadow-2xs transition hover:border-[#bde3eb] hover:bg-[#f0fafc]"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Dashboard</span>
              </button>
              <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#e8f8fc] px-3 py-1 text-xs font-bold text-[#159ac1]">
                <Bot className="h-3.5 w-3.5" />
                <span>AI Tutor Session</span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Learning Chat Workspace */}
        <main className="mx-auto flex-1 w-full max-w-[1100px] px-4 py-6 sm:px-8 sm:py-8 flex flex-col">
          {/* Topic Hero Card */}
          <div className="mb-6 rounded-2xl border border-[#bde9f3] bg-gradient-to-r from-[#eaf8fc] via-[#f3fbfe] to-[#e6f6fa] p-5 sm:p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#159ac1] text-white shadow-sm">
                  <Bot className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#159ac1] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Direct AI Tutor
                    </span>
                    <span className="rounded-full bg-white/80 border border-[#bde9f3] px-2.5 py-0.5 text-[10px] font-semibold text-[#3b7585]">
                      Untimed • Safe Space to Ask
                    </span>
                  </div>
                  <h1 className="mt-1 text-xl sm:text-2xl font-bold tracking-tight text-[#173c4b]">
                    Exploring “{topic}”
                  </h1>
                  <p className="mt-1 text-xs sm:text-sm text-[#5a808e] leading-relaxed max-w-2xl">
                    Ask any question, explore key definitions, or request real-world examples. Your Neura AI Tutor breaks down concepts step-by-step so you can learn at your own pace.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="flex items-center gap-1.5 rounded-xl border border-[#cbe6ed] bg-white px-3 py-2 text-xs font-semibold text-[#547e8c] shadow-2xs transition hover:bg-[#edf7fa] hover:text-[#159ac1]"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Start Fresh</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Suggestion Chips */}
          <div className="mb-4">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#71939f] mb-2 px-1">
              <Lightbulb className="h-3.5 w-3.5 text-[#159ac1]" />
              <span>Quick starter questions:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_PROMPTS.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  disabled={tutorMutation.isPending}
                  onClick={() => handleSendMessage(item.prompt)}
                  className="rounded-full border border-[#dcecf0] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#325866] shadow-2xs transition hover:border-[#9edbeb] hover:bg-[#f0fafc] hover:text-[#159ac1] active:scale-95 disabled:opacity-50"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 min-h-[380px] rounded-2xl border border-[#dfeff2] bg-white p-4 sm:p-6 shadow-[0_4px_24px_rgba(27,91,109,0.03)] flex flex-col justify-between">
            <div className="space-y-4 overflow-y-auto pr-1">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#e8f8fc] text-[#159ac1] mt-0.5 border border-[#d2eff6]">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-[#159ac1] text-white rounded-tr-xs shadow-xs"
                        : "bg-[#f8fcfd] text-[#214554] border border-[#e1eff2] shadow-2xs rounded-tl-xs"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-1.5 text-[11px] opacity-80 border-b border-black/5 pb-1">
                      <span className="font-bold">
                        {msg.role === "user" ? "You" : "Neura AI Tutor"}
                      </span>
                      <div className="flex items-center gap-2">
                        {msg.role === "assistant" && (
                          <button
                            type="button"
                            onClick={() => handleToggleSpeak(msg.id, msg.content)}
                            title={
                              speakingMessageId === msg.id
                                ? "Pause read-aloud"
                                : "Listen to this explanation"
                            }
                            className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium transition ${
                              speakingMessageId === msg.id
                                ? "bg-amber-100 text-amber-900"
                                : "hover:bg-black/5 text-[#5e8491]"
                            }`}
                          >
                            {speakingMessageId === msg.id ? (
                              <>
                                <Pause className="h-3 w-3" />
                                <span>Pause</span>
                              </>
                            ) : (
                              <>
                                <Volume2 className="h-3 w-3" />
                                <span>Listen</span>
                              </>
                            )}
                          </button>
                        )}
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>

                    {msg.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none text-[#214554] [&>p]:mb-2.5 [&>p:last-child]:mb-0 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>h3]:text-base [&>h3]:font-bold [&>h3]:mt-2 [&>h3]:mb-1 [&>code]:bg-[#edf5f7] [&>code]:px-1.5 [&>code]:py-0.5 [&>code]:rounded">
                        <Streamdown>{msg.content}</Streamdown>
                      </div>
                    ) : (
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>

                  {msg.role === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#edf5f7] text-[#5a7f8c] mt-0.5">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                </div>
              ))}

              {tutorMutation.isPending && (
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#e8f8fc] text-[#159ac1] mt-0.5 border border-[#d2eff6]">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl rounded-tl-xs border border-[#e1eff2] bg-[#f8fcfd] px-4 py-3 text-sm text-[#5d8391] shadow-2xs flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-[#159ac1]" />
                    <span>Neura AI Tutor is preparing an encouraging explanation...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="mt-4 pt-3 border-t border-[#edf4f6] flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Ask anything about ${topic}... (e.g. "Explain the basics", "Give an analogy")`}
                disabled={tutorMutation.isPending}
                className="flex-1 h-12 rounded-xl border border-[#d9ebef] bg-white px-4 text-sm text-[#214554] placeholder-[#8ea8b2] outline-none transition focus:border-[#159ac1] focus:ring-4 focus:ring-[#dff5fa] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || tutorMutation.isPending}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#159ac1] text-white shadow-xs transition hover:bg-[#0e7795] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send question to AI Tutor"
              >
                {tutorMutation.isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </form>
          </div>
        </main>
      </div>
    </DashboardLayout>
  );
}
