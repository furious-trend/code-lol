export interface FallbackRoast {
  roast: string;
  fix: string;
  mood: string;
  gifKeyword: string;
}

export const generalRoastFallbacks: FallbackRoast[] = [
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
  }
];

export const generalProudFallbacks: FallbackRoast[] = [
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

export const tamilRoastFallbacks: FallbackRoast[] = [
  {
    roast: "Enna kodumai sir idhu! This syntax error is like Vadivelu's Nesamani head getting hit by a hammer.",
    fix: "Double-check your brackets or semi-colons.",
    mood: "facepalm",
    gifKeyword: "vadivelu facepalm"
  },
  {
    roast: "Avaru yaaru nu theriyuma? Variable not defined nu varudhu... just like a ghost in a Muni movie.",
    fix: "Declare your variable properly.",
    mood: "dead",
    gifKeyword: "tamil comedy confused"
  },
  {
    roast: "Expected a token but found nothing. This is like waiting for a twist in a Tamil serial—it never comes!",
    fix: "Check for missing characters.",
    mood: "disaster",
    gifKeyword: "tamil crying meme"
  },
  {
    roast: "Null reference! Idhuku dhan Billa madhiri plan pannanum, aana Neenga Naai Sekar madhiri sothappitingale.",
    fix: "Ensure variables are initialized before use.",
    mood: "screaming",
    gifKeyword: "vadivelu screaming"
  },
  {
    roast: "Infinite loop ah? Idhu Rajini padathula vara punch dialogue madhiri... mudiyave mudiyadhu!",
    fix: "Check your loop termination condition.",
    mood: "mind_blown",
    gifKeyword: "rajini style meme"
  },
  {
    roast: "You missed a bracket. Aiyayo, idhu Sivaji the Boss level mistake ache!",
    fix: "Check for unclosed brackets or parentheses.",
    mood: "facepalm",
    gifKeyword: "sivaji meme"
  },
  {
    roast: "Undefined property? Idhellam oru thappa... adangommala, run panna vechitiye!",
    fix: "Check your object property names.",
    mood: "done",
    gifKeyword: "vadivelu done meme"
  },
  {
    roast: "Type error! You are mixing strings and numbers like they are sambar and rasam. Don't do that!",
    fix: "Verify you are using the correct types.",
    mood: "crying_laughing",
    gifKeyword: "tamil laughing fail"
  },
  {
    roast: "Console.log misspelled? Aaha, ipadi oru uruttu urutturiye pa, idhu Baasha level flash back kekudhe!",
    fix: "Fix spelling in built-in functions.",
    mood: "dead",
    gifKeyword: "baasha meme"
  },
  {
    roast: "ReferenceError! Naan oru thadava sonna nooru thadava sonna madhiri... declare your variables!",
    fix: "Ensure variables are defined before using them.",
    mood: "screaming",
    gifKeyword: "punch dialogue fail"
  }
];

export const tamilProudFallbacks: FallbackRoast[] = [
  {
    roast: "Adade! First try pass. Idhu thalapathy intro song level mass!",
    fix: "Zero bugs, 100% mass.",
    mood: "party",
    gifKeyword: "thalapathy mass dance"
  },
  {
    roast: "Code runs flawlessly. Neenga oru raththam therikka therikka code pandra don thambi!",
    fix: "The compiler is terrified of your power.",
    mood: "genius",
    gifKeyword: "tamil don meme"
  },
  {
    roast: "Zero errors! Thalaivaa, neenga vera ragam, vera level!",
    fix: "Just keep being awesome.",
    mood: "happy",
    gifKeyword: "rajini salute"
  },
  {
    roast: "Orey run la full success. Indha vishayatha Billa kittaye solli mass pannanum!",
    fix: "Perfect execution.",
    mood: "mind_blown",
    gifKeyword: "billa style"
  },
  {
    roast: "Code executed perfectly! Singam kooda thaniya varum, aana unga code error illama varudhu.",
    fix: "Roar like a lion.",
    mood: "relief",
    gifKeyword: "surya singam roar"
  },
  {
    roast: "Aaha, enna oru logic! Padayappa padathula vara Neelambari mathiri getha irukku.",
    fix: "Absolute pure logic.",
    mood: "party",
    gifKeyword: "ramyakrishnan gethu"
  },
  {
    roast: "Semma! Your code runs like a perfectly timed Anirudh BGM.",
    fix: "Feel the background score.",
    mood: "happy",
    gifKeyword: "anirudh bgm vibe"
  },
  {
    roast: "Sathiyama solren, idha paatha apdiye thillalangadi thillalangadi nu aada thonudhu!",
    fix: "Celebrate the zero errors.",
    mood: "party",
    gifKeyword: "vadivelu dance happy"
  },
  {
    roast: "You wrote this? Idhu oru blockbuster hit padam madhiri pakka commercial success!",
    fix: "Hit record shattered.",
    mood: "genius",
    gifKeyword: "blockbuster success tamil"
  },
  {
    roast: "Kabali da! Your output is absolute fire.",
    fix: "Next level coding.",
    mood: "mind_blown",
    gifKeyword: "kabali fire swag"
  }
];

export function getRandomFallback(isSuccess: boolean, humorPref: 'general' | 'tamil' = 'general'): FallbackRoast {
  const isTamil = humorPref === 'tamil';
  
  if (isSuccess) {
    const list = isTamil ? tamilProudFallbacks : generalProudFallbacks;
    return list[Math.floor(Math.random() * list.length)];
  } else {
    const list = isTamil ? tamilRoastFallbacks : generalRoastFallbacks;
    return list[Math.floor(Math.random() * list.length)];
  }
}
