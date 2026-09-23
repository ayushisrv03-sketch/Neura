export interface LessonQuestion {
  id: number;
  question: string;
  choices: [string, string, string];
  answer: string;
}

export interface DetailedLesson {
  id: number;
  title: string;
  intro: string;
  explanation: string;
  example: string;
  activity: string;
  question: string;
  choices: [string, string, string];
  answer: string;
  questions: LessonQuestion[];
}

export interface TopicCurriculum {
  subject: string;
  level: string;
  eyebrow: string;
  lessons: DetailedLesson[];
}

function buildLesson(
  id: number,
  title: string,
  intro: string,
  explanation: string,
  example: string,
  activity: string,
  q1: { question: string; choices: [string, string, string]; answer: string },
  q2: { question: string; choices: [string, string, string]; answer: string },
  q3: { question: string; choices: [string, string, string]; answer: string }
): DetailedLesson {
  return {
    id,
    title,
    intro,
    explanation,
    example,
    activity,
    question: q1.question,
    choices: q1.choices,
    answer: q1.answer,
    questions: [
      { id: 1, ...q1 },
      { id: 2, ...q2 },
      { id: 3, ...q3 },
    ],
  };
}

export const TOPIC_CURRICULA: Record<string, TopicCurriculum> = {
  Fractions: {
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Parts of a whole",
    lessons: [
      buildLesson(
        0,
        "1. Understanding Fractions",
        "Fractions describe equal parts of a whole and help us compare quantities clearly.",
        "A fraction has a numerator, which tells us how many parts we have, and a denominator, which tells us how many equal parts make up the whole.",
        "3/4 = 3 parts out of 4 total equal parts",
        "Shade 3 of 4 equal parts on a grid, then notice that 1 part remains unshaded (1/4).",
        { question: "Which number is the denominator in 3/4?", choices: ["3", "4", "7"], answer: "4" },
        { question: "What does the numerator in a fraction tell us?", choices: ["Total equal parts", "Number of parts we have", "The difference"], answer: "Number of parts we have" },
        { question: "If a pizza is cut into 8 equal slices and you eat 3, what fraction remains?", choices: ["5/8", "3/8", "8/3"], answer: "5/8" }
      ),
      buildLesson(
        1,
        "2. Fractions on a Number Line",
        "Number lines help us visualize where fractions lie between whole numbers.",
        "Divide the interval between 0 and 1 into equal segments based on the denominator, then count segments to find the numerator position.",
        "1/2 is halfway between 0 and 1 on a number line.",
        "Place 1/4, 2/4, and 3/4 on a number line between 0 and 1.",
        { question: "Where does 2/4 lie on a number line between 0 and 1?", choices: ["At 0.25", "Exactly at the midpoint (0.5)", "At 0.75"], answer: "Exactly at the midpoint (0.5)" },
        { question: "How many equal segments do you divide a number line into for fifths?", choices: ["5 segments", "4 segments", "6 segments"], answer: "5 segments" },
        { question: "Which fraction is located closest to 1 on a number line?", choices: ["1/4", "3/4", "1/2"], answer: "3/4" }
      ),
      buildLesson(
        2,
        "3. Comparing Fractions",
        "Compare fractions by finding a common denominator or using benchmarks like 1/2.",
        "When denominators are equal, the fraction with the larger numerator is greater. When numerators are equal, smaller denominators mean bigger parts.",
        "3/5 is greater than 2/5 because 3 > 2.",
        "Compare 2/3 and 3/4 by converting both to twelfths: 8/12 vs 9/12.",
        { question: "Which fraction is larger: 3/4 or 2/4?", choices: ["3/4", "2/4", "They are equal"], answer: "3/4" },
        { question: "When denominators are identical, which fraction is larger?", choices: ["Larger numerator", "Smaller numerator", "Denominator does not matter"], answer: "Larger numerator" },
        { question: "Which is greater: 1/3 or 1/4?", choices: ["1/3", "1/4", "They are equal"], answer: "1/3" }
      ),
      buildLesson(
        3,
        "4. Equivalent Fractions",
        "Equivalent fractions look different but represent the exact same value.",
        "Multiply or divide both the numerator and denominator by the same non-zero number to get an equivalent fraction.",
        "1/2 = 2/4 = 3/6 = 4/8",
        "Multiply both parts of 1/2 by 2, 3, and 4 to generate three equivalent fractions.",
        { question: "Which fraction is equivalent to 1/2?", choices: ["2/4", "1/3", "3/5"], answer: "2/4" },
        { question: "To find an equivalent fraction, you must:", choices: ["Multiply or divide top and bottom by the same number", "Add 2 to top and bottom", "Subtract top from bottom"], answer: "Multiply or divide top and bottom by the same number" },
        { question: "Which fraction is equivalent to 3/4?", choices: ["6/8", "4/3", "5/8"], answer: "6/8" }
      ),
      buildLesson(
        4,
        "5. Simplifying Fractions",
        "Simplifying means dividing top and bottom numbers by their greatest common factor (GCF).",
        "A fraction is in simplest form when the only common factor between its numerator and denominator is 1.",
        "6/8 simplified by dividing by 2 yields 3/4.",
        "Simplify 4/12 by finding GCF=4 to get 1/3.",
        { question: "What is 4/8 in simplest form?", choices: ["1/2", "2/4", "1/4"], answer: "1/2" },
        { question: "What is 6/9 simplified to simplest form?", choices: ["2/3", "1/3", "3/4"], answer: "2/3" },
        { question: "A fraction is in simplest form when GCF of top and bottom is:", choices: ["1", "0", "2"], answer: "1" }
      ),
      buildLesson(
        5,
        "6. Adding Fractions with Like Denominators",
        "Add the numerators together while keeping the denominator the same.",
        "Since the size of the parts is identical, add the total number of parts together.",
        "1/5 + 2/5 = 3/5",
        "Combine 2/7 and 3/7 to make 5/7 of a pie.",
        { question: "What is 2/7 + 3/7?", choices: ["5/7", "5/14", "6/7"], answer: "5/7" },
        { question: "When adding fractions with like denominators, what happens to the denominator?", choices: ["Stays the same", "Add them together", "Multiply them"], answer: "Stays the same" },
        { question: "What is 1/8 + 4/8?", choices: ["5/8", "5/16", "4/16"], answer: "5/8" }
      ),
      buildLesson(
        6,
        "7. Subtracting Fractions with Like Denominators",
        "Subtract the numerators while maintaining the common denominator.",
        "When subtracting parts of the same size, subtract the top numbers and keep the bottom number unchanged.",
        "5/8 - 2/8 = 3/8",
        "Start with 7/10 of a chocolate bar and eat 3/10. Calculate what remains.",
        { question: "What is 5/8 - 2/8?", choices: ["3/8", "3/0", "7/8"], answer: "3/8" },
        { question: "What is 7/10 - 4/10?", choices: ["3/10", "3/20", "11/10"], answer: "3/10" },
        { question: "If you have 4/5 of a cake and eat 1/5, how much is left?", choices: ["3/5", "3/10", "5/5"], answer: "3/5" }
      ),
      buildLesson(
        7,
        "8. Mixed Numbers & Improper Fractions",
        "Convert between whole numbers with fractions and fractions larger than 1.",
        "An improper fraction has a numerator greater than or equal to its denominator. A mixed number combines a whole number and a proper fraction.",
        "7/4 = 1 3/4",
        "Convert 2 1/2 into an improper fraction: (2 × 2 + 1) / 2 = 5/2.",
        { question: "What is 7/4 written as a mixed number?", choices: ["1 3/4", "1 1/4", "2 1/4"], answer: "1 3/4" },
        { question: "What is 2 1/2 written as an improper fraction?", choices: ["5/2", "3/2", "4/2"], answer: "5/2" },
        { question: "An improper fraction always has a numerator that is:", choices: ["Greater than or equal to denominator", "Smaller than denominator", "Zero"], answer: "Greater than or equal to denominator" }
      ),
      buildLesson(
        8,
        "9. Adding & Subtracting Unlike Fractions",
        "Find a common denominator before adding or subtracting fractions.",
        "Convert both fractions to equivalent fractions with the Least Common Denominator (LCD), then add or subtract numerators.",
        "1/2 + 1/3 = 3/6 + 2/6 = 5/6",
        "Add 1/4 + 1/2 by changing 1/2 to 2/4.",
        { question: "What is 1/2 + 1/4?", choices: ["3/4", "2/6", "1/6"], answer: "3/4" },
        { question: "What is the LCD of 1/2 and 1/3?", choices: ["6", "5", "3"], answer: "6" },
        { question: "What is 1/2 - 1/3?", choices: ["1/6", "2/6", "1/5"], answer: "1/6" }
      ),
      buildLesson(
        9,
        "10. Multiplying Fractions",
        "Multiply numerators together and denominators together directly.",
        "To multiply two fractions, multiply top × top and bottom × bottom, then simplify the result if needed.",
        "2/3 × 3/4 = 6/12 = 1/2",
        "Calculate 1/2 of 1/4 of a pizza = 1/8.",
        { question: "What is 1/2 × 3/4?", choices: ["3/8", "4/6", "3/6"], answer: "3/8" },
        { question: "What is 2/3 × 1/2?", choices: ["2/6 (1/3)", "3/5", "1/6"], answer: "2/6 (1/3)" },
        { question: "When multiplying fractions, do you need a common denominator?", choices: ["No", "Yes", "Only for thirds"], answer: "No" }
      ),
      buildLesson(
        10,
        "11. Dividing Fractions",
        "Multiply by the reciprocal (flip the second fraction and multiply).",
        "Keep the first fraction, change division to multiplication, and flip the second fraction upside down.",
        "1/2 ÷ 1/4 = 1/2 × 4/1 = 4/2 = 2",
        "Divide 3/4 by 1/2 by multiplying 3/4 × 2/1 = 6/4 = 1 1/2.",
        { question: "What is 1/2 ÷ 1/2?", choices: ["1", "1/4", "2"], answer: "1" },
        { question: "To divide fractions, you multiply by the:", choices: ["Reciprocal of second fraction", "Same fraction", "Denominator"], answer: "Reciprocal of second fraction" },
        { question: "What is 1/2 ÷ 1/4?", choices: ["2", "1/8", "1/2"], answer: "2" }
      ),
      buildLesson(
        11,
        "12. Real-World Fraction Problems",
        "Apply fraction concepts to recipe scaling, measurements, and word problems.",
        "Identify the whole quantity, choose the appropriate fraction operation, and solve step-by-step.",
        "A recipe needs 3/4 cup sugar. If you make half a batch, use 3/4 × 1/2 = 3/8 cup.",
        "Calculate how many 1/4 cup servings are in 3 cups of flour.",
        { question: "If a recipe calls for 2/3 cup of milk and you double it, how much milk do you need?", choices: ["4/3 cups (1 1/3)", "4/6 cups", "2/6 cups"], answer: "4/3 cups (1 1/3)" },
        { question: "How many 1/4 cup servings are in 3 full cups of flour?", choices: ["12 servings", "7 servings", "4 servings"], answer: "12 servings" },
        { question: "If a 12-mile trail is 3/4 completed, how many miles have been walked?", choices: ["9 miles", "6 miles", "8 miles"], answer: "9 miles" }
      ),
    ],
  },

  "Linear equations": {
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Balance methods",
    lessons: Array.from({ length: 12 }, (_, i) =>
      buildLesson(
        i,
        `${i + 1}. Linear Equation Topic ${i + 1}`,
        `Solve linear equations with step-by-step balance methods in lesson ${i + 1}.`,
        "Whatever operation you apply to one side of an equation, apply the same operation to the other side.",
        "2x + 3 = 11 → x = 4",
        "Subtract 3 from both sides, then divide both sides by 2.",
        { question: `What is x in 2x + 3 = 11?`, choices: ["4", "3", "7"], answer: "4" },
        { question: `In 3x = 15, what is x?`, choices: ["5", "3", "15"], answer: "5" },
        { question: `What is inverse of addition?`, choices: ["Subtraction", "Multiplication", "Division"], answer: "Subtraction" }
      )
    ),
  },

  Geometry: {
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Angles and triangles",
    lessons: Array.from({ length: 14 }, (_, i) =>
      buildLesson(
        i,
        `${i + 1}. Geometry Concept ${i + 1}`,
        `Explore geometric shapes, angles, and spatial rules in lesson ${i + 1}.`,
        "The interior angles inside every triangle add up to 180°.",
        "60° + 50° + 70° = 180°",
        "Calculate the third angle using the 180 degree triangle rule.",
        { question: "What is the angle sum of a triangle?", choices: ["180°", "90°", "360°"], answer: "180°" },
        { question: "What is an angle measuring 90° called?", choices: ["Right angle", "Acute angle", "Obtuse angle"], answer: "Right angle" },
        { question: "How many sides does a quadrilateral have?", choices: ["4", "3", "5"], answer: "4" }
      )
    ),
  },

  Photosynthesis: {
    subject: "Science",
    level: "Grade 6",
    eyebrow: "Light-dependent reactions",
    lessons: Array.from({ length: 11 }, (_, i) =>
      buildLesson(
        i,
        `${i + 1}. Photosynthesis Topic ${i + 1}`,
        `Plants convert solar energy into glucose in lesson ${i + 1}.`,
        "In photosynthesis, leaves use sunlight, water, and CO2 to produce glucose and oxygen.",
        "Sunlight + water + carbon dioxide → glucose + oxygen",
        "Trace the path from sunlight to glucose inside leaf chloroplasts.",
        { question: "Which gas do plants take in during photosynthesis?", choices: ["Carbon dioxide", "Oxygen", "Nitrogen"], answer: "Carbon dioxide" },
        { question: "Which organelle houses chlorophyll?", choices: ["Chloroplast", "Nucleus", "Vacuole"], answer: "Chloroplast" },
        { question: "What gas is released into air as a byproduct?", choices: ["Oxygen", "Carbon dioxide", "Hydrogen"], answer: "Oxygen" }
      )
    ),
  },

  "States of matter": {
    subject: "Science",
    level: "Grade 6",
    eyebrow: "Particles in motion",
    lessons: Array.from({ length: 11 }, (_, i) =>
      buildLesson(
        i,
        `${i + 1}. States of Matter Topic ${i + 1}`,
        `Matter exists in solid, liquid, or gas phases in lesson ${i + 1}.`,
        "Heating gives particles more energy, causing them to move faster and further apart.",
        "ice → water → steam",
        "Compare particle spacing in solid, liquid, and gas states.",
        { question: "Which state has particles moving most freely?", choices: ["Gas", "Liquid", "Solid"], answer: "Gas" },
        { question: "At what temperature does water freeze?", choices: ["0°C", "100°C", "32°C"], answer: "0°C" },
        { question: "What process turns liquid into gas vapor?", choices: ["Evaporation", "Freezing", "Deposition"], answer: "Evaporation" }
      )
    ),
  },

  "Parts of a plant": {
    subject: "Science",
    level: "Grade 5",
    eyebrow: "Roots, stems, and leaves",
    lessons: Array.from({ length: 11 }, (_, i) =>
      buildLesson(
        i,
        `${i + 1}. Plant Anatomy Topic ${i + 1}`,
        `Each plant part performs vital roles for survival in lesson ${i + 1}.`,
        "Roots absorb water, stems support transport, and leaves make food.",
        "Roots → water | Stem → transport | Leaves → food",
        "Match plant parts to their growth functions.",
        { question: "Which plant part absorbs water from soil?", choices: ["Roots", "Leaves", "Flowers"], answer: "Roots" },
        { question: "Which plant part carries out photosynthesis?", choices: ["Leaves", "Roots", "Petals"], answer: "Leaves" },
        { question: "What flower part attracts pollinators?", choices: ["Petals", "Roots", "Sepals"], answer: "Petals" }
      )
    ),
  },
};

export function getTopicCurriculum(topicName: string): TopicCurriculum {
  if (TOPIC_CURRICULA[topicName]) {
    return TOPIC_CURRICULA[topicName];
  }

  const subject = "General Science";
  const level = "Interactive";
  const eyebrow = `Core concepts of ${topicName}`;

  const defaultTitles = [
    `1. Understanding ${topicName}`,
    `2. Key Principles of ${topicName}`,
    `3. Core Mechanisms`,
    `4. Foundational Models`,
    `5. Analyzing Components`,
    `6. Step-by-Step Operations`,
    `7. Intermediate Applications`,
    `8. Problem Solving Strategies`,
    `9. Advanced Scenarios`,
    `10. Real-World Case Studies`,
    `11. Practical Exercises`,
    `12. Mastery & Review`,
  ];

  const lessons: DetailedLesson[] = defaultTitles.map((title, idx) =>
    buildLesson(
      idx,
      title,
      `Master the essential principles behind ${topicName} in lesson ${idx + 1}.`,
      `This lesson covers fundamental concepts, step-by-step reasoning, and practical examples for ${topicName}.`,
      `Worked Example ${idx + 1}: Applying key rules of ${topicName}.`,
      `Practice applying lesson ${idx + 1} concepts through live interactive models and checks.`,
      { question: `Which statement best describes ${title}?`, choices: [`Core concept of ${topicName}`, "Secondary property", "Alternative model"], answer: `Core concept of ${topicName}` },
      { question: `What is the key principle in lesson ${idx + 1}?`, choices: ["Systematic operation", "Random occurrence", "Static structure"], answer: "Systematic operation" },
      { question: `How do we verify results in ${title}?`, choices: ["Empirical observation", "Guesswork", "Single trial"], answer: "Empirical observation" }
    )
  );

  return { subject, level, eyebrow, lessons };
}

export function isLessonUnlocked(lessonIndex: number, completedIndices: number[]): boolean {
  if (lessonIndex < 3) return true;
  return completedIndices.includes(lessonIndex - 1);
}

export function getCurrentUserKey(explicitUserId?: string | number | null): string {
  if (explicitUserId) {
    const s = String(explicitUserId);
    return s.startsWith("user_") ? s : `user_${s}`;
  }
  if (typeof window === "undefined") return "guest";
  try {
    const raw = localStorage.getItem("manus-runtime-user-info");
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && (parsed.id || parsed.openId || parsed.email)) {
        return `user_${parsed.id || parsed.openId || parsed.email}`;
      }
    }
  } catch {}
  return "guest";
}

const STORAGE_PREFIX = "neura-topic-completed-v3-";

export function getTopicCompletedLessons(topic: string, userId?: string | number | null): number[] {
  if (typeof window === "undefined" || !topic) return [];
  const userKey = getCurrentUserKey(userId);
  try {
    const saved = localStorage.getItem(`${STORAGE_PREFIX}${userKey}-${topic}`);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed.map((n) => Number(n));
    }
  } catch (err) {
    console.warn("Failed to read completed lessons from localStorage", err);
  }
  return [];
}

export function setTopicLessonCompleted(
  topic: string,
  lessonIndex: number,
  userId?: string | number | null
): number[] {
  if (!topic) return [];
  const userKey = getCurrentUserKey(userId);
  const current = getTopicCompletedLessons(topic, userId);
  if (!current.includes(lessonIndex)) {
    const updated = [...current, lessonIndex].sort((a, b) => a - b);
    try {
      localStorage.setItem(`${STORAGE_PREFIX}${userKey}-${topic}`, JSON.stringify(updated));
    } catch (err) {
      console.warn("Failed to save completed lesson to localStorage", err);
    }
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("neura-lesson-completed", {
          detail: { topic, lessonIndex, completed: updated, userKey },
        })
      );
    }
    return updated;
  }
  return current;
}

export function clearTopicCompletedLessons(userId?: string | number | null): void {
  if (typeof window === "undefined") return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (
        key &&
        (key.startsWith("neura-topic-completed-") ||
          key.startsWith("neura-topic-completed-v2-") ||
          key.startsWith("neura-topic-completed-v3-"))
      ) {
        if (!userId || key.includes(String(userId))) {
          keysToRemove.push(key);
        }
      }
    }
    keysToRemove.forEach((k) => localStorage.removeItem(k));
  } catch (err) {
    console.warn("Failed to clear completed lessons", err);
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent("neura-lesson-completed", {
        detail: { topic: "", lessonIndex: -1, completed: [] },
      })
    );
  }
}

export const lessons = Object.fromEntries(
  Object.entries(TOPIC_CURRICULA).map(([topic, curr]) => [
    topic,
    {
      subject: curr.subject,
      level: curr.level,
      eyebrow: curr.eyebrow,
      intro: curr.lessons[0].intro,
      explanation: curr.lessons[0].explanation,
      example: curr.lessons[0].example,
      activity: curr.lessons[0].activity,
      question: curr.lessons[0].question,
      choices: curr.lessons[0].choices,
      answer: curr.lessons[0].answer,
    },
  ])
);
