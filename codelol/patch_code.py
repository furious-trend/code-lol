import sys
import re

filename = "lib/fallbackRoasts.ts"
with open(filename, "r") as f:
    content = f.read()

# Update the interface
content = content.replace(
    """export interface FallbackRoast {
  roast: string;
  fix: string;
  mood: string;
  gifKeyword: string;
}""",
    """export interface FallbackRoast {
  roast: string;
  fix: string;
  mood: string;
  gifKeyword: string;
  errorType?: 'syntax' | 'runtime' | 'logic';
}"""
)

# Insert the new roasts into tamilRoastFallbacks
new_roasts = """  // Syntax Errors
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
"""

content = content.replace("export const tamilRoastFallbacks: FallbackRoast[] = [", "export const tamilRoastFallbacks: FallbackRoast[] = [\n" + new_roasts)

# Update getRandomFallback
old_function = """export function getRandomFallback(isSuccess: boolean, humorPref: 'general' | 'tamil' = 'general'): FallbackRoast {
  const isTamil = humorPref === 'tamil';
  
  if (isSuccess) {
    const list = isTamil ? tamilProudFallbacks : generalProudFallbacks;
    return list[Math.floor(Math.random() * list.length)];
  } else {
    const list = isTamil ? tamilRoastFallbacks : generalRoastFallbacks;
    return list[Math.floor(Math.random() * list.length)];
  }
}"""

new_function = """export function getRandomFallback(isSuccess: boolean, humorPref: 'general' | 'tamil' = 'general', errorType?: 'syntax' | 'runtime' | 'logic'): FallbackRoast {
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
}"""

content = content.replace(old_function, new_function)

with open(filename, "w") as f:
    f.write(content)

print("Code Patched")
