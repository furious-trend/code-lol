export interface FallbackRoast {
  roast: string;
  fix: string;
  mood: string;
  gifKeyword: string;
  errorType?: 'syntax' | 'runtime' | 'logic';
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
  // Syntax Errors
  {
    roast: "Oru semicolon-ah poda theriyaadha loosu... compiler-e un laptop-ah thooki kuththu-kallu mela adichu unniyoda Aadhar card-ah block panruvan!",
    fix: "Check your syntax, semicolon or brackets.",
    mood: "facepalm",
    gifKeyword: "vadivelu angry",
    errorType: 'syntax'
  },
  {
    roast: "Bracket close panna theriyaadha mandaya... un code-ah paathu C++ language-e innaiku 5th floor-la irundhu kudhichi suicide pannikum!",
    fix: "Close all brackets properly.",
    mood: "dead",
    gifKeyword: "tamil crying meme",
    errorType: 'syntax'
  },
  {
    roast: "Spelling mistake-la kooda oru alavu irukku da... terminal-e unaku 'LKG A, B, C' primer text book-ah thooki anuppirum!",
    fix: "Fix your typos.",
    mood: "disaster",
    gifKeyword: "vadivelu facepalm",
    errorType: 'syntax'
  },
  {
    roast: "Code start aagurathukku munnadiye... un computer ehh 'Enna da ivanuku ithu kooda theriyaala' shutdown panirum",
    fix: "Basic syntax check needed.",
    mood: "done",
    gifKeyword: "computer crash meme",
    errorType: 'syntax'
  },
  // Runtime Errors
  {
    roast: "Aaramikumpodhu sema mass-ah Anirudh BGM odum... aana pathila watermelon star akitiya da.",
    fix: "Check for runtime exceptions.",
    mood: "screaming",
    gifKeyword: "vadivelu screaming",
    errorType: 'runtime'
  },
  {
    roast: "Padayappa style-la mass entry... aana climax-la Kaipulla maari thidirnu code crash aagi un screen-e unna paathu ennake sirippu varthu!",
    fix: "Prevent code crash during execution.",
    mood: "crying_laughing",
    gifKeyword: "kaipulla meme",
    errorType: 'runtime'
  },
  {
    roast: "Nalla gethu-ah pona ipo vetha poche kumaru",
    fix: "Make sure all variables are defined.",
    mood: "mind_blown",
    gifKeyword: "tamil comedy confused",
    errorType: 'runtime'
  },
  // Logic Errors
  {
    roast: "katuna college fees lu arumaiya program paniruka da ",
    fix: "Check your logic.",
    mood: "facepalm",
    gifKeyword: "tamil sad",
    errorType: 'logic'
  },
  {
    roast: "Compiler 'Green light' kaatuvan... aana result-ah paartha, 'Dei, un moolai-la pootile irukka' nu un laptop-e blue screen aagi sethurum!",
    fix: "Logic is completely flawed.",
    mood: "dead",
    gifKeyword: "blue screen fail",
    errorType: 'logic'
  },
  {
    roast: "katuna college fees ku naalu cow vangirukalam da ",
    fix: "Rewrite the logic from scratch.",
    mood: "disaster",
    gifKeyword: "vadivelu done meme",
    errorType: 'logic'
  },

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
    roast: "Bloody sweet... output vandhuruchu da!",
    fix: "",
    mood: "party",
    gifKeyword: "leo bloody sweet"
  },
  {
    roast: "Appa, unga pulla urupputturuchu pa!",
    fix: "",
    mood: "relief",
    gifKeyword: "tamil happy dad"
  },
  {
    roast: "Naangalaam coding poda koodadha da?!",
    fix: "",
    mood: "genius",
    gifKeyword: "vadivelu gethu"
  },
  {
    roast: "Chellam... andha bug sethurchu chellam!",
    fix: "",
    mood: "done",
    gifKeyword: "ghilli chellam"
  },
  {
    roast: "Evvalavo pannittom, idhu jujubi matter!",
    fix: "",
    mood: "mind_blown",
    gifKeyword: "jujubi matter"
  },
  {
    roast: "Aahaan! Ippo pesunga da paapom!",
    fix: "",
    mood: "party",
    gifKeyword: "tamil success attitude"
  },
  {
    roast: "College Fees-ku nyaayam kedachuruchu ma!",
    fix: "",
    mood: "relief",
    gifKeyword: "tamil happy relief"
  },
  {
    roast: "Compiler bayandhuduchu, namma thaan Leo!",
    fix: "",
    mood: "genius",
    gifKeyword: "leo das mass"
  },
  {
    roast: "Coding-la namma Red Dragon da!",
    fix: "",
    mood: "party",
    gifKeyword: "red dragon mass"
  },
  {
    roast: "Enakkum output vandhuruchu... vandhuruchu da!",
    fix: "",
    mood: "relief",
    gifKeyword: "vadivelu crying happy"
  },
  {
    roast: "Evvalo pannittom, idha panna maattoma?!",
    fix: "",
    mood: "mind_blown",
    gifKeyword: "tamil confidence meme"
  },
  {
    roast: "Andha bayam irukkanum da terminal-ku!",
    fix: "",
    mood: "done",
    gifKeyword: "bayam irukkanum mass"
  },
  {
    roast: "Singam single-ah vandhu run panniruchu!",
    fix: "",
    mood: "happy",
    gifKeyword: "singam single mass"
  }
];

export function getRandomFallback(isSuccess: boolean, humorPref: 'general' | 'tamil' = 'general', errorType?: 'syntax' | 'runtime' | 'logic'): FallbackRoast {
  const isTamil = humorPref === 'tamil';
  
  if (isSuccess) {
    const list = isTamil ? tamilProudFallbacks : generalProudFallbacks;
    return list[Math.floor(Math.random() * list.length)];
  } else {
    let list = isTamil ? tamilRoastFallbacks : generalRoastFallbacks;
    if (errorType) {
      const filteredList = list.filter(r => r.errorType === errorType);
      if (filteredList.length > 0) {
        list = filteredList;
      }
    }
    return list[Math.floor(Math.random() * list.length)];
  }
}
