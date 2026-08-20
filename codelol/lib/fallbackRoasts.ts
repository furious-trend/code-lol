export interface FallbackRoast {
  roast: string;
  fix: string;
  mood: string;
  gifKeyword: string;
}

export const fallbackRoasts: FallbackRoast[] = [
  // Syntax Errors
  {
    roast: "Missing a bracket? It's like leaving the front door wide open and wondering why it's cold.",
    fix: "Double-check your parentheses, brackets, and braces.",
    mood: "facepalm",
    gifKeyword: "facepalm meme"
  },
  {
    roast: "This syntax is more tangled than the headphones in my pocket.",
    fix: "Look for missing quotes, commas, or semicolons on the line before the error.",
    mood: "dead",
    gifKeyword: "confused meme"
  },
  {
    roast: "A typo in a keyword? It's like calling your teacher 'Mom'.",
    fix: "Check your spelling for built-in functions like console.log.",
    mood: "crying_laughing",
    gifKeyword: "laughing fail"
  },
  {
    roast: "Your code is missing punctuation like a text from my ex.",
    fix: "Add the missing punctuation mark indicated in the error message.",
    mood: "disaster",
    gifKeyword: "disaster meme"
  },
  {
    roast: "Unexpected token? Your code just brought a knife to a pillow fight.",
    fix: "You placed a symbol or word where JavaScript didn't expect one.",
    mood: "screaming",
    gifKeyword: "screaming meme"
  },

  // Logic Errors (e.g. undefined, null)
  {
    roast: "Reading properties of undefined is like asking a ghost for a high five.",
    fix: "Make sure your variable is actually initialized before using it.",
    mood: "mind_blown",
    gifKeyword: "ghost meme"
  },
  {
    roast: "Variable is not defined. Did you expect it to magically appear out of thin air?",
    fix: "Declare the variable using let or const before referencing it.",
    mood: "facepalm",
    gifKeyword: "magic fail"
  },
  {
    roast: "An infinite loop? Thanks, I didn't need my CPU anyway.",
    fix: "Ensure your loop has a clear exit condition that actually gets met.",
    mood: "dead",
    gifKeyword: "fire laptop"
  },
  {
    roast: "Returning undefined from a function is like handing someone an empty pizza box.",
    fix: "Check if your function has a valid return statement.",
    mood: "done",
    gifKeyword: "empty box meme"
  },
  {
    roast: "Comparing numbers with strings? Are you comparing apples to slightly different apples?",
    fix: "Use === instead of ==, or convert your types properly.",
    mood: "screaming",
    gifKeyword: "confused math"
  },

  // Code Works but it's a "success" fallback just in case we need it
  {
    roast: "Code works perfectly. I'd roast you, but honestly, I'm just proud.",
    fix: "Keep doing what you're doing.",
    mood: "relief",
    gifKeyword: "proud meme"
  },
  {
    roast: "No errors? You must have copy-pasted this from StackOverflow.",
    fix: "Write it yourself next time!",
    mood: "genius",
    gifKeyword: "genius hacker"
  },
  {
    roast: "It runs! I'm legitimately shocked. Good job, I guess?",
    fix: "No fix needed, bask in the glory.",
    mood: "mind_blown",
    gifKeyword: "shocked meme"
  },
  {
    roast: "Flawless execution. Are you secretly a senior dev in disguise?",
    fix: "Time for a promotion.",
    mood: "party",
    gifKeyword: "party celebration"
  },
  {
    roast: "You passed all tests on the first try. Who are you, John Carmack?",
    fix: "You've ascended past mortal coding.",
    mood: "happy",
    gifKeyword: "epic win"
  }
];

export function getRandomFallback(isSuccess: boolean): FallbackRoast {
  if (isSuccess) {
    const successRoasts = fallbackRoasts.slice(10, 15);
    return successRoasts[Math.floor(Math.random() * successRoasts.length)];
  } else {
    const errorRoasts = fallbackRoasts.slice(0, 10);
    return errorRoasts[Math.floor(Math.random() * errorRoasts.length)];
  }
}
