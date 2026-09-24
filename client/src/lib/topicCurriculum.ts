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
    lessons: [
      buildLesson(
        0,
        "1. Introduction to Variables & Expressions",
        "Variables like x, y, and n represent unknown or changing values in mathematical relationships.",
        "An algebraic expression combines numbers, variables, and operation symbols without an equals sign. Evaluating an expression means substituting a given number in place of the variable and calculating the result using order of operations.",
        "Evaluate 3x + 5 when x = 4: 3(4) + 5 = 12 + 5 = 17.",
        "Substitute x = 6 into 2x - 3: 2(6) - 3 = 9.",
        { question: "What is the value of 3x + 5 when x = 4?", choices: ["17", "12", "9"], answer: "17" },
        { question: "In the expression 7y - 4, what is the number 7 called?", choices: ["Coefficient", "Variable", "Constant"], answer: "Coefficient" },
        { question: "Evaluate 4n - 3 when n = 5:", choices: ["17", "23", "20"], answer: "17" }
      ),
      buildLesson(
        1,
        "2. One-Step Equations: Addition & Subtraction",
        "Solve for an unknown variable by applying inverse operations to keep both sides balanced.",
        "Equations state that two expressions are equal. To isolate a variable that has a number added to it, subtract that number from both sides. If a number is subtracted, add it to both sides.",
        "x + 9 = 24 → subtract 9 from both sides → x = 15.",
        "Solve y - 8 = 17 by adding 8 to both sides: y = 25.",
        { question: "To isolate x in x + 14 = 30, what operation should you perform on both sides?", choices: ["Subtract 14", "Add 14", "Divide by 14"], answer: "Subtract 14" },
        { question: "Solve for y: y - 11 = 15", choices: ["26", "4", "165"], answer: "26" },
        { question: "Which value of m makes m + 8 = 21 true?", choices: ["13", "29", "12"], answer: "13" }
      ),
      buildLesson(
        2,
        "3. One-Step Equations: Multiplication & Division",
        "Undo multiplication with division, and undo division by multiplying both sides.",
        "When a variable is multiplied by a coefficient, divide both sides by that coefficient. When a variable is divided by a number, multiply both sides by that number to isolate the variable.",
        "5x = 35 → divide both sides by 5 → x = 7. Also, x / 4 = 6 → multiply by 4 → x = 24.",
        "Check that dividing both sides of 8w = 56 gives w = 7.",
        { question: "Solve for x: 6x = 54", choices: ["9", "8", "60"], answer: "9" },
        { question: "In the equation x / 4 = 9, what is the value of x?", choices: ["36", "13", "2.25"], answer: "36" },
        { question: "Solve for k: -4k = 28", choices: ["-7", "7", "-32"], answer: "-7" }
      ),
      buildLesson(
        3,
        "4. Two-Step Equations & The Balance Method",
        "Solve two-step equations by reversing the order of operations: undo addition/subtraction first, then multiplication/division.",
        "Treat the equation like a balanced scale. First, isolate the variable term by adding or subtracting constants. Second, isolate the variable itself by dividing or multiplying.",
        "2x + 7 = 19 → subtract 7 → 2x = 12 → divide by 2 → x = 6.",
        "Solve 3m - 4 = 20 by adding 4, then dividing by 3 to find m = 8.",
        { question: "What is the recommended first step to solve 3x + 8 = 29?", choices: ["Subtract 8 from both sides", "Divide both sides by 3", "Add 8 to both sides"], answer: "Subtract 8 from both sides" },
        { question: "Solve for x: 4x - 5 = 19", choices: ["6", "5", "8"], answer: "6" },
        { question: "Solve for a: a / 3 + 4 = 9", choices: ["15", "23", "5"], answer: "15" }
      ),
      buildLesson(
        4,
        "5. Variables on Both Sides",
        "Collect variable terms on one side and numerical constants on the other side.",
        "When a variable appears on both sides of an equation, subtract or add variable terms so that all variables end up on one side. Then solve the resulting two-step equation.",
        "5x = 2x + 18 → subtract 2x from both sides → 3x = 18 → x = 6.",
        "Subtract 3x from both sides of 7x + 2 = 3x + 18 to get 4x + 2 = 18.",
        { question: "To solve 6x = 2x + 20, what is the best first step?", choices: ["Subtract 2x from both sides", "Divide both sides by 6", "Subtract 20 from both sides"], answer: "Subtract 2x from both sides" },
        { question: "Solve for x: 8x - 7 = 3x + 18", choices: ["5", "3", "7"], answer: "5" },
        { question: "What is the solution to 4(x + 1) = 2x + 12?", choices: ["4", "5", "8"], answer: "4" }
      ),
      buildLesson(
        5,
        "6. The Distributive Property in Equations",
        "Multiply terms outside parentheses across every term inside before simplifying.",
        "The distributive property states a(b + c) = ab + ac. Clear parentheses first by multiplying the outer factor by each term inside, then solve normally.",
        "3(x + 4) = 27 → 3x + 12 = 27 → 3x = 15 → x = 5.",
        "Expand 4(2x - 3) into 8x - 12.",
        { question: "Expand 4(3x - 2):", choices: ["12x - 8", "12x - 2", "7x - 6"], answer: "12x - 8" },
        { question: "Solve for x: 2(x + 5) = 22", choices: ["6", "11", "8"], answer: "6" },
        { question: "Which equation is equivalent to 5(y - 3) = 35?", choices: ["5y - 15 = 35", "5y - 3 = 35", "y - 15 = 35"], answer: "5y - 15 = 35" }
      ),
      buildLesson(
        6,
        "7. Combining Like Terms",
        "Combine terms that share the exact same variable part before balancing.",
        "Like terms have identical variable components (e.g. 5x and 2x). You can add or subtract their coefficients: 5x + 2x = 7x. Constants (numbers without variables) are also like terms.",
        "4x + 7 + 3x = 28 → 7x + 7 = 28 → 7x = 21 → x = 3.",
        "Group like terms in 6x + 4 - 2x = 20 to get 4x + 4 = 20.",
        { question: "Simplify by combining like terms: 7x + 4x - 3x", choices: ["8x", "14x", "10x"], answer: "8x" },
        { question: "Solve: 5x + 6 + 2x = 27", choices: ["3", "4", "5"], answer: "3" },
        { question: "Which pair represents like terms?", choices: ["6x and -9x", "6x and 6y", "6x and 6"], answer: "6x and -9x" }
      ),
      buildLesson(
        7,
        "8. Equations with Parentheses & Grouping",
        "Clear grouping symbols methodically while paying close attention to negative signs.",
        "A negative sign outside parentheses changes the sign of every term inside: -(x - 5) becomes -x + 5. Once grouping symbols are expanded, combine like terms and isolate x.",
        "4 - (x - 3) = 11 → 4 - x + 3 = 11 → 7 - x = 11 → -x = 4 → x = -4.",
        "Simplify 3(2x + 1) - 4 = 17.",
        { question: "What does -(3x - 8) simplify to?", choices: ["-3x + 8", "-3x - 8", "3x - 8"], answer: "-3x + 8" },
        { question: "Solve for x: 2(x + 4) - 3 = 13", choices: ["4", "5", "8"], answer: "4" },
        { question: "Solve: 8 - (x + 2) = 1", choices: ["5", "-5", "7"], answer: "5" }
      ),
      buildLesson(
        8,
        "9. Translating Word Problems into Equations",
        "Convert verbal descriptions and real-world scenarios into algebraic equations.",
        "Identify the unknown quantity and choose a variable. Look for clue words: 'sum' (+), 'difference' (-), 'product' (×), 'quotient' (÷), and 'is / equals' (=).",
        "'Five more than twice a number is 21' → 2x + 5 = 21 → 2x = 16 → x = 8.",
        "Translate: 'A concert ticket costs $12 plus $4 per snack equals $32'.",
        { question: "'Three times a number decreased by 4 is 23'. Which equation represents this?", choices: ["3x - 4 = 23", "3(x - 4) = 23", "4 - 3x = 23"], answer: "3x - 4 = 23" },
        { question: "Sam spent $50 total on a $20 membership and 6 identical notebooks (6n + 20 = 50). What was the price of each notebook?", choices: ["$5", "$6", "$8"], answer: "$5" },
        { question: "A number divided by 4, plus 7, equals 12. What is the number?", choices: ["20", "24", "16"], answer: "20" }
      ),
      buildLesson(
        9,
        "10. Multi-Step Linear Equations",
        "Follow a comprehensive 4-step checklist to solve complex multi-step equations.",
        "Step 1: Distribute to remove parentheses. Step 2: Combine like terms on each side. Step 3: Move variable terms to one side. Step 4: Solve the remaining two-step equation.",
        "3(x + 2) = 2(x + 5) → 3x + 6 = 2x + 10 → x = 4.",
        "Solve 2(3x - 1) = 4x + 8.",
        { question: "Solve for x: 3(x + 4) = x + 20", choices: ["4", "8", "6"], answer: "4" },
        { question: "Solve: 2(2x - 3) + 3x = 15", choices: ["3", "4", "5"], answer: "3" },
        { question: "What is the solution to 5(x - 1) = 2(x + 5)?", choices: ["5", "3", "7"], answer: "5" }
      ),
      buildLesson(
        10,
        "11. Equations with Fractions & Decimals",
        "Clear denominators and decimal points by multiplying through by a common factor.",
        "Multiply every term in the equation by the Least Common Multiple (LCM) of the denominators to eliminate fractions. For decimals, multiply by 10 or 100.",
        "x/3 + x/2 = 10 → multiply all terms by 6 → 2x + 3x = 60 → 5x = 60 → x = 12.",
        "Clear fractions in x/4 + 2 = 5 by multiplying through by 4.",
        { question: "To eliminate fractions in x/4 + x/6 = 5, what should you multiply both sides by?", choices: ["12", "24", "10"], answer: "12" },
        { question: "Solve: x/3 + x/6 = 6", choices: ["12", "18", "9"], answer: "12" },
        { question: "Solve: 0.3x + 1.2 = 3.0", choices: ["6", "4", "5"], answer: "6" }
      ),
      buildLesson(
        11,
        "12. Systems of Linear Equations",
        "Find values of two variables that satisfy two linear equations at the same time.",
        "A system of equations has a solution (x, y) where the graphs of the two lines intersect. You can solve by substitution, elimination, or graphing.",
        "If x + y = 12 and x - y = 4, add the equations: 2x = 16 → x = 8, and y = 4.",
        "Test whether (5, 2) satisfies x + y = 7 and 2x - y = 8.",
        { question: "Which ordered pair (x, y) satisfies both x + y = 10 and x - y = 4?", choices: ["(7, 3)", "(8, 2)", "(6, 4)"], answer: "(7, 3)" },
        { question: "The solution to a system of two linear equations on a graph is:", choices: ["The point where the two lines intersect", "The y-intercept of the top line", "The origin (0, 0)"], answer: "The point where the two lines intersect" },
        { question: "If 3x + y = 13 and y = 4, what is the value of x?", choices: ["3", "4", "5"], answer: "3" }
      ),
    ],
  },

  Geometry: {
    subject: "Maths",
    level: "Grade 7",
    eyebrow: "Angles and triangles",
    lessons: [
      buildLesson(
        0,
        "1. Points, Lines, and Angle Basics",
        "Geometry begins with points, rays, and angle rotation measured in degrees.",
        "An angle is formed by two rays sharing a common vertex. Angles are measured with a protractor from 0° to 180°: acute (<90°), right (90°), obtuse (>90° and <180°), and straight (180°).",
        "A 45° angle is acute; an opening of 135° is obtuse.",
        "Use the protractor tool to rotate an angle between 10° and 170°.",
        { question: "An angle measuring 72° is classified as:", choices: ["Acute angle", "Obtuse angle", "Right angle"], answer: "Acute angle" },
        { question: "What is the exact measure of a straight angle?", choices: ["180°", "90°", "360°"], answer: "180°" },
        { question: "How many degrees are in one full circular rotation?", choices: ["360°", "180°", "270°"], answer: "360°" }
      ),
      buildLesson(
        1,
        "2. Complementary & Supplementary Angles",
        "Angles that pair up to form special sums like right angles (90°) or straight lines (180°).",
        "Two angles are complementary if their sum is 90°. Two angles are supplementary if their sum is 180°.",
        "The complement of 35° is 90° - 35° = 55°. The supplement of 35° is 180° - 35° = 145°.",
        "Calculate the complement and supplement of an adjustable angle.",
        { question: "If angle A is 40°, what is its complementary angle?", choices: ["50°", "140°", "60°"], answer: "50°" },
        { question: "Two angles form a linear pair on a straight line. What is their sum?", choices: ["180°", "90°", "360°"], answer: "180°" },
        { question: "What is the supplement of a 115° angle?", choices: ["65°", "75°", "25°"], answer: "65°" }
      ),
      buildLesson(
        2,
        "3. Parallel Lines & Transversals",
        "When a line cuts across two parallel lines, predictable angle pairs are created.",
        "A transversal line intersecting two parallel lines creates corresponding angles (equal), alternate interior angles (equal), and consecutive interior angles (supplementary).",
        "If one interior angle is 65°, its alternate interior angle across the transversal is also 65°.",
        "Trace parallel lines L1 and L2 crossed by a transversal.",
        { question: "When a transversal intersects two parallel lines, alternate interior angles are:", choices: ["Equal in measure", "Supplementary", "Complementary"], answer: "Equal in measure" },
        { question: "If two parallel lines are cut by a transversal and one corresponding angle is 70°, what is the other?", choices: ["70°", "110°", "20°"], answer: "70°" },
        { question: "What are consecutive interior angles on the same side of a transversal line?", choices: ["Supplementary (sum to 180°)", "Always equal", "Complementary (sum to 90°)"], answer: "Supplementary (sum to 180°)" }
      ),
      buildLesson(
        3,
        "4. The Triangle Angle Sum Theorem",
        "The three interior angles of any triangle always add up to exactly 180°.",
        "No matter how long or short the sides are, the sum of all three angles inside any Euclidean triangle is 180°. If you know two angles, you can always find the third: 180° - (A + B).",
        "In a triangle with angles 60° and 70°, the third angle is 180° - 130° = 50°.",
        "Verify the 180° theorem with right, acute, and obtuse triangles.",
        { question: "What is the sum of the interior angles in any triangle?", choices: ["180°", "360°", "90°"], answer: "180°" },
        { question: "A triangle has angles measuring 45° and 65°. What is the third angle?", choices: ["70°", "80°", "60°"], answer: "70°" },
        { question: "Can a triangle have two right angles (90° + 90°)?", choices: ["No, because the angles would already sum to 180° without a 3rd angle", "Yes, in isosceles triangles", "Yes, in scalene triangles"], answer: "No, because the angles would already sum to 180° without a 3rd angle" }
      ),
      buildLesson(
        4,
        "5. Classifying Triangles by Sides and Angles",
        "Triangles are classified by side lengths (equilateral, isosceles, scalene) and angle measures (acute, right, obtuse).",
        "Equilateral: 3 equal sides, all angles 60°. Isosceles: 2 equal sides and 2 equal base angles. Scalene: all 3 sides and angles different. A right triangle has one 90° angle.",
        "A triangle with sides 5cm, 5cm, and 8cm is an isosceles triangle.",
        "Morph between equilateral, isosceles, and scalene triangle outlines.",
        { question: "Which triangle has all three sides of equal length?", choices: ["Equilateral", "Isosceles", "Scalene"], answer: "Equilateral" },
        { question: "An isosceles triangle always has at least how many equal sides?", choices: ["2 equal sides", "3 equal sides", "0 equal sides"], answer: "2 equal sides" },
        { question: "What are the interior angles of every equilateral triangle?", choices: ["60°, 60°, 60°", "45°, 45°, 90°", "90°, 60°, 30°"], answer: "60°, 60°, 60°" }
      ),
      buildLesson(
        5,
        "6. Quadrilaterals & Polygon Angle Sums",
        "Explore 4-sided polygons (parallelograms, rectangles, trapezoids) and their angle totals.",
        "Any quadrilateral can be split into two triangles, so its interior angles always add up to 2 × 180° = 360°.",
        "In a quadrilateral with angles 90°, 90°, and 100°, the fourth angle is 360° - 280° = 80°.",
        "Calculate the missing fourth angle of a quadrilateral.",
        { question: "What is the sum of interior angles in any 4-sided quadrilateral?", choices: ["360°", "180°", "540°"], answer: "360°" },
        { question: "Three angles of a quadrilateral measure 100°, 85°, and 95°. What is the fourth angle?", choices: ["80°", "75°", "90°"], answer: "80°" },
        { question: "Which quadrilateral has four equal sides and four right angles?", choices: ["Square", "Rhombus", "Rectangle"], answer: "Square" }
      ),
      buildLesson(
        6,
        "7. Perimeter of Polygons",
        "Perimeter is the total distance around the outer boundary of a 2D shape.",
        "Calculate perimeter by summing all side lengths. For a rectangle: P = 2(length + width); for a square: P = 4s; for a regular polygon: P = n × s.",
        "A rectangle with length 8 cm and width 3 cm has perimeter P = 2(8 + 3) = 22 cm.",
        "Trace and compute perimeters for rectangles and composite garden borders.",
        { question: "What is the perimeter of a rectangle with length 12 m and width 5 m?", choices: ["34 m", "60 m", "17 m"], answer: "34 m" },
        { question: "A square has a perimeter of 48 cm. What is the length of each side?", choices: ["12 cm", "24 cm", "16 cm"], answer: "12 cm" },
        { question: "If an equilateral triangle has a perimeter of 27 cm, what is the length of one side?", choices: ["9 cm", "3 cm", "6 cm"], answer: "9 cm" }
      ),
      buildLesson(
        7,
        "8. Area of Rectangles, Triangles & Parallelograms",
        "Area measures the square units of surface enclosed within a boundary.",
        "Rectangle Area = base × height. Triangle Area = 1/2 × base × height (half of the enclosing rectangle). Parallelogram Area = base × perpendicular height.",
        "Base 6 cm and height 4 cm → Rectangle Area = 24 cm², Triangle Area = 1/2(6 × 4) = 12 cm².",
        "Compare the area of a rectangle to the area of a triangle with matching dimensions.",
        { question: "What is the area of a triangle with base 10 cm and height 6 cm?", choices: ["30 cm²", "60 cm²", "16 cm²"], answer: "30 cm²" },
        { question: "What is the formula for the area of a parallelogram with base b and vertical height h?", choices: ["b × h", "1/2 × b × h", "2(b + h)"], answer: "b × h" },
        { question: "A rectangular room is 7 meters long and 4 meters wide. How much carpet is needed to cover the floor?", choices: ["28 m²", "22 m²", "11 m²"], answer: "28 m²" }
      ),
      buildLesson(
        8,
        "9. Circumference of Circles",
        "Circumference is the perimeter of a circle, calculated using the constant Pi (π ≈ 3.14159).",
        "The ratio of circumference to diameter is constant: C = πd or C = 2πr. The diameter is twice the radius (d = 2r).",
        "A circle with radius 5 cm has C = 2 × 3.14 × 5 = 31.4 cm.",
        "Roll a circle along a line to visualize its unrolled circumference.",
        { question: "What is the formula for the circumference of a circle with radius r?", choices: ["2πr", "πr²", "πd²"], answer: "2πr" },
        { question: "If a bicycle wheel has a diameter of 10 inches, what is its approximate circumference (π ≈ 3.14)?", choices: ["31.4 inches", "15.7 inches", "62.8 inches"], answer: "31.4 inches" },
        { question: "What is the relationship between the radius and diameter of any circle?", choices: ["Diameter = 2 × radius", "Radius = 2 × diameter", "Diameter = radius²"], answer: "Diameter = 2 × radius" }
      ),
      buildLesson(
        9,
        "10. Area of Circles",
        "Find the 2D surface covered by a circle using the formula A = πr².",
        "Dividing a circle into tiny pie wedges and rearranging them forms a shape resembling a parallelogram of base πr and height r, giving Area = πr².",
        "A circle with radius 7 cm has Area = (22/7) × 7² = 154 cm².",
        "Calculate the area of a circular pizza with a 10 cm radius.",
        { question: "What is the formula for the area of a circle?", choices: ["πr²", "2πr", "πd"], answer: "πr²" },
        { question: "What is the approximate area of a circle with radius 4 cm (using π ≈ 3.14)?", choices: ["50.24 cm²", "25.12 cm²", "12.56 cm²"], answer: "50.24 cm²" },
        { question: "If you double the radius of a circle, what happens to its area?", choices: ["It quadruples (increases by 4×)", "It doubles (increases by 2×)", "It stays the same"], answer: "It quadruples (increases by 4×)" }
      ),
      buildLesson(
        10,
        "11. 3D Solids, Polyhedra & Net Diagrams",
        "3-dimensional figures occupy volume and can be unfolded into flat 2D nets.",
        "Polyhedra have flat polygon faces, straight edges, and sharp vertices. Euler's formula: Faces + Vertices - Edges = 2. A net is a 2D pattern that folds into a 3D solid.",
        "A cube has 6 square faces, 12 edges, and 8 vertices. 6 + 8 - 12 = 2.",
        "Unfold a 3D cube net into 6 connected square faces.",
        { question: "How many faces, edges, and vertices does a cube have?", choices: ["6 faces, 12 edges, 8 vertices", "6 faces, 8 edges, 12 vertices", "8 faces, 12 edges, 6 vertices"], answer: "6 faces, 12 edges, 8 vertices" },
        { question: "What 2D net consists of 2 congruent circular bases and 1 rectangular curved surface?", choices: ["Cylinder", "Cone", "Prism"], answer: "Cylinder" },
        { question: "Euler's formula for convex polyhedra states:", choices: ["F + V - E = 2", "F + E = V", "F × V = E"], answer: "F + V - E = 2" }
      ),
      buildLesson(
        11,
        "12. Surface Area & Volume of Prisms",
        "Measure the space inside a 3D solid (Volume) and the total area enclosing it (Surface Area).",
        "Volume of a rectangular prism = Length × Width × Height. Surface Area is the sum of the areas of all 6 rectangular faces: SA = 2(lw + lh + wh).",
        "Prism 4cm × 3cm × 2cm → Volume = 24 cm³. SA = 2(12 + 8 + 6) = 52 cm².",
        "Stack unit cubes to fill a 4 × 3 × 2 rectangular box.",
        { question: "What is the volume of a rectangular prism with length 5 cm, width 3 cm, and height 4 cm?", choices: ["60 cm³", "47 cm³", "30 cm³"], answer: "60 cm³" },
        { question: "What is the total surface area of a cube with side length 3 cm?", choices: ["54 cm²", "27 cm²", "36 cm²"], answer: "54 cm²" },
        { question: "What units are used to measure volume?", choices: ["Cubic units (e.g., cm³, m³)", "Square units (e.g., cm²)", "Linear units (e.g., cm)"], answer: "Cubic units (e.g., cm³, m³)" }
      ),
    ],
  },

  Photosynthesis: {
    subject: "Science",
    level: "Grade 6",
    eyebrow: "Light-dependent reactions",
    lessons: [
      buildLesson(
        0,
        "1. Overview of Photosynthesis",
        "Plants convert solar energy into chemical energy stored in glucose molecules.",
        "In photosynthesis, green leaves use sunlight, water absorbed by roots, and carbon dioxide from the air to produce glucose and oxygen gas.",
        "Sunlight + Water + Carbon Dioxide → Glucose + Oxygen.",
        "Trace the path from sunlight entering the leaf to sugar synthesis inside chloroplasts.",
        { question: "What are the two main products of photosynthesis?", choices: ["Glucose and oxygen", "Carbon dioxide and water", "Nitrogen and starch"], answer: "Glucose and oxygen" },
        { question: "What primary source of energy drives the process of photosynthesis?", choices: ["Sunlight", "Geothermal heat", "Wind energy"], answer: "Sunlight" },
        { question: "Which organisms perform photosynthesis?", choices: ["Plants, algae, and cyanobacteria", "Only land animals", "All fungi and insects"], answer: "Plants, algae, and cyanobacteria" }
      ),
      buildLesson(
        1,
        "2. Plant Cell Structure & Chloroplast Anatomy",
        "Photosynthesis occurs within specialized cell organelles called chloroplasts.",
        "Chloroplasts contain chlorophyll pigments, coin-like membrane discs called thylakoids (stacked into grana), and a fluid-filled surrounding space called the stroma.",
        "Thylakoid membranes trap light energy, while the stroma synthesizes glucose sugars.",
        "Examine the plant cell wall, vacuole, and chloroplast thylakoids under a microscope view.",
        { question: "In which plant cell organelle does photosynthesis take place?", choices: ["Chloroplast", "Mitochondria", "Nucleus"], answer: "Chloroplast" },
        { question: "What are the stacked disc membranes inside a chloroplast called?", choices: ["Thylakoids (grana)", "Ribosomes", "Vacuoles"], answer: "Thylakoids (grana)" },
        { question: "What is the fluid-filled space surrounding thylakoids where sugar synthesis occurs?", choices: ["Stroma", "Cytoplasm", "Matrix"], answer: "Stroma" }
      ),
      buildLesson(
        2,
        "3. Sunlight Energy & Solar Photon Capture",
        "Solar radiation provides the photon energy required to excite chlorophyll electrons.",
        "Sunlight arrives as photons of light energy. Pigments absorb this energy, initiating the light-dependent reactions of photosynthesis.",
        "Bright sunlight delivers higher photon flux, speeding up electron transfer.",
        "Adjust light intensity on a virtual leaf to observe photon absorption rate.",
        { question: "Light travels in discrete packets of energy known as:", choices: ["Photons", "Electrons", "Neutrons"], answer: "Photons" },
        { question: "What happens to chlorophyll electrons when struck by photons of light?", choices: ["They are excited to a higher energy level", "They are destroyed", "They freeze in place"], answer: "They are excited to a higher energy level" },
        { question: "Why can't plants photosynthesize in total darkness?", choices: ["They lack the light energy required to energize electrons", "Carbon dioxide disappears at night", "Roots stop absorbing water in darkness"], answer: "They lack the light energy required to energize electrons" }
      ),
      buildLesson(
        3,
        "4. Carbon Dioxide Uptake & Stomata Function",
        "Microscopic pores on leaf surfaces control atmospheric gas exchange.",
        "Stomata are small openings flanked by specialized guard cells. When guard cells swell with water, stomata open to admit CO₂ and release oxygen.",
        "Carbon dioxide diffuses into the leaf through open stomata: CO₂ concentration ~0.04% in air.",
        "Toggle the guard cell simulator to open and close the stomatal pore.",
        { question: "Through which microscopic pores on leaves does carbon dioxide enter?", choices: ["Stomata", "Chloroplasts", "Xylem tubes"], answer: "Stomata" },
        { question: "Which specialized cells open and close the stomatal pores?", choices: ["Guard cells", "Root hair cells", "Sieve tube cells"], answer: "Guard cells" },
        { question: "Under what conditions do plants typically close their stomata to prevent dehydration?", choices: ["Hot, dry, and windy weather", "Cool, humid mornings", "Heavy continuous rainfall"], answer: "Hot, dry, and windy weather" }
      ),
      buildLesson(
        4,
        "5. Water Absorption & Root Xylem Transport",
        "Water travels from soil through roots and xylem vessels up to the photosynthesizing leaves.",
        "Root hairs absorb water from soil through osmosis. Water then travels through continuous xylem tubes driven by transpiration pull and capillary action.",
        "Water molecules (H₂O) supply hydrogen atoms and electrons, releasing O₂ gas as a byproduct.",
        "Observe water rising up xylem capillaries against gravity toward the leaf canopy.",
        { question: "How do plant roots absorb water from surrounding soil particles?", choices: ["Osmosis through root hair cells", "Active suction pumping", "Stomatal evaporation"], answer: "Osmosis through root hair cells" },
        { question: "Which vascular tissue transports water upward from roots to leaves?", choices: ["Xylem", "Phloem", "Cambium"], answer: "Xylem" },
        { question: "What happens to water molecules during the light reactions of photosynthesis?", choices: ["They are split into hydrogen ions, electrons, and oxygen gas", "They turn into carbon dioxide", "They evaporate without reacting"], answer: "They are split into hydrogen ions, electrons, and oxygen gas" }
      ),
      buildLesson(
        5,
        "6. Chlorophyll Pigments & Light Spectrum Absorption",
        "Chlorophyll is the green pigment responsible for absorbing blue and red light wavelengths.",
        "Visible light consists of colors ranging from violet (400 nm) to red (700 nm). Chlorophyll absorbs red and blue light most efficiently while reflecting green light.",
        "Reflected green light (500–550 nm) reaches our eyes, which is why leaves appear green.",
        "Test different colored light filters to see which light wavelengths drive the highest photosynthetic rate.",
        { question: "Why do most plant leaves appear green to human eyes?", choices: ["Chlorophyll reflects green light while absorbing blue and red", "Chlorophyll absorbs only green light", "Plants produce green light by bioluminescence"], answer: "Chlorophyll reflects green light while absorbing blue and red" },
        { question: "Which colors of the visible light spectrum are absorbed most effectively by chlorophyll?", choices: ["Blue and red light", "Green and yellow light", "Orange only"], answer: "Blue and red light" },
        { question: "What role do accessory pigments like carotenoids play in leaves?", choices: ["Absorb additional wavelengths of light and protect chlorophyll", "Store water for roots", "Produce flower petals only"], answer: "Absorb additional wavelengths of light and protect chlorophyll" }
      ),
      buildLesson(
        6,
        "7. The Photosynthesis Chemical Equation",
        "The complete chemical transformation of inorganic carbon and water into organic sugar.",
        "Six molecules of carbon dioxide react with six molecules of water in the presence of light energy to produce one molecule of glucose and six molecules of oxygen gas.",
        "6 CO₂ + 6 H₂O + Light Energy → C₆H₁₂O₆ + 6 O₂.",
        "Balance the inputs and outputs of the molecular chemical reaction.",
        { question: "What is the balanced chemical formula for photosynthesis?", choices: ["6 CO₂ + 6 H₂O + Light → C₆H₁₂O₆ + 6 O₂", "C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O", "CO₂ + H₂O → CH₂O + O₂"], answer: "6 CO₂ + 6 H₂O + Light → C₆H₁₂O₆ + 6 O₂" },
        { question: "How many molecules of carbon dioxide are required to produce one molecule of glucose?", choices: ["6 molecules", "1 molecule", "12 molecules"], answer: "6 molecules" },
        { question: "What chemical element is represented by the formula C₆H₁₂O₆?", choices: ["Glucose (simple sugar)", "Starch", "Cellulose"], answer: "Glucose (simple sugar)" }
      ),
      buildLesson(
        7,
        "8. Glucose Synthesis & Starch Storage",
        "Plants polymerize soluble glucose into insoluble starch for long-term energy reserves.",
        "Glucose produced during photosynthesis fuels plant growth and cellular respiration. Excess glucose is linked into starch chains stored in roots, tubers, and seeds.",
        "Potatoes, carrots, and grains are plant storage organs rich in stored starch.",
        "Apply iodine reagent to a leaf: the stored starch stains dark blue-black.",
        { question: "How do plants store surplus glucose for later use?", choices: ["By converting it into insoluble starch", "By venting it into the air", "By converting it into salt"], answer: "By converting it into insoluble starch" },
        { question: "Which chemical indicator turns dark blue-black in the presence of stored plant starch?", choices: ["Iodine solution", "Benedict's reagent", "Litmus paper"], answer: "Iodine solution" },
        { question: "Besides energy storage, what structural polymer do plants make from glucose to build strong cell walls?", choices: ["Cellulose", "Keratin", "Lipids"], answer: "Cellulose" }
      ),
      buildLesson(
        8,
        "9. Oxygen Generation & Release",
        "Oxygen produced from splitting water is released into the atmosphere for aerobic life.",
        "During photolysis in the thylakoid membranes, water is split into hydrogen ions and oxygen atoms. Pairs of oxygen atoms join to form O₂ gas, which diffuses out stomata.",
        "Aquatic plants like Elodea produce streams of visible oxygen bubbles when illuminated.",
        "Count the rate of oxygen bubbles produced by an aquatic plant under different lamp distances.",
        { question: "Where does the oxygen released by plants originate?", choices: ["From the splitting of water molecules (H₂O)", "From carbon dioxide (CO₂)", "From soil air spaces"], answer: "From the splitting of water molecules (H₂O)" },
        { question: "How does oxygen exit the plant leaf during photosynthesis?", choices: ["Diffuses out through open stomata", "Transported down into root hairs", "Absorbed into plant stem bark"], answer: "Diffuses out through open stomata" },
        { question: "What experiment demonstrates oxygen production in aquatic plants like Elodea?", choices: ["Counting gas bubbles released under a bright lamp", "Measuring temperature drops in dark water", "Adding vinegar to the water"], answer: "Counting gas bubbles released under a bright lamp" }
      ),
      buildLesson(
        9,
        "10. Limiting Factors of Photosynthesis",
        "The rate of photosynthesis is constrained by light intensity, CO₂ levels, and temperature.",
        "According to the Law of Limiting Factors, the factor in shortest supply limits the reaction rate. Beyond an optimum temperature (e.g. >40°C), enzymes denature and photosynthesis drops.",
        "Increasing light intensity boosts the rate until CO₂ concentration or temperature becomes limiting.",
        "Plot photosynthesis rate curves against light intensity, temperature, and CO₂.",
        { question: "Which of the following is a primary limiting factor of photosynthesis?", choices: ["Light intensity, temperature, and CO₂ concentration", "Atmospheric pressure and sound waves", "Soil color and gravity"], answer: "Light intensity, temperature, and CO₂ concentration" },
        { question: "Why does the rate of photosynthesis drop drastically at excessively high temperatures (e.g. >45°C)?", choices: ["Enzymes denature and lose their shape", "Sunlight turns off", "Carbon dioxide turns to stone"], answer: "Enzymes denature and lose their shape" },
        { question: "If light and temperature are plentiful, what happens if CO₂ levels are kept near zero?", choices: ["Photosynthesis ceases due to lack of carbon feedstock", "Photosynthesis speeds up", "Oxygen output doubles"], answer: "Photosynthesis ceases due to lack of carbon feedstock" }
      ),
      buildLesson(
        10,
        "11. Photosynthesis vs Cellular Respiration",
        "Plants conduct photosynthesis during daylight, but perform cellular respiration day and night.",
        "Photosynthesis builds glucose and stores energy in chloroplasts. Cellular respiration in mitochondria breaks glucose with oxygen to release ATP energy needed for life.",
        "Day: Photosynthesis > Respiration (net O₂ released). Night: Respiration only (net CO₂ released).",
        "Compare daytime and nighttime gas exchange in a plant terrarium.",
        { question: "When do living plant cells perform cellular respiration?", choices: ["Continuously, both day and night", "Only at night", "Only during sunny afternoons"], answer: "Continuously, both day and night" },
        { question: "How does cellular respiration compare to photosynthesis in terms of gases?", choices: ["Respiration uses O₂ and releases CO₂; photosynthesis uses CO₂ and releases O₂", "Both use O₂ only", "Both use CO₂ only"], answer: "Respiration uses O₂ and releases CO₂; photosynthesis uses CO₂ and releases O₂" },
        { question: "Which organelle carries out cellular respiration to produce cellular ATP energy?", choices: ["Mitochondria", "Chloroplast", "Golgi apparatus"], answer: "Mitochondria" }
      ),
      buildLesson(
        11,
        "12. Photosynthesis & Earth's Carbon Cycle",
        "Photosynthesis forms the foundation of planetary food webs and regulates global climate.",
        "Plants, forests, and marine phytoplankton act as primary producers. They capture hundreds of billions of tons of atmospheric carbon dioxide annually, replenishing oxygen.",
        "Solar Energy → Primary Producers (Plants) → Primary Consumers (Herbivores) → Carnivores.",
        "Trace the global flow of carbon atoms between the atmosphere, biosphere, and oceans.",
        { question: "Why are photosynthesizing plants referred to as 'primary producers' in ecosystems?", choices: ["They produce organic food energy from sunlight for herbivores and food webs", "They consume other organisms", "They produce mineral rocks"], answer: "They produce organic food energy from sunlight for herbivores and food webs" },
        { question: "How do large forests and phytoplankton help combat global climate change?", choices: ["They act as massive carbon sinks by capturing and sequestering atmospheric CO₂", "They heat the ocean surface", "They absorb all cosmic radiation"], answer: "They act as massive carbon sinks by capturing and sequestering atmospheric CO₂" },
        { question: "What crucial atmospheric gas layer was formed millions of years ago by photosynthetic oxygen production?", choices: ["The ozone layer (O₃) protecting Earth from UV radiation", "The nitrogen mantle", "The methane blanket"], answer: "The ozone layer (O₃) protecting Earth from UV radiation" }
      ),
    ],
  },

  "States of matter": {
    subject: "Science",
    level: "Grade 6",
    eyebrow: "Particles in motion",
    lessons: [
      buildLesson(
        0,
        "1. What is Matter? Mass, Volume, and Density",
        "Matter is anything that has mass and takes up space in the universe.",
        "All physical objects are composed of matter. Mass is the quantity of matter (measured in grams or kilograms), and volume is the space it occupies (measured in liters or cm³). Density is mass per unit volume (D = m/V).",
        "A 250 g block of aluminum displacing 92.6 cm³ of water has density = 250 / 92.6 ≈ 2.7 g/cm³.",
        "Measure mass on a digital balance and displacement volume in a graduated cylinder.",
        { question: "What is the scientific definition of matter?", choices: ["Anything that has mass and takes up volume", "Any visible glowing energy", "Any object with a solid boundary"], answer: "Anything that has mass and takes up volume" },
        { question: "How is density calculated?", choices: ["Density = Mass ÷ Volume", "Density = Mass × Volume", "Density = Volume ÷ Mass"], answer: "Density = Mass ÷ Volume" },
        { question: "Which of the following is NOT matter?", choices: ["Sunlight energy", "Air inside a balloon", "A drop of water"], answer: "Sunlight energy" }
      ),
      buildLesson(
        1,
        "2. The Particle Theory of Matter",
        "All matter consists of tiny particles that are in constant motion and interact with each other.",
        "The five key principles: 1) All matter is made of particles, 2) All particles of a pure substance are identical, 3) Particles have spaces between them, 4) Particles are in constant motion, 5) Particles exert attractive forces on each other.",
        "Heating a substance increases particle kinetic energy, causing faster motion and expansion.",
        "Simulate particle motion at different temperatures to see spacing and vibration speed change.",
        { question: "According to the particle theory, what are all substances made of?", choices: ["Tiny particles that are in constant motion", "Solid stationary blocks", "Continuous liquid fields"], answer: "Tiny particles that are in constant motion" },
        { question: "What happens to the movement of particles when a substance is heated?", choices: ["They gain kinetic energy and move faster", "They slow down and cluster", "They lose all motion"], answer: "They gain kinetic energy and move faster" },
        { question: "What exists in the spaces between particles in a pure substance?", choices: ["Empty space (vacuum)", "Tiny droplets of air", "Thin liquid glue"], answer: "Empty space (vacuum)" }
      ),
      buildLesson(
        2,
        "3. Properties & Particle Behavior of Solids",
        "Solids maintain a definite shape and fixed volume because particles are locked into place.",
        "In a solid, particles are tightly packed in regular arrangements (lattices) and vibrate in fixed positions. Because particles cannot move past each other, solids resist compression and deformation.",
        "Ice, iron, diamonds, and table salt maintain their definite shape regardless of container.",
        "Examine the 3D crystal lattice of sodium chloride (table salt).",
        { question: "Why do solids possess a definite shape and fixed volume?", choices: ["Particles are tightly packed in fixed positions and vibrate in place", "Particles slide freely around one another", "Particles are separated by large gaps"], answer: "Particles are tightly packed in fixed positions and vibrate in place" },
        { question: "Which property is characteristic of crystalline solids like table salt or ice?", choices: ["A regular, repeating 3D lattice pattern", "Random amorphous clustering", "Easy compressibility"], answer: "A regular, repeating 3D lattice pattern" },
        { question: "Can a true solid be easily compressed by hand?", choices: ["No, because its particles are already packed closely together", "Yes, all solids compress like sponges", "Only when cooled below zero"], answer: "No, because its particles are already packed closely together" }
      ),
      buildLesson(
        3,
        "4. Properties & Particle Behavior of Liquids",
        "Liquids have a definite volume but take the shape of whatever container holds them.",
        "Liquid particles are close together but have enough kinetic energy to slide over and past each other. This allows liquids to flow, pour, and adapt their shape while maintaining constant volume.",
        "Pouring 100 mL of water from a tall cylinder into a wide beaker preserves exactly 100 mL volume.",
        "Pour liquids into various container geometries and observe surface leveling.",
        { question: "Which statement best describes a liquid?", choices: ["Definite volume, but takes the shape of its container", "Definite shape and definite volume", "No definite shape and no definite volume"], answer: "Definite volume, but takes the shape of its container" },
        { question: "Why are liquids able to flow smoothly when poured?", choices: ["Particles have enough energy to slide past each other while staying in close contact", "Particles break apart into atoms", "Particles fly completely away from each other"], answer: "Particles have enough energy to slide past each other while staying in close contact" },
        { question: "What property causes water droplets to bead up on a wax surface?", choices: ["Surface tension caused by attractive forces between liquid particles", "Viscosity resistance", "Sublimation pressure"], answer: "Surface tension caused by attractive forces between liquid particles" }
      ),
      buildLesson(
        4,
        "5. Properties & Particle Behavior of Gases",
        "Gases have neither a definite shape nor a fixed volume, expanding to fill any enclosed space.",
        "Gas particles possess high kinetic energy and move rapidly in random directions. Because vast empty spaces exist between particles, gases are easily compressed under pressure.",
        "Air compressed inside a scuba cylinder or bicycle tire exerts outward pressure on the container walls.",
        "Depress a gas syringe piston to compress air volume by half.",
        { question: "Which statement accurately describes a gas?", choices: ["No definite shape and no definite volume (fills any container)", "Definite shape and fixed volume", "Fixed volume but variable shape"], answer: "No definite shape and no definite volume (fills any container)" },
        { question: "Why are gases easily compressed inside a closed syringe?", choices: ["There are large empty spaces between gas particles", "Gas particles shrink in individual size", "Gas particles turn into liquid immediately"], answer: "There are large empty spaces between gas particles" },
        { question: "What creates gas pressure inside a bicycle tire?", choices: ["Continuous collisions of rapidly moving gas particles against the tire walls", "The heavy weight of static gas particles", "Chemical reactions between gas and rubber"], answer: "Continuous collisions of rapidly moving gas particles against the tire walls" }
      ),
      buildLesson(
        5,
        "6. Melting & Freezing (Solid-Liquid Transitions)",
        "Phase changes between solid and liquid occur at a constant characteristic temperature.",
        "Heating a solid supplies latent heat of fusion, allowing particles to break free from lattice positions (melting). Cooling removes thermal energy, locking particles into a solid (freezing).",
        "Pure water freezes into ice and ice melts into liquid water at exactly 0°C (32°F) under 1 atm.",
        "Track the plateau on a temperature vs. time graph as an ice-water mixture melts at 0°C.",
        { question: "At standard atmospheric pressure, what is the melting point of pure water ice?", choices: ["0°C (32°F)", "100°C (212°F)", "-10°C (14°F)"], answer: "0°C (32°F)" },
        { question: "What is the transition from liquid to solid called?", choices: ["Freezing (solidification)", "Melting", "Evaporation"], answer: "Freezing (solidification)" },
        { question: "While an ice cube is actively melting at 0°C, what happens to its temperature?", choices: ["It remains at 0°C until all ice has melted", "It increases steadily", "It drops below 0°C"], answer: "It remains at 0°C until all ice has melted" }
      ),
      buildLesson(
        6,
        "7. Evaporation, Boiling & Condensation",
        "Phase changes between liquid and gas involve absorbing or releasing large amounts of heat.",
        "Evaporation occurs at the liquid surface at any temperature. Boiling occurs throughout the entire liquid at a specific boiling point. Condensation occurs when cooling gas vapor turns back into liquid droplets.",
        "Puddles evaporate on warm sidewalks; warm breath condenses onto a cold window pane.",
        "Observe steam bubbles forming throughout boiling water at 100°C.",
        { question: "How does evaporation differ from boiling?", choices: ["Evaporation occurs only at the surface at any temperature; boiling occurs throughout at a fixed temperature", "Evaporation requires higher heat than boiling", "Boiling only happens in outer space"], answer: "Evaporation occurs only at the surface at any temperature; boiling occurs throughout at a fixed temperature" },
        { question: "What is the normal boiling point of pure water at sea level?", choices: ["100°C", "0°C", "50°C"], answer: "100°C" },
        { question: "Warm water vapor touching a cold bathroom mirror turns into water droplets. What process is this?", choices: ["Condensation", "Evaporation", "Sublimation"], answer: "Condensation" }
      ),
      buildLesson(
        7,
        "8. Sublimation & Deposition",
        "Some substances transition directly between solid and gas states without ever melting into liquids.",
        "Sublimation is the direct change from solid to gas (e.g. dry ice). Deposition is the direct change from gas to solid (e.g. frost forming on a freezing windshield from humid air).",
        "Solid CO₂ (dry ice) at -78.5°C sublimes directly into white carbon dioxide vapor gas.",
        "Watch dry ice sublime in a beaker without leaving any liquid residue behind.",
        { question: "What is sublimation?", choices: ["Direct transition from solid to gas without passing through liquid", "Direct transition from liquid to gas", "Direct transition from gas to solid"], answer: "Direct transition from solid to gas without passing through liquid" },
        { question: "Which everyday substance undergoes sublimation at room temperature?", choices: ["Dry ice (solid carbon dioxide)", "Liquid mercury", "Table salt crystals"], answer: "Dry ice (solid carbon dioxide)" },
        { question: "What is the reverse of sublimation (when gas turns directly into solid frost)?", choices: ["Deposition", "Melting", "Condensation"], answer: "Deposition" }
      ),
      buildLesson(
        8,
        "9. Thermal Energy & Kinetic Particle Speed",
        "Temperature measures the average kinetic energy of the particles making up a substance.",
        "Adding thermal energy increases particle speeds. In gases and liquids, faster particles spread out more and collide with greater force. Absolute Zero (0 K or -273.15°C) is the point of zero kinetic motion.",
        "Food coloring disperses throughout hot water in seconds, but takes minutes in ice water.",
        "Compare dye diffusion rates in 80°C hot water versus 5°C cold water.",
        { question: "Temperature is a direct measure of what property of a substance's particles?", choices: ["Average kinetic energy (speed) of the particles", "Total mass of all particles combined", "Total electrical charge of the atoms"], answer: "Average kinetic energy (speed) of the particles" },
        { question: "If you drop food coloring into hot water versus ice water, why does it spread much faster in hot water?", choices: ["Higher temperature means water particles move faster and collide more frequently", "Hot water has higher density", "The dye dissolves only in hot water"], answer: "Higher temperature means water particles move faster and collide more frequently" },
        { question: "What theoretical temperature corresponds to zero particle kinetic motion (Absolute Zero)?", choices: ["0 Kelvin (-273.15°C)", "0° Celsius", "-100° Celsius"], answer: "0 Kelvin (-273.15°C)" }
      ),
      buildLesson(
        9,
        "10. Gas Pressure, Volume, and Boyle's Law",
        "The relationship between gas volume and pressure is governed by Boyle's Law: P₁V₁ = P₂V₂.",
        "At constant temperature, compressing a gas into half its volume causes particles to collide with the walls twice as often, doubling the measured pressure.",
        "A 2.0 L balloon at 1 atm compressed to 1.0 L volume experiences an internal pressure of 2 atm.",
        "Use an interactive piston to measure pressure changes as volume decreases.",
        { question: "According to Boyle's Law, when the volume of a trapped gas is halved at constant temperature, what happens to its pressure?", choices: ["The pressure doubles (2×)", "The pressure is halved", "The pressure remains unchanged"], answer: "The pressure doubles (2×)" },
        { question: "What is the mathematical equation expressing Boyle's Law?", choices: ["P₁ × V₁ = P₂ × V₂", "P ÷ V = constant", "P + V = 100"], answer: "P₁ × V₁ = P₂ × V₂" },
        { question: "Why does an inflated balloon expand when brought into hot air?", choices: ["Gas particles gain kinetic energy, moving faster and pushing outward more forcefully", "The balloon creates extra gas particles", "The air inside turns into a liquid"], answer: "Gas particles gain kinetic energy, moving faster and pushing outward more forcefully" }
      ),
      buildLesson(
        10,
        "11. Plasma & High-Energy States of Matter",
        "Plasma is the fourth state of matter, formed when gas atoms are superheated and ionized.",
        "Under extreme heat or electrical voltage, electrons are stripped away from atomic nuclei, creating an electrically conductive soup of free electrons and positive ions.",
        "Over 99% of the visible universe is plasma, including the Sun, stars, auroras, and lightning.",
        "Examine the glowing ionized gas filaments inside a high-voltage plasma sphere.",
        { question: "What is plasma in physics and chemistry?", choices: ["An ionized gas containing free electrons and positive ions", "The liquid component of human blood", "Solid matter under extreme freezing"], answer: "An ionized gas containing free electrons and positive ions" },
        { question: "Where is plasma found in nature?", choices: ["In stars, lightning bolts, and auroras", "In ocean deep water", "Inside rock layers underground"], answer: "In stars, lightning bolts, and auroras" },
        { question: "Why is plasma capable of conducting electricity effectively?", choices: ["It contains abundant free-floating charged electrons and ions", "It is very cold", "It has a rigid lattice structure"], answer: "It contains abundant free-floating charged electrons and ions" }
      ),
      buildLesson(
        11,
        "12. Phase Changes in the Water Cycle & Weather",
        "Earth's weather systems and hydrological cycle depend continuously on phase transformations.",
        "Solar radiation evaporates surface ocean water into invisible water vapor. High in the cold troposphere, vapor condenses into clouds, which precipitate as rain, hail, or snow.",
        "Ocean evaporation (liquid → gas) → Cloud condensation (gas → liquid) → Rain precipitation.",
        "Map evaporation, condensation, precipitation, and collection across a mountain watershed.",
        { question: "Which phase changes are responsible for cloud formation in the atmosphere?", choices: ["Evaporation of surface water followed by condensation aloft", "Sublimation followed by melting", "Deposition only"], answer: "Evaporation of surface water followed by condensation aloft" },
        { question: "Why do you feel chilled when stepping out of a swimming pool on a warm windy day?", choices: ["Evaporation is an endothermic process that absorbs heat energy from your skin", "The wind freezes the pool water", "Water blocks all body heat generation"], answer: "Evaporation is an endothermic process that absorbs heat energy from your skin" },
        { question: "How does hail form inside turbulent thunderstorm clouds?", choices: ["Water droplets are repeatedly pushed into freezing upper altitudes by updrafts", "Rain turns directly into gas", "Snow melts instantly into steam"], answer: "Water droplets are repeatedly pushed into freezing upper altitudes by updrafts" }
      ),
    ],
  },

  "Parts of a plant": {
    subject: "Science",
    level: "Grade 5",
    eyebrow: "Roots, stems, and leaves",
    lessons: [
      buildLesson(
        0,
        "1. Overview of Plant Anatomy & Organ Systems",
        "Flowering plants are organized into two primary organ systems: the root system and shoot system.",
        "The subterranean root system anchors the plant and absorbs water/nutrients. The aerial shoot system (stems, leaves, flowers) performs photosynthesis and sexual reproduction.",
        "Roots anchor in soil; stems elevate leaves to sunlight; leaves manufacture sugars; flowers produce seeds.",
        "Explore an anatomical cross-section diagram of a flowering plant.",
        { question: "What are the three main vegetative organs of a flowering plant?", choices: ["Roots, stems, and leaves", "Petals, sepals, and seeds", "Bark, needles, and cones"], answer: "Roots, stems, and leaves" },
        { question: "Which plant organ system is located primarily below ground?", choices: ["Root system", "Shoot system", "Floral system"], answer: "Root system" },
        { question: "What is the primary function of the shoot system?", choices: ["Photosynthesis, reproduction, and food transport", "Absorbing minerals from soil only", "Anchoring into bedrock"], answer: "Photosynthesis, reproduction, and food transport" }
      ),
      buildLesson(
        1,
        "2. Root Systems: Taproots vs Fibrous Roots",
        "Roots anchor plants, prevent soil erosion, and absorb moisture through specialized root hairs.",
        "Taproot systems feature one large primary central root growing deep downwards (e.g. carrots, dandelions). Fibrous root systems consist of dense networks of shallow branched roots (e.g. grasses).",
        "Carrots store carbohydrates in deep taproots; lawn grass uses fibrous roots to carpet topsoil.",
        "Compare the anchoring strength and water absorption profiles of taproot and fibrous root models.",
        { question: "Which type of root system features a single large deep main root (like in a carrot)?", choices: ["Taproot system", "Fibrous root system", "Adventitious root system"], answer: "Taproot system" },
        { question: "Why do grasses have widespread shallow fibrous root systems?", choices: ["To bind topsoil quickly and absorb surface rainwater efficiently", "To drill deep into bedrock", "To store sugar for multiple years"], answer: "To bind topsoil quickly and absorb surface rainwater efficiently" },
        { question: "What microscopic structures on root surfaces dramatically increase water absorption area?", choices: ["Root hairs", "Guard cells", "Xylem stomata"], answer: "Root hairs" }
      ),
      buildLesson(
        2,
        "3. Stems: Support & Vascular Transport",
        "Stems hold foliage up toward the sun and serve as the main highway for fluid transport.",
        "Stems can be flexible and green (herbaceous) or rigid with bark (woody). Inside, vascular bundles carry water and sugars throughout the plant while providing structural support.",
        "Tree trunks produce annual rings of xylem cells, recording one year of growth per ring.",
        "Count the concentric tree rings on a cross-cut log to determine tree age and growth history.",
        { question: "What are the two primary functions of a plant stem?", choices: ["Support leaves toward sunlight and transport fluids", "Produce pollen and ovules", "Absorb minerals directly from air"], answer: "Support leaves toward sunlight and transport fluids" },
        { question: "What do the concentric growth rings in a woody tree trunk represent?", choices: ["Annual layers of xylem tissue produced each growth season", "Layers of dead bark", "Stored sugar reservoirs"], answer: "Annual layers of xylem tissue produced each growth season" },
        { question: "Which type of stem remains green, flexible, and non-woody throughout its life?", choices: ["Herbaceous stem", "Woody trunk", "Taproot stem"], answer: "Herbaceous stem" }
      ),
      buildLesson(
        3,
        "4. Leaf Anatomy: Photosynthesis & Transpiration",
        "Leaves are the primary solar energy collectors and sugar factories of the plant.",
        "Leaves have flat blades (lamina) attached by petioles. The upper epidermis is coated with a waterproof waxy cuticle, while the lower epidermis houses stomata for gas exchange.",
        "Broad oak leaves maximize light capture; needle-like pine leaves conserve water in cold winter winds.",
        "Examine leaf cross-sections showing the palisade mesophyll packed with chloroplasts.",
        { question: "What is the main biological purpose of a broad flat leaf blade?", choices: ["Maximize sunlight absorption for photosynthesis", "Attract pollinators", "Anchor the plant into soil"], answer: "Maximize sunlight absorption for photosynthesis" },
        { question: "What is the waxy, waterproof outer coating on leaves that reduces water loss?", choices: ["Cuticle", "Epidermis", "Stroma"], answer: "Cuticle" },
        { question: "What is the process called when water evaporates from leaf stomata, pulling water up the plant?", choices: ["Transpiration", "Respiration", "Germination"], answer: "Transpiration" }
      ),
      buildLesson(
        4,
        "5. Flower Anatomy: Petals, Stamens & Pistils",
        "Flowers are specialized reproductive shoots designed to facilitate pollination and seed creation.",
        "A complete flower contains four whorls: sepals (protective outer leaves), petals (colorful attractants), stamens (male anther + filament making pollen), and pistils (female stigma, style, and ovary).",
        "Lily flowers showcase prominent yellow anthers dusting pollen and a sticky central stigma.",
        "Dissect a model flower to identify petals, sepals, stamens, anthers, stigma, style, and ovary.",
        { question: "What is the male reproductive part of a flower called?", choices: ["Stamen (anther and filament)", "Pistil (carpel)", "Sepal"], answer: "Stamen (anther and filament)" },
        { question: "Which flower organ produces microscopic pollen grains?", choices: ["Anther", "Stigma", "Ovary"], answer: "Anther" },
        { question: "What is the female reproductive organ of a flower composed of stigma, style, and ovary?", choices: ["Pistil (or carpel)", "Stamen", "Petal"], answer: "Pistil (or carpel)" }
      ),
      buildLesson(
        5,
        "6. Pollination Mechanisms & Fertilization",
        "Pollination transfers pollen grains from male anthers to receptive female stigmas.",
        "Biotic pollination uses bees, hummingbirds, and bats lured by colorful petals and nectar. Abiotic pollination relies on wind currents to carry lightweight pollen to feathery stigmas.",
        "A honeybee collects nectar, transfers pollen to the sticky stigma, and triggers pollen tube growth.",
        "Compare insect-pollinated bright apple blossoms with wind-pollinated wheat grass tassels.",
        { question: "What is pollination?", choices: ["Transfer of pollen from an anther to a receptive stigma", "The sprouting of a seed in soil", "The growth of annual plant rings"], answer: "Transfer of pollen from an anther to a receptive stigma" },
        { question: "Which characteristics are typical of flowers pollinated by bees and butterflies?", choices: ["Brightly colored petals, fragrant scent, and sweet nectar", "Dull green flowers with no scent", "Feathery hanging stigmas only"], answer: "Brightly colored petals, fragrant scent, and sweet nectar" },
        { question: "After a pollen grain lands on the sticky stigma, what structure does it grow down to reach the ovule?", choices: ["A pollen tube", "A root hair", "A xylem vessel"], answer: "A pollen tube" }
      ),
      buildLesson(
        6,
        "7. Seed Structure & Germination Requirements",
        "Seeds contain a dormant embryonic plant and stored food protected by a tough seed coat.",
        "Inside a seed lies the embryo (radicle root and plumule shoot) and cotyledons (seed leaves with stored starch). Germination begins when moisture, oxygen, and warmth break seed dormancy.",
        "A soaked bean seed swells, splits its seed coat, and pushes out the primary root (radicle).",
        "Observe the day-by-day germination sequence of a bean seed sprouting in soil.",
        { question: "What are the three essential environmental conditions required for seed germination?", choices: ["Water, oxygen, and suitable temperature", "Sunlight, soil, and fertilizer", "Pollen, nectar, and wind"], answer: "Water, oxygen, and suitable temperature" },
        { question: "What is the tough outer layer that protects the dormant plant embryo inside a seed?", choices: ["Seed coat (testa)", "Cotyledon", "Radicle"], answer: "Seed coat (testa)" },
        { question: "Which part of the germinating seed embryo emerges first into the soil?", choices: ["The radicle (embryonic root)", "The hypocotyl (shoot)", "The green leaf"], answer: "The radicle (embryonic root)" }
      ),
      buildLesson(
        7,
        "8. Fruit Formation & Seed Dispersal",
        "After fertilization, the flower ovary ripens into a fruit designed to disperse seeds away from the parent.",
        "Fruits protect developing seeds and use diverse dispersal vectors: wind (dandelions), water (coconuts), animal ingestion (berries), animal fur hitchhiking (burrs), or explosive pods (peas).",
        "An apple ovary swells into sweet flesh so animals eat it and deposit seeds in new locations.",
        "Match different seeds and fruits to their evolutionary dispersal mechanisms.",
        { question: "Following successful fertilization, which flower structure develops into the fruit?", choices: ["The ovary", "The petal", "The sepal"], answer: "The ovary" },
        { question: "What is the primary evolutionary purpose of a plant fruit?", choices: ["To protect developing seeds and aid in their dispersal", "To feed the parent plant", "To store extra water for roots"], answer: "To protect developing seeds and aid in their dispersal" },
        { question: "Dandelion seeds possess parachute-like tufts. What dispersal vector do they use?", choices: ["Wind dispersal", "Animal ingestion", "Water flotation"], answer: "Wind dispersal" }
      ),
      buildLesson(
        8,
        "9. Vascular Tissues: Xylem vs Phloem",
        "Plants possess continuous vascular plumbing to distribute water, minerals, and sugars.",
        "Xylem consists of hollow dead tracheid/vessel elements that pull water and minerals UP from roots. Phloem consists of living sieve tubes that transport dissolved sugars BOTH ways.",
        "Xylem = One-way street up for water. Phloem = Two-way highway for photosynthesized sugar sap.",
        "Trace colored dye rising through celery stalks inside distinct xylem vascular bundles.",
        { question: "What does xylem tissue transport, and in what direction?", choices: ["Water and dissolved minerals upward from roots to leaves", "Sugars downward only", "Oxygen horizontally across stems"], answer: "Water and dissolved minerals upward from roots to leaves" },
        { question: "What substance does phloem tissue transport throughout the plant?", choices: ["Dissolved sucrose and organic nutrients (sap)", "Pure rainwater", "Soil rock minerals"], answer: "Dissolved sucrose and organic nutrients (sap)" },
        { question: "Unlike dead hollow xylem vessels, are functional mature phloem sieve cells alive?", choices: ["Yes, phloem cells are living cells supported by companion cells", "No, both xylem and phloem are completely dead", "Only during the winter season"], answer: "Yes, phloem cells are living cells supported by companion cells" }
      ),
      buildLesson(
        9,
        "10. Plant Adaptations to Extreme Environments",
        "Plants have evolved remarkable anatomical structures to thrive in deserts, marshes, and rainforests.",
        "Xerophytes (cacti) feature fleshy water-storing stems and needle spines. Hydrophytes (water lilies) have wide floating leaves with air pockets. Epiphytes grow on tree branches.",
        "Desert saguaro cacti store up to 200 gallons of water in pleated stems during desert rains.",
        "Compare desert cactus spines with tropical rainforest broad drip-tip foliage.",
        { question: "How are desert cacti adapted to survive severe drought?", choices: ["Spines reduce water loss, and thick waxy stems store water", "Massive broad leaves that catch dew", "Deep taproots that reach ocean water"], answer: "Spines reduce water loss, and thick waxy stems store water" },
        { question: "Why do tropical rainforest plants often have drip-tip leaves?", choices: ["To shed heavy rainwater rapidly and prevent mold and fungal growth", "To catch flying insects", "To store water on leaf tops"], answer: "To shed heavy rainwater rapidly and prevent mold and fungal growth" },
        { question: "How do carnivorous plants like Venus flytraps obtain nitrogen in nutrient-poor bogs?", choices: ["By trapping and digesting insects", "By growing longer roots into bedrock", "By performing triple photosynthesis"], answer: "By trapping and digesting insects" }
      ),
      buildLesson(
        10,
        "11. Plants & Soil Conservation (Erosion Prevention)",
        "Plant root networks anchor topsoil, stabilize riverbanks, and prevent desertification.",
        "Roots physically bind loose soil particles together, while foliage breaks the impact of driving rain. Without plant cover, wind and stormwater strip fertile topsoil, leading to gullies.",
        "Mangrove root tangles protect coastal shorelines from storm surges, tidal erosion, and waves.",
        "Test water runoff clarity through soil with grass roots versus bare unvegetated soil.",
        { question: "How do extensive plant root networks protect landscapes from soil erosion?", choices: ["Roots bind soil particles together and anchor the topsoil against wind and runoff", "Plants absorb all incoming wind", "Roots convert topsoil into stone"], answer: "Roots bind soil particles together and anchor the topsoil against wind and runoff" },
        { question: "What happens to topsoil when vast forest areas are clear-cut and left bare?", choices: ["Heavy rains easily wash away fertile topsoil into rivers and lakes", "The soil becomes permanently moist", "New plants grow back instantly overnight"], answer: "Heavy rains easily wash away fertile topsoil into rivers and lakes" },
        { question: "Why do farmers plant cover crops between main harvesting seasons?", choices: ["To prevent wind/water erosion and replenish soil nutrients", "To shade farm machinery", "To dry out the fields completely"], answer: "To prevent wind/water erosion and replenish soil nutrients" }
      ),
      buildLesson(
        11,
        "12. Plant Life Cycles: Annuals, Biennials & Perennials",
        "Plants exhibit distinct life spans and reproductive schedules adapted to seasonal climates.",
        "Annuals complete their entire lifecycle (seed → plant → flower → seed) within one single year. Biennials require two years, flowering in year two. Perennials live and bloom for many years.",
        "Sunflowers and marigolds are annuals; carrots are biennials; oak trees and lavender are perennials.",
        "Track the seasonal life timeline of annual vs. perennial plants over a multi-year calendar.",
        { question: "How long is the life cycle of an annual plant (like wheat, sunflowers, or beans)?", choices: ["One growing season (germinate, flower, seed, and die within 1 year)", "Two complete years", "Many consecutive decades"], answer: "One growing season (germinate, flower, seed, and die within 1 year)" },
        { question: "What characterizes a perennial plant (like oak trees, roses, or lavender)?", choices: ["It lives for more than two years, regrowing each spring", "It dies completely after 6 months", "It flowers only once every 100 years"], answer: "It lives for more than two years, regrowing each spring" },
        { question: "What does a biennial plant (like carrots or foxgloves) do during its first year of growth?", choices: ["Grows leaves, stems, and food storage roots; flowers in year two", "Produces seeds and immediately dies", "Remains entirely dormant underground"], answer: "Grows leaves, stems, and food storage roots; flowers in year two" }
      ),
    ],
  },
};

export function getTopicCurriculum(topicName: string): TopicCurriculum {
  if (TOPIC_CURRICULA[topicName]) {
    return TOPIC_CURRICULA[topicName];
  }

  const subject = "Science & Mathematics";
  const level = "Interactive Curriculum";
  const eyebrow = `Core concepts and mastery of ${topicName}`;

  const subtopicPlans = [
    {
      title: `1. Introduction & Key Foundations of ${topicName}`,
      intro: `Establish essential definitions, foundational vocabulary, and core importance of ${topicName}.`,
      explanation: `Every discipline begins with clear terminology and foundational models. In ${topicName}, understanding core units and basic operations allows learners to build rigorous reasoning step by step.`,
      example: `Foundational rule: Identify the starting conditions and define key variables before solving ${topicName} problems.`,
      activity: `List the three defining characteristics of ${topicName} and verify with the interactive visual model.`,
      q1: { question: `What is the primary foundation of ${topicName}?`, choices: [`Understanding core definitions and basic principles`, "Skipping foundational steps", "Random guessing without definitions"], answer: `Understanding core definitions and basic principles` },
      q2: { question: `Why is foundational terminology critical in ${topicName}?`, choices: ["It provides a precise, shared vocabulary for problem solving", "It has no practical value", "It changes every week"], answer: "It provides a precise, shared vocabulary for problem solving" },
      q3: { question: `When analyzing an unfamiliar problem in ${topicName}, what should you do first?`, choices: ["Identify given values and what you need to find", "Assume the answer is zero", "Stop reading immediately"], answer: "Identify given values and what you need to find" }
    },
    {
      title: `2. Core Principles & Mechanisms of ${topicName}`,
      intro: `Discover the primary rules and governing mechanisms that drive ${topicName}.`,
      explanation: `Systematic behavior in ${topicName} follows consistent rules. Understanding cause-and-effect relationships enables students to predict outcomes and explain how changes in one variable affect the whole system.`,
      example: `Mechanism check: Altering the primary parameter produces a predictable, measurable response in ${topicName}.`,
      activity: `Trace the step-by-step cause-and-effect chain in ${topicName}.`,
      q1: { question: `What governs system behavior in ${topicName}?`, choices: ["Consistent, reproducible principles and rules", "Pure coincidence without patterns", "Arbitrary opinions"], answer: "Consistent, reproducible principles and rules" },
      q2: { question: `How do changes in initial conditions affect outcomes in ${topicName}?`, choices: ["They produce predictable, measurable shifts in results", "They have zero effect", "They randomize all outcomes"], answer: "They produce predictable, measurable shifts in results" },
      q3: { question: `Which method best demonstrates the core mechanism of ${topicName}?`, choices: ["Step-by-step observation and verification", "Ignoring data", "Relying on intuition alone"], answer: "Step-by-step observation and verification" }
    },
    {
      title: `3. Visual & Structural Models of ${topicName}`,
      intro: `Use spatial, structural, and visual representations to deepen conceptual clarity.`,
      explanation: `Visual diagrams, schematic charts, and 2D/3D representations make abstract concepts tangible. Modeling ${topicName} visually allows you to inspect components and spot structural symmetry.`,
      example: `Visual model: A labeled diagram highlights inputs on the left and resulting outputs on the right.`,
      activity: `Interact with the visual sandbox to observe how the structural representation responds.`,
      q1: { question: `How do visual models aid understanding in ${topicName}?`, choices: ["They translate abstract concepts into tangible visual structures", "They make concepts harder to see", "They replace all need for thinking"], answer: "They translate abstract concepts into tangible visual structures" },
      q2: { question: `In a visual model of ${topicName}, what do component labels typically represent?`, choices: ["Key structural elements and functional roles", "Unrelated decorative names", "Random symbols"], answer: "Key structural elements and functional roles" },
      q3: { question: `When interpreting a diagram of ${topicName}, what is the first element to examine?`, choices: ["The legend, axis labels, and key components", "Only the brightest color", "The page margin"], answer: "The legend, axis labels, and key components" }
    },
    {
      title: `4. Step-by-Step Operations & Methods`,
      intro: `Master standard algorithmic workflows and structured operations in ${topicName}.`,
      explanation: `Complex tasks become straightforward when broken down into reliable sequential phases. Learn the standard algorithmic order of operations for solving problems in ${topicName}.`,
      example: `Operation protocol: 1) Identify given info, 2) Choose the appropriate rule, 3) Execute each step systematically.`,
      activity: `Carry out a 3-step operation sequence and check your intermediate results.`,
      q1: { question: `What is the benefit of a systematic step-by-step approach in ${topicName}?`, choices: ["It reduces calculation errors and ensures consistency", "It takes longer with no accuracy benefit", "It eliminates the need to verify answers"], answer: "It reduces calculation errors and ensures consistency" },
      q2: { question: `If you reach an unexpected result in ${topicName}, what should you do?`, choices: ["Trace back through each step to find where the error occurred", "Erase everything and give up", "Change the question"], answer: "Trace back through each step to find where the error occurred" },
      q3: { question: `In a multi-step operation, when should intermediate results be verified?`, choices: ["At each key milestone before proceeding to the next step", "Never until after the exam", "Only at the very start"], answer: "At each key milestone before proceeding to the next step" }
    },
    {
      title: `5. Analyzing Components & Subsystems`,
      intro: `Break down the whole system into functional components and analyze their roles.`,
      explanation: `Systems in ${topicName} consist of interconnected subsystems. By isolating each part, analyzing its individual function, and observing how it interfaces with others, you gain deep diagnostic insight.`,
      example: `Subsystem breakdown: Component A provides inputs, Component B processes them, and Component C yields the final output.`,
      activity: `Identify the primary and secondary components in a standard ${topicName} configuration.`,
      q1: { question: `Why is component analysis valuable in ${topicName}?`, choices: ["It explains how individual parts contribute to overall function", "It is only useful for history", "It proves parts have no relationship"], answer: "It explains how individual parts contribute to overall function" },
      q2: { question: `What happens if a critical subsystem in ${topicName} malfunctions?`, choices: ["The overall system output is degraded or halted", "The system always runs twice as fast", "Nothing changes at all"], answer: "The overall system output is degraded or halted" },
      q3: { question: `How do interconnected subsystems in ${topicName} communicate or interact?`, choices: ["Through shared inputs, energy flows, and feedback loops", "Through complete physical separation", "They never interact"], answer: "Through shared inputs, energy flows, and feedback loops" }
    },
    {
      title: `6. Comparative Analysis & Variations`,
      intro: `Compare different configurations, edge cases, and variations within ${topicName}.`,
      explanation: `Not all scenarios in ${topicName} behave identically. By contrasting standard conditions with extreme or alternative variants, you develop flexible problem-solving ability across diverse contexts.`,
      example: `Comparison: Variant X maximizes speed, whereas Variant Y maximizes efficiency and stability.`,
      activity: `Construct a side-by-side comparison table of two major variations in ${topicName}.`,
      q1: { question: `What is the main goal of comparative analysis in ${topicName}?`, choices: ["To contrast strengths, limitations, and trade-offs of different approaches", "To prove that only one variation exists", "To ignore differences"], answer: "To contrast strengths, limitations, and trade-offs of different approaches" },
      q2: { question: `When selecting between two variations in ${topicName}, what factor is decisive?`, choices: ["The specific constraints and requirements of the problem", "Whichever variation has the longest name", "A coin flip"], answer: "The specific constraints and requirements of the problem" },
      q3: { question: `How do edge cases help test our understanding of ${topicName}?`, choices: ["They reveal system limits and boundary conditions", "They are errors that should always be ignored", "They break all scientific laws permanently"], answer: "They reveal system limits and boundary conditions" }
    },
    {
      title: `7. Quantitative Measurement & Data Analysis`,
      intro: `Measure quantities accurately, track metrics, and interpret numerical data in ${topicName}.`,
      explanation: `Science and mathematics require empirical rigor. Learn how to record units, calculate rates of change, read data charts, and interpret quantitative results in ${topicName}.`,
      example: `Data check: A 20% increase in input yields a proportional 20% increase in output under linear conditions.`,
      activity: `Plot sample data points on an input-output grid and evaluate the trendline.`,
      q1: { question: `Why are precise measurement units essential in quantitative analysis of ${topicName}?`, choices: ["Numbers without units lack physical meaning and cause conversion errors", "Units are purely cosmetic", "Units can be chosen arbitrarily"], answer: "Numbers without units lack physical meaning and cause conversion errors" },
      q2: { question: `What does a linear upward trend on an input-output graph indicate?`, choices: ["A direct proportional relationship between variables", "An inverse relationship", "No relationship whatsoever"], answer: "A direct proportional relationship between variables" },
      q3: { question: `How do repeated measurement trials improve data reliability in ${topicName}?`, choices: ["They minimize random measurement error through averaging", "They change the underlying natural laws", "They make data collection impossible"], answer: "They minimize random measurement error through averaging" }
    },
    {
      title: `8. Common Misconceptions & Error Analysis`,
      intro: `Identify frequent pitfalls, false assumptions, and debugging strategies in ${topicName}.`,
      explanation: `Mastery comes not just from knowing the right answer, but understanding why incorrect answers are tempting. Analyze common beginner traps and learn how to audit your work for subtle errors.`,
      example: `Classic trap: Confusing correlation with causation, or forgetting to balance both sides equally.`,
      activity: `Examine a sample solution with an intentional mistake and pinpoint the exact error step.`,
      q1: { question: `What is the most effective way to prevent common errors in ${topicName}?`, choices: ["Double-check work using verification methods and inverse checks", "Rush through calculations as fast as possible", "Never look back at completed steps"], answer: "Double-check work using verification methods and inverse checks" },
      q2: { question: `If an intermediate step in ${topicName} produces an impossible value, what is the cause?`, choices: ["A calculation error or flawed assumption in earlier steps", "A normal expected occurrence", "The math rules changed"], answer: "A calculation error or flawed assumption in earlier steps" },
      q3: { question: `Why is error analysis a powerful learning technique?`, choices: ["It deepens conceptual understanding by exploring why misconceptions fail", "It only wastes time", "It makes students forget the rules"], answer: "It deepens conceptual understanding by exploring why misconceptions fail" }
    },
    {
      title: `9. Real-World Applications & Case Studies`,
      intro: `Apply concepts of ${topicName} to authentic industrial, scientific, and everyday scenarios.`,
      explanation: `Theory comes to life when applied to real challenges. Examine case studies showing how ${topicName} powers modern technology, environmental solutions, engineering feats, or financial decisions.`,
      example: `Real-world case: Civil engineers utilize ${topicName} principles to design bridges that withstand load stress.`,
      activity: `Brainstorm three everyday technologies that rely on principles of ${topicName}.`,
      q1: { question: `How does studying real-world applications benefit your learning in ${topicName}?`, choices: ["It demonstrates practical relevance and connects theory to practice", "It proves theory is never used in real life", "It makes formulas unnecessary"], answer: "It demonstrates practical relevance and connects theory to practice" },
      q2: { question: `In engineering applications of ${topicName}, what factor must always be incorporated?`, choices: ["Safety margins and environmental constraints", "Ignoring all physical limits", "Purely theoretical assumptions"], answer: "Safety margins and environmental constraints" },
      q3: { question: `Which career field directly applies principles of ${topicName}?`, choices: ["Science, technology, engineering, and mathematics (STEM)", "Only medieval history", "Astrology"], answer: "Science, technology, engineering, and mathematics (STEM)" }
    },
    {
      title: `10. Advanced Problem Solving Strategies`,
      intro: `Tackle non-routine, multi-layered challenges using heuristic reasoning and decomposition.`,
      explanation: `When direct formulas are insufficient, advanced problem solvers use heuristics: working backwards, solving simpler sub-problems, changing representations, or testing extreme boundary values.`,
      example: `Strategy: Break a complex scenario into three independent, manageable sub-problems.`,
      activity: `Apply the 'work backwards from the target solution' heuristic to a challenge problem.`,
      q1: { question: `What is an effective strategy for tackling complex problems in ${topicName}?`, choices: ["Decompose the large problem into smaller, solvable sub-problems", "Try random guesses until something works", "Wait for someone else to solve it"], answer: "Decompose the large problem into smaller, solvable sub-problems" },
      q2: { question: `How does working backwards help solve certain problems in ${topicName}?`, choices: ["It clarifies the necessary preconditions by starting from the desired goal", "It reverses the laws of nature", "It makes steps unnecessary"], answer: "It clarifies the necessary preconditions by starting from the desired goal" },
      q3: { question: `What should you do if an initial problem-solving strategy hits a dead end?`, choices: ["Switch to an alternative representation or complementary method", "Keep repeating the exact same failed step", "Conclude that no answer exists"], answer: "Switch to an alternative representation or complementary method" }
    },
    {
      title: `11. Interdisciplinary Connections & Future Frontiers`,
      intro: `Explore how ${topicName} links to other domains and cutting-edge discoveries.`,
      explanation: `No subject exists in isolation. Discover how ${topicName} interfaces with computing, biology, physics, economics, and emerging technological developments.`,
      example: `Connection: Computational algorithms model ${topicName} at scales impossible with pen and paper.`,
      activity: `Identify an overlap where ${topicName} intersects with computer science or modern ecology.`,
      q1: { question: `How does ${topicName} connect with modern computational technology?`, choices: ["Algorithms and simulations model complex systems with high precision", "Computers cannot process scientific models", "Technology has no relation to mathematics"], answer: "Algorithms and simulations model complex systems with high precision" },
      q2: { question: `Why are interdisciplinary skills increasingly valued in fields related to ${topicName}?`, choices: ["Real-world challenges require integrating insights from multiple disciplines", "Single subjects are completely obsolete", "It is easier to guess across many subjects"], answer: "Real-world challenges require integrating insights from multiple disciplines" },
      q3: { question: `What role does ongoing research play in the field of ${topicName}?`, choices: ["It discovers new efficiencies, deeper models, and novel applications", "It proves all previous knowledge was 100% false", "Research ended a century ago"], answer: "It discovers new efficiencies, deeper models, and novel applications" }
    },
    {
      title: `12. Synthesis, Comprehensive Review & Mastery`,
      intro: `Synthesize all 11 prior subtopics into a unified conceptual framework of complete mastery.`,
      explanation: `True mastery means effortlessly connecting foundations, mechanisms, operational methods, and problem-solving strategies. Review key formulas, self-test core concepts, and demonstrate fluency.`,
      example: `Mastery synthesis: Formulate a complete solution from initial problem diagnosis to final verified result.`,
      activity: `Complete the final comprehensive challenge check to test your full topic mastery.`,
      q1: { question: `What represents true mastery in ${topicName}?`, choices: ["The ability to connect concepts, solve varied problems, and justify solutions", "Memorizing answers without understanding", "Solving only one specific type of question"], answer: "The ability to connect concepts, solve varied problems, and justify solutions" },
      q2: { question: `How should you verify your final result on a mastery assessment?`, choices: ["Check dimensional units, test edge cases, and perform inverse calculations", "Ask if the number looks pretty", "Never check completed work"], answer: "Check dimensional units, test edge cases, and perform inverse calculations" },
      q3: { question: `Congratulations on completing all 12 lessons in ${topicName}! What is your best next step?`, choices: ["Apply these skills to practical projects and further curriculum topics", "Forget everything immediately", "Stop learning new subjects"], answer: "Apply these skills to practical projects and further curriculum topics" }
    }
  ];

  const lessons: DetailedLesson[] = subtopicPlans.map((plan, idx) =>
    buildLesson(
      idx,
      plan.title,
      plan.intro,
      plan.explanation,
      plan.example,
      plan.activity,
      { ...plan.q1, choices: plan.q1.choices as [string, string, string] },
      { ...plan.q2, choices: plan.q2.choices as [string, string, string] },
      { ...plan.q3, choices: plan.q3.choices as [string, string, string] }
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

export function isPredefinedTopic(topicName?: string | null): boolean {
  if (!topicName) return false;
  const normalized = topicName.trim().toLowerCase();
  return Object.keys(TOPIC_CURRICULA).some(
    (k) => k.toLowerCase() === normalized
  );
}

export function getExactPredefinedTopicName(topicName?: string | null): string | null {
  if (!topicName) return null;
  const normalized = topicName.trim().toLowerCase();
  const match = Object.keys(TOPIC_CURRICULA).find(
    (k) => k.toLowerCase() === normalized
  );
  return match ?? null;
}

export interface PredefinedLessonItem {
  id: number;
  lessonNumber: number;
  lessonIndex: number;
  title: string;
  topic: string;
  subject: string;
  level: string;
  intro: string;
}

export function getAllPredefinedLessons(): PredefinedLessonItem[] {
  const items: PredefinedLessonItem[] = [];
  for (const [topicName, curr] of Object.entries(TOPIC_CURRICULA)) {
    curr.lessons.forEach((lesson, idx) => {
      items.push({
        id: lesson.id,
        lessonNumber: idx + 1,
        lessonIndex: idx,
        title: lesson.title,
        topic: topicName,
        subject: curr.subject,
        level: curr.level,
        intro: lesson.intro,
      });
    });
  }
  return items;
}

