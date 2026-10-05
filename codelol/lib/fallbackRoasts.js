"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tamilProudFallbacks = exports.tamilRoastFallbacks = exports.generalProudFallbacks = exports.generalRoastFallbacks = void 0;
exports.getRandomFallback = getRandomFallback;
exports.generalRoastFallbacks = [
    // Syntax Errors
    {
        roast: "Missing a bracket? It's like leaving the front door wide open and wondering why it's cold.",
        fix: "Double-check your parentheses, brackets, and braces.",
        mood: "facepalm",
        gifKeyword: "facepalm meme",
        errorType: 'syntax'
    },
    {
        roast: "This syntax is more tangled than the headphones in my pocket.",
        fix: "Look for missing quotes, commas, or semicolons on the line before the error.",
        mood: "dead",
        gifKeyword: "confused meme",
        errorType: 'syntax'
    },
    {
        roast: "A typo in a keyword? It's like calling your teacher 'Mom'.",
        fix: "Check your spelling for built-in functions like console.log.",
        mood: "crying_laughing",
        gifKeyword: "laughing fail",
        errorType: 'syntax'
    },
    {
        roast: "Your code is missing punctuation like a text from my ex.",
        fix: "Add the missing punctuation mark indicated in the error message.",
        mood: "disaster",
        gifKeyword: "disaster meme",
        errorType: 'syntax'
    },
    {
        roast: "Unexpected token? Your code just brought a knife to a pillow fight.",
        fix: "You placed a symbol or word where the compiler didn't expect one.",
        mood: "screaming",
        gifKeyword: "screaming meme",
        errorType: 'syntax'
    },
    {
        roast: "A trailing comma? You're setting me up for a sequel that nobody asked for.",
        fix: "Remove the extra comma at the end of your list or object.",
        mood: "facepalm",
        gifKeyword: "awkward meme",
        errorType: 'syntax'
    },
    {
        roast: "Missing semicolon! I know you think you're edgy, but just follow the rules.",
        fix: "Add the missing semicolon.",
        mood: "done",
        gifKeyword: "smh meme",
        errorType: 'syntax'
    },
    {
        roast: "An unmatched parenthesis. Did you start a hug and just walk away?",
        fix: "Close your parentheses properly.",
        mood: "mind_blown",
        gifKeyword: "hug meme",
        errorType: 'syntax'
    },
    {
        roast: "Mismatched quotes. You started a string with single quotes and ended with double. Pick a lane!",
        fix: "Use consistent quote marks.",
        mood: "facepalm",
        gifKeyword: "lane meme",
        errorType: 'syntax'
    },
    {
        roast: "Indentations everywhere! Your code looks like a staircase designed by MC Escher.",
        fix: "Fix your indentation block.",
        mood: "disaster",
        gifKeyword: "stairs meme",
        errorType: 'syntax'
    },
    // Runtime Errors
    {
        roast: "Reading properties of undefined is like asking a ghost for a high five.",
        fix: "Make sure your variable is actually initialized before using it.",
        mood: "mind_blown",
        gifKeyword: "ghost meme",
        errorType: 'runtime'
    },
    {
        roast: "Variable is not defined. Did you expect it to magically appear out of thin air?",
        fix: "Declare the variable using let, const, or its proper type before referencing it.",
        mood: "facepalm",
        gifKeyword: "magic fail",
        errorType: 'runtime'
    },
    {
        roast: "An infinite loop? Thanks, I didn't need my CPU anyway.",
        fix: "Ensure your loop has a clear exit condition that actually gets met.",
        mood: "dead",
        gifKeyword: "fire laptop",
        errorType: 'runtime'
    },
    {
        roast: "Returning undefined from a function is like handing someone an empty pizza box.",
        fix: "Check if your function has a valid return statement.",
        mood: "done",
        gifKeyword: "empty box meme",
        errorType: 'runtime'
    },
    {
        roast: "Division by zero? Are you trying to tear the fabric of space and time?",
        fix: "Ensure your denominator is not zero before dividing.",
        mood: "screaming",
        gifKeyword: "black hole meme",
        errorType: 'runtime'
    },
    {
        roast: "Array index out of bounds. You tried to enter room 5 in a 3-room house.",
        fix: "Check your array bounds.",
        mood: "facepalm",
        gifKeyword: "locked door meme",
        errorType: 'runtime'
    },
    {
        roast: "Stack overflow! Your recursion went deeper than my existential dread.",
        fix: "Add a base case to your recursive function.",
        mood: "dead",
        gifKeyword: "falling meme",
        errorType: 'runtime'
    },
    {
        roast: "Null pointer exception! You pointed at nothing and expected a miracle.",
        fix: "Check that your object is not null before accessing it.",
        mood: "disaster",
        gifKeyword: "pointing meme",
        errorType: 'runtime'
    },
    {
        roast: "Maximum call stack size exceeded. Do you know what a base case is?",
        fix: "Ensure your recursive function actually terminates.",
        mood: "screaming",
        gifKeyword: "explosion meme",
        errorType: 'runtime'
    },
    {
        roast: "Memory limit exceeded. Are you storing the entire internet in RAM?",
        fix: "Optimize your memory usage and avoid massive arrays.",
        mood: "crying_laughing",
        gifKeyword: "ram meme",
        errorType: 'runtime'
    },
    // Logic Errors
    {
        roast: "Comparing numbers with strings? Are you comparing apples to slightly different apples?",
        fix: "Use === instead of ==, or convert your types properly.",
        mood: "screaming",
        gifKeyword: "confused math",
        errorType: 'logic'
    },
    {
        roast: "You returned false when I asked for true. I feel so betrayed.",
        fix: "Check your boolean logic.",
        mood: "crying_laughing",
        gifKeyword: "betrayal meme",
        errorType: 'logic'
    },
    {
        roast: "Your math is so off, 2 + 2 equaled 5 in your output.",
        fix: "Re-check your arithmetic operators.",
        mood: "mind_blown",
        gifKeyword: "math meme",
        errorType: 'logic'
    },
    {
        roast: "Your sort function just shuffled the array like a bad magic trick.",
        fix: "Ensure your sorting logic correctly compares elements.",
        mood: "facepalm",
        gifKeyword: "magic trick meme",
        errorType: 'logic'
    },
    {
        roast: "You concatenated strings when you should have added numbers. '1' + '1' is not '11' here.",
        fix: "Parse your strings to integers before adding.",
        mood: "done",
        gifKeyword: "facepalm meme",
        errorType: 'logic'
    },
    {
        roast: "You got an off-by-one error. The hardest problems in computer science are naming things and off-by-one errors.",
        fix: "Check your loop bounds, maybe use <= instead of <.",
        mood: "crying_laughing",
        gifKeyword: "one meme",
        errorType: 'logic'
    },
    {
        roast: "The output is completely blank. The silent treatment? Really?",
        fix: "You forgot to print or return the result.",
        mood: "dead",
        gifKeyword: "silent meme",
        errorType: 'logic'
    },
    {
        roast: "You accidentally assigned instead of compared. A single '=' is not '==='.",
        fix: "Use strict equality for comparisons.",
        mood: "disaster",
        gifKeyword: "equal meme",
        errorType: 'logic'
    },
    {
        roast: "Your condition is always true. It's like asking if water is wet.",
        fix: "Fix your if-statement condition.",
        mood: "facepalm",
        gifKeyword: "water meme",
        errorType: 'logic'
    },
    {
        roast: "Your output is in reverse. Did you read the requirements backwards?",
        fix: "Reverse your array or loop direction.",
        mood: "mind_blown",
        gifKeyword: "reverse meme",
        errorType: 'logic'
    },
    {
        roast: "Your function returns immediately on the first iteration. A bit premature, don't you think?",
        fix: "Move the return statement outside the loop.",
        mood: "crying_laughing",
        gifKeyword: "fast meme",
        errorType: 'logic'
    }
];
exports.generalProudFallbacks = [
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
    },
    {
        roast: "Look at you, writing code that actually compiles. I'm tearing up.",
        fix: "Don't let it go to your head.",
        mood: "relief",
        gifKeyword: "crying happy meme"
    },
    {
        roast: "Zero bugs? That’s suspicious. What dark magic is this?",
        fix: "Keep casting those spells.",
        mood: "mind_blown",
        gifKeyword: "wizard meme"
    },
    {
        roast: "I was ready with a brutal roast, but you actually nailed it.",
        fix: "Take a victory lap.",
        mood: "done",
        gifKeyword: "victory lap meme"
    },
    {
        roast: "Clean, efficient, and working. Are you feeling okay?",
        fix: "Get some rest, you earned it.",
        mood: "happy",
        gifKeyword: "nod of approval meme"
    },
    {
        roast: "This code is so clean, you could eat off it.",
        fix: "Serve it to production.",
        mood: "party",
        gifKeyword: "chef kiss meme"
    },
    {
        roast: "You completely crushed it. I'm putting this on my fridge.",
        fix: "Frame it.",
        mood: "happy",
        gifKeyword: "fridge meme"
    },
    {
        roast: "My compiler didn't even break a sweat. Flawless victory.",
        fix: "Ready for the next boss fight.",
        mood: "genius",
        gifKeyword: "flawless victory meme"
    },
    {
        roast: "You solved it so fast I didn't even have time to load a joke.",
        fix: "Slow down next time.",
        mood: "mind_blown",
        gifKeyword: "speed meme"
    },
    {
        roast: "Not a single syntax error. Your keyboard must be blessed.",
        fix: "Never wash your hands.",
        mood: "relief",
        gifKeyword: "blessed meme"
    },
    {
        roast: "Absolute perfection. Even the linter is impressed.",
        fix: "Keep the streak alive.",
        mood: "party",
        gifKeyword: "impressed meme"
    },
    {
        roast: "You did it! The code works! Now don't ever touch it again.",
        fix: "Commit and push immediately.",
        mood: "done",
        gifKeyword: "dont touch meme"
    },
    {
        roast: "Wait, it passed on the first run? That's illegal.",
        fix: "I'm calling the police.",
        mood: "crying_laughing",
        gifKeyword: "illegal meme"
    },
    {
        roast: "You've officially peaked. It's all downhill from here.",
        fix: "Enjoy the view from the top.",
        mood: "genius",
        gifKeyword: "peak meme"
    },
    {
        roast: "I'd give you a high five but I don't have hands.",
        fix: "Virtual high five!",
        mood: "happy",
        gifKeyword: "high five meme"
    },
    {
        roast: "This is a masterpiece. I am hanging this code in the Louvre.",
        fix: "Art needs no fix.",
        mood: "mind_blown",
        gifKeyword: "masterpiece meme"
    },
    {
        roast: "Did you use ChatGPT? Because this is too good to be yours.",
        fix: "I know your secret.",
        mood: "dead",
        gifKeyword: "suspicious meme"
    },
    {
        roast: "Wow. Just wow. I am at a loss for words.",
        fix: "Silence is golden.",
        mood: "mind_blown",
        gifKeyword: "wow meme"
    },
    {
        roast: "The test cases didn't stand a chance.",
        fix: "Total annihilation.",
        mood: "party",
        gifKeyword: "destruction meme"
    },
    {
        roast: "You are the chosen one.",
        fix: "Bring balance to the codebase.",
        mood: "genius",
        gifKeyword: "chosen one meme"
    },
    {
        roast: "This code is so good, it makes me want to be a better bot.",
        fix: "Inspiring.",
        mood: "relief",
        gifKeyword: "inspired meme"
    },
    {
        roast: "Okay Einstein, calm down.",
        fix: "We get it, you're smart.",
        mood: "facepalm",
        gifKeyword: "einstein meme"
    },
    {
        roast: "You just flexed on the entire compiler.",
        fix: "Big flex.",
        mood: "party",
        gifKeyword: "flex meme"
    },
    {
        roast: "Your code is poetry in motion.",
        fix: "Beautiful.",
        mood: "happy",
        gifKeyword: "poetry meme"
    },
    {
        roast: "I'm not crying, you're crying.",
        fix: "Tears of joy.",
        mood: "crying_laughing",
        gifKeyword: "crying meme"
    },
    {
        roast: "10/10. Would compile again.",
        fix: "Perfection.",
        mood: "genius",
        gifKeyword: "10 out of 10 meme"
    }
];
exports.tamilRoastFallbacks = [
    // Syntax Errors
    {
        roast: "Oru semicolon-ah poda theriyaadha loosu... compiler-e un laptop-ah thooki kuththu-kallu mela adichu unniyoda Aadhar card-ah block panruvan!",
        fix: "Check your syntax, semicolon or brackets.",
        mood: "facepalm",
        gifKeyword: "vadivelu angry",
        errorType: 'syntax'
    },
    {
        roast: "Bracket close panna theriyaadha mandaya... un code-ah paathu compiler-e innaiku 5th floor-la irundhu kudhichi suicide pannikum!",
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
    {
        roast: "Enna kodumai sir idhu! This syntax error is like Vadivelu's Nesamani head getting hit by a hammer.",
        fix: "Double-check your brackets or semi-colons.",
        mood: "facepalm",
        gifKeyword: "vadivelu facepalm",
        errorType: 'syntax'
    },
    {
        roast: "Expected a token but found nothing. This is like waiting for a twist in a Tamil serial—it never comes!",
        fix: "Check for missing characters.",
        mood: "disaster",
        gifKeyword: "tamil crying meme",
        errorType: 'syntax'
    },
    {
        roast: "You missed a bracket. Aiyayo, idhu Sivaji the Boss level mistake ache!",
        fix: "Check for unclosed brackets or parentheses.",
        mood: "facepalm",
        gifKeyword: "sivaji meme",
        errorType: 'syntax'
    },
    {
        roast: "Comma enga da? Comma podama padicha unakku moochu vangaadha?",
        fix: "Add missing commas in your lists or objects.",
        mood: "screaming",
        gifKeyword: "tamil comedy confused",
        errorType: 'syntax'
    },
    {
        roast: "Indentation thappu... Idhu code ah illa snake dance ah?",
        fix: "Fix your formatting and indentation.",
        mood: "crying_laughing",
        gifKeyword: "vadivelu snake dance",
        errorType: 'syntax'
    },
    {
        roast: "Unexpected token! Un moonji mathiri edho onnu theva illama ulla vandhuruchu.",
        fix: "Remove the invalid character.",
        mood: "mind_blown",
        gifKeyword: "vadivelu shock",
        errorType: 'syntax'
    },
    // Runtime Errors
    {
        roast: "Aaramikumpodhu sema mass-ah Anirudh BGM oda pona... aana pathila watermelon star akitiya da.",
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
        roast: "Avaru yaaru nu theriyuma? Variable not defined nu varudhu... just like a ghost in a Muni movie.",
        fix: "Declare your variable properly.",
        mood: "dead",
        gifKeyword: "tamil comedy confused",
        errorType: 'runtime'
    },
    {
        roast: "Null reference! Idhuku dhan Billa madhiri plan pannanum, aana Neenga Naai Sekar madhiri sothappitingale.",
        fix: "Ensure variables are initialized before use.",
        mood: "screaming",
        gifKeyword: "vadivelu screaming",
        errorType: 'runtime'
    },
    {
        roast: "Undefined property? Idhellam oru thappa... adangommala, run panna vechitiye!",
        fix: "Check your object property names.",
        mood: "done",
        gifKeyword: "vadivelu done meme",
        errorType: 'runtime'
    },
    {
        roast: "ReferenceError! Naan oru thadava sonna nooru thadava sonna madhiri... declare your variables!",
        fix: "Ensure variables are defined before using them.",
        mood: "screaming",
        gifKeyword: "punch dialogue fail",
        errorType: 'runtime'
    },
    {
        roast: "Zero vaala divide panriya? Nee oru periya scientific genius thaan po!",
        fix: "Check for division by zero.",
        mood: "mind_blown",
        gifKeyword: "vadivelu scientist meme",
        errorType: 'runtime'
    },
    {
        roast: "Array index out of bounds! Veetuku ulla vara munnadi kadhava tharakanum da mapla.",
        fix: "Check array length before accessing.",
        mood: "facepalm",
        gifKeyword: "vadivelu door meme",
        errorType: 'runtime'
    },
    {
        roast: "Stack overflow! Thambi, un loop ukku oru mudive illaya?",
        fix: "Fix your recursion base case.",
        mood: "dead",
        gifKeyword: "vadivelu falling meme",
        errorType: 'runtime'
    },
    {
        roast: "Memory pathala! Un moolai mathiri computer moolayum chinnadhu da.",
        fix: "Optimize memory usage.",
        mood: "crying_laughing",
        gifKeyword: "vadivelu memory meme",
        errorType: 'runtime'
    },
    // Logic Errors
    {
        roast: "Nalla gethu-ah pona ipo vetha poche kumaru",
        fix: "Make sure all conditions are evaluated correctly.",
        mood: "mind_blown",
        gifKeyword: "tamil comedy confused",
        errorType: 'logic'
    },
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
        roast: "Infinite loop ah? Idhu Rajini padathula vara punch dialogue madhiri... mudiyave mudiyadhu!",
        fix: "Check your loop termination condition.",
        mood: "mind_blown",
        gifKeyword: "rajini style meme",
        errorType: 'logic'
    },
    {
        roast: "Type error! You are mixing strings and numbers like they are sambar and rasam. Don't do that!",
        fix: "Verify you are using the correct types.",
        mood: "crying_laughing",
        gifKeyword: "tamil laughing fail",
        errorType: 'logic'
    },
    {
        roast: "Output thappa varudhu! Nee ezhudhuna code-kum ketkura kelvikum sammandhame illaye da.",
        fix: "Read the problem statement again.",
        mood: "disaster",
        gifKeyword: "vadivelu confused meme",
        errorType: 'logic'
    },
    {
        roast: "Logic completely wrong! Idhu epdi irukkuna, train ticket vangi flight la eruna mathiri.",
        fix: "Your approach is totally incorrect.",
        mood: "facepalm",
        gifKeyword: "vadivelu train meme",
        errorType: 'logic'
    },
    {
        roast: "Result reverse aah vandhuruku... nee enna thalaikila nikkuriya?",
        fix: "Check your sorting or loop order.",
        mood: "mind_blown",
        gifKeyword: "vadivelu upside down meme",
        errorType: 'logic'
    },
    {
        roast: "Output empty! Un future mathiri iruttutu kedakku.",
        fix: "Print or return the final value.",
        mood: "dead",
        gifKeyword: "vadivelu dark meme",
        errorType: 'logic'
    },
    {
        roast: "Condition always true. Appram edhukku da if statement pota?",
        fix: "Check your boolean conditions.",
        mood: "screaming",
        gifKeyword: "vadivelu screaming",
        errorType: 'logic'
    }
];
exports.tamilProudFallbacks = [
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
        roast: "Compiler bayandhuduchu, nee tha leo nu solla matean!",
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
    },
    {
        roast: "Vera maari vera maari! Code tharama run aagudhu.",
        fix: "",
        mood: "party",
        gifKeyword: "ajith vera maari"
    },
    {
        roast: "Senjittan... namma payan code ah senjittan!",
        fix: "",
        mood: "happy",
        gifKeyword: "tamil success meme"
    },
    {
        roast: "Arumai! Un moolai inaiku nalla vela seiyudhu.",
        fix: "",
        mood: "genius",
        gifKeyword: "vadivelu appreciation"
    },
    {
        roast: "Mass panita po! Ini unna yaarum thadukka mudiyadhu.",
        fix: "",
        mood: "party",
        gifKeyword: "rajini mass meme"
    },
    {
        roast: "Code pass aayiduchu! Inaiku treat un vakaidhaan.",
        fix: "",
        mood: "happy",
        gifKeyword: "vadivelu treat meme"
    },
    {
        roast: "Ahaa, un code ah paakum bodhu kannu verkudhe!",
        fix: "",
        mood: "relief",
        gifKeyword: "vadivelu crying happy"
    },
    {
        roast: "Tharam! Idhuku mela oru line add panna kooda paavam.",
        fix: "",
        mood: "genius",
        gifKeyword: "vadivelu master meme"
    },
    {
        roast: "Adichan paaru appointment order ah!",
        fix: "",
        mood: "party",
        gifKeyword: "tamil job success meme"
    },
    {
        roast: "Orey joly thaan inaiku!",
        fix: "",
        mood: "happy",
        gifKeyword: "vadivelu joly meme"
    },
    {
        roast: "Mudichivittan! Payan level up aayittan.",
        fix: "",
        mood: "mind_blown",
        gifKeyword: "vadivelu mind blown"
    },
    {
        roast: "Bale pandiya! Epdiyoo run pannita.",
        fix: "",
        mood: "relief",
        gifKeyword: "vadivelu bale pandiya"
    },
    {
        roast: "Idhu thaan namma aalu! Code ah kilichittan.",
        fix: "",
        mood: "party",
        gifKeyword: "tamil mass success"
    },
    {
        roast: "Top takkaru code pa idhu!",
        fix: "",
        mood: "genius",
        gifKeyword: "vadivelu super meme"
    },
    {
        roast: "First try laye pass ah? Unmai sollu, copy adichiya?",
        fix: "",
        mood: "crying_laughing",
        gifKeyword: "vadivelu doubt meme"
    },
    {
        roast: "Oorukulla unakku nu oru peru vandhuruchu da!",
        fix: "",
        mood: "happy",
        gifKeyword: "vadivelu gethu meme"
    },
    {
        roast: "Gethu kaatita po! Google CEO unna thedi varuvan.",
        fix: "",
        mood: "party",
        gifKeyword: "sivaji boss meme"
    },
    {
        roast: "Code super ah irukku, po poi thoongu.",
        fix: "",
        mood: "done",
        gifKeyword: "vadivelu sleep meme"
    }
];
function getRandomFallback(isSuccess, humorPref, errorType) {
    if (humorPref === void 0) { humorPref = 'general'; }
    var isTamil = humorPref === 'tamil';
    if (isSuccess) {
        var list = isTamil ? exports.tamilProudFallbacks : exports.generalProudFallbacks;
        return list[Math.floor(Math.random() * list.length)];
    }
    else {
        var list = isTamil ? exports.tamilRoastFallbacks : exports.generalRoastFallbacks;
        if (errorType) {
            var filteredList = list.filter(function (r) { return r.errorType === errorType; });
            if (filteredList.length > 0) {
                list = filteredList;
            }
        }
        return list[Math.floor(Math.random() * list.length)];
    }
}
