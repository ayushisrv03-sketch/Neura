export interface TutorSystemPromptInput {
  topic: string;
  lessonTitle: string;
  lessonContent: string;
  currentMode?: string;
  currentQuestion?: {
    question: string;
    options?: string[];
  };
}

export const DEFAULT_TUTOR_SYSTEM_PROMPT = `You are the Neura AI Tutor, a friendly, encouraging, and highly effective educational assistant.
Your goal is to help the student understand the lesson they are studying.

PEDAGOGICAL GUIDELINES:
1. Teach rather than simply providing direct answers. Help the student think and learn.
2. Explain concepts clearly using simple, age-appropriate language matching the lesson level.
3. Break down complex or difficult concepts into small, manageable steps.
4. Provide clear examples or analogies when helpful.
5. Ask guiding questions to lead the student to understanding when they are stuck.
6. Stay focused on educational topics. Keep answers conversational, supportive, and concise.`;

/**
 * Builds a dynamic, contextual system prompt for the Neura AI Tutor
 * tailored to the current topic, lesson, learning mode, and active quiz question.
 */
export function buildTutorSystemPrompt(input: TutorSystemPromptInput): string {
  const parts: string[] = [
    `You are the Neura AI Tutor, a friendly, encouraging, and highly effective educational assistant.`,
    `Your goal is to help the student understand the lesson they are currently studying.`,
    `CURRENT LESSON CONTEXT:`,
    `- Topic: ${input.topic}`,
    `- Lesson Title: ${input.lessonTitle}`,
    `- Lesson Content:\n${input.lessonContent}`,
    input.currentMode ? `- Current Learning Mode: ${input.currentMode}` : "",
    input.currentQuestion
      ? `- Active Quiz Question: "${input.currentQuestion.question}"${
          input.currentQuestion.options && input.currentQuestion.options.length > 0
            ? ` (Options: ${input.currentQuestion.options.join(", ")})`
            : ""
        }`
      : "",
    `PEDAGOGICAL GUIDELINES:`,
    `1. Teach rather than simply providing direct answers. Help the student think and learn.`,
    `2. Explain concepts clearly using simple, age-appropriate language matching the lesson level.`,
    `3. Break down complex or difficult concepts into small, manageable steps.`,
    `4. Provide clear examples or analogies when helpful.`,
    `5. Ask guiding questions to lead the student to understanding when they are stuck.`,
    `6. Stay focused on the current lesson. Use the supplied lesson content as your primary source of truth. Do not contradict it.`,
    `7. QUIZ HANDLING: If the student asks for the answer to a quiz question or seems stuck on it:`,
    `   - NEVER give away the correct answer or choice directly.`,
    `   - Identify the core concept being tested.`,
    `   - Give a gentle hint and explain the relevant principle.`,
    `   - Encourage the student to try answering based on the hint.`,
    `8. Keep answers conversational, supportive, and concise (avoid overwhelming walls of text).`,
  ];

  return parts.filter(Boolean).join("\n\n");
}

/**
 * Generates a helpful, structured educational reply when the live LLM is offline or no API key is provided.
 * Ensures the student can always communicate and learn without seeing a raw server error.
 */
export function generateFallbackTutorReply(input: {
  topic: string;
  lessonTitle: string;
  message: string;
}): string {
  const query = input.message.toLowerCase();
  const topic = input.topic;

  if (query.includes("simply") || query.includes("beginner") || query.includes("simple")) {
    return `### Understanding ${topic} Simply\n\nAt its core, **${topic}** is all about understanding how key ideas connect and work together.\n\nHere is a gentle way to think about it:\n1. **The Core Concept**: Think of **${topic}** as a system where every part has a clear purpose.\n2. **Why It Matters**: It helps us understand, predict, and solve real-world questions that would otherwise be complicated.\n3. **Quick Analogy**: Imagine building with interlocking blocks — once you see how the foundational pieces fit together, the entire structure makes sense.\n\nWhat specific part of **${topic}** would you like us to look into next?`;
  }

  if (query.includes("principle") || query.includes("rule") || query.includes("core")) {
    return `### 3 Core Principles of ${topic}\n\n1. **Foundations First**: In **${topic}**, every advanced concept builds directly upon simple, foundational definitions.\n2. **Cause & Effect**: Changing an input or condition leads to predictable, observable changes across the system.\n3. **Practical Application**: Concepts in **${topic}** aren't just abstract theory — they provide frameworks used to solve real-world challenges.\n\nWhich of these three principles would you like to explore deeper?`;
  }

  if (query.includes("example") || query.includes("real-world") || query.includes("real world")) {
    return `### Real-World Example of ${topic}\n\nA great way to picture **${topic}** in everyday life is through real-world systems:\n\n* **Everyday Observation**: Notice how patterns, balances, and systems around us rely on the exact principles of **${topic}**.\n* **Practical Impact**: Engineers, scientists, and researchers apply **${topic}** daily to build better tools, understand environments, and make informed choices.\n\nWould you like an example from nature, modern technology, or everyday human activities?`;
  }

  if (query.includes("step") || query.includes("breakdown") || query.includes("break down")) {
    return `### Step-by-Step Breakdown of ${topic}\n\nHere is how we deconstruct **${topic}** into bite-sized steps:\n\n* **Step 1 — Understand the Goal**: Identify what question or problem **${topic}** is addressing.\n* **Step 2 — Identify the Components**: Break the topic into its individual elements or variables.\n* **Step 3 — Observe the Interactions**: See how the pieces communicate, calculate, or react with one another.\n* **Step 4 — Verify & Reflect**: Connect what you observed back to the big picture.\n\nWhich step shall we dive into together?`;
  }

  if (query.includes("check") || query.includes("quiz") || query.includes("test")) {
    return `### Quick Understanding Check on ${topic}\n\nHere is a gentle question to check your thoughts on **${topic}**:\n\n*If you had to explain the main purpose of **${topic}** to a friend in one single sentence, what would you say is the most important thing it helps us do?*\n\nTake your time — there's no rush!`;
  }

  return `### Exploring ${topic} with your AI Tutor\n\nThat's a thoughtful question about **${topic}**!\n\nWhen exploring "${input.message}", the key thing to keep in mind is how **${topic}** connects basic observations to structured understanding.\n\n* **Key Takeaway**: Breaking down complex ideas into manageable observations always makes **${topic}** easier to grasp.\n* **Next Step**: We can explore a real-world example, look at step-by-step principles, or answer any specific questions you have.\n\nWhat would feel most helpful to focus on right now?`;
}

