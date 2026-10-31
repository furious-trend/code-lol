// agent-notes: { ctx: "Language-specific technical bug roasts for Python, C, C++, Java, and JavaScript", deps: ["./types"], state: active, last: "sato@2026-10-31" }

import { LanguageRoastPool, SupportedLanguage } from './types';

export const languageRoastPools: Record<SupportedLanguage, LanguageRoastPool> = {
  python: {
    specificErrors: {
      IndentationError: {
        errorType: 'IndentationError',
        general: "Python uses whitespace for program structure, not freeform modern art. Fix your spaces before the linter has an existential crisis.",
        tamil: "Indentation-la oru edathula 2 space, innoru edathula 4 space... Python scale eduthu alandhu paathu fail panniduchu! Olunga 4 spaces vachi align pannu!",
        fix: "Standardize your code blocks to consistent 4-space indentation.",
        mood: "facepalm",
        gifKeyword: "facepalm"
      },
      SyntaxError: {
        errorType: 'SyntaxError',
        general: "You wrote a conditional block without a trailing colon. Python is still waiting for you to finish that sentence.",
        tamil: "Condition ezhudhitu colon (:) poda marandhutiye! Full stop illama continuous-ah essay ezhudhuradhu maari compiler muzhichukittu nikudhu.",
        fix: "Add the missing colon (:) at the end of your if/for/while/def statement.",
        mood: "disaster",
        gifKeyword: "confused"
      },
      TypeError: {
        errorType: 'TypeError',
        general: "Trying to add an integer directly to a string? Python doesn't do sloppy implicit coercion. Cast your types explicitly.",
        tamil: "String-aiyum integer-aiyum direct-ah koota paakura? Fifty roova note kooda '50' nu ezhudhina paper-ah serthu count panna mudiyuma? Type cast pannu thala!",
        fix: "Use str(val) or int(val) to convert types explicitly before operating.",
        mood: "mind_blown",
        gifKeyword: "shocked"
      },
      IndexError: {
        errorType: 'IndexError',
        general: "Index out of range. You are knocking on door number 10 in a building that only has 3 apartments.",
        tamil: "List-la irukkuradhe 3 item dhaan, nee 5-avadhu index-ah thedura... Kaali dabba kulla kaiya vittu thedina error mattum dhaan varum!",
        fix: "Check your list length using len() and ensure index < len(list).",
        mood: "facepalm",
        gifKeyword: "searching"
      },
      ZeroDivisionError: {
        errorType: 'ZeroDivisionError',
        general: "Dividing by zero? Math broke, the CPU stalled, and the interpreter just filed a formal grievance.",
        tamil: "Zero-vaala divide panna try panni processor-ah heat panra... Calculator-e thala suthura matter idhu, input-ah validate pannu!",
        fix: "Validate that the denominator is not zero before dividing.",
        mood: "dead",
        gifKeyword: "explosion"
      }
    },
    common: [
      {
        errorType: 'GeneralPythonError',
        general: "Python traceback triggered. Clean up your variable scopes and verify input parameter bounds.",
        tamil: "Python interpreter stop aayiduchu! Variable scope-um parameter bounds-um check pannu!",
        fix: "Check the traceback line numbers to isolate the failing statement.",
        mood: "disaster",
        gifKeyword: "debugging"
      }
    ]
  },

  c: {
    specificErrors: {
      SegmentationFault: {
        errorType: 'SegmentationFault',
        general: "Segmentation fault (core dumped). You tried reading memory that belongs to the operating system, and the kernel politely kicked you out.",
        tamil: "Segmentation fault! Un memory boundary-ah thaandi pakkaathu veetu bedroom kulla kaiya vitta maari OS unna instant-ah terminate panniduchu!",
        fix: "Check for NULL pointers and ensure pointers are allocated before dereferencing (*ptr).",
        mood: "dead",
        gifKeyword: "crying"
      },
      MissingSemicolon: {
        errorType: 'MissingSemicolon',
        general: "Missing semicolon on line 12 caused 48 cascading compiler errors on line 90. Welcome to C.",
        tamil: "Oru chinna semicolon-ah tholaichutu 50 error lines-ah compile panni terminal-ah blood bath aakitiye da!",
        fix: "Add the missing semicolon (;) immediately preceding the reported error line.",
        mood: "screaming",
        gifKeyword: "rage"
      },
      FormatSpecifierMismatch: {
        errorType: 'FormatSpecifierMismatch',
        general: "Passed a float into %d? Enjoy printing arbitrary garbage bits from the CPU register.",
        tamil: "Float value-ku %d format specifier potta garbage value dhaan print aagum. Specifier-ah olunga match pannu!",
        fix: "Match printf specifiers to types: %d for int, %f for float, %s for char*, %p for pointers.",
        mood: "facepalm",
        gifKeyword: "facepalm"
      },
      UninitializedVariable: {
        errorType: 'UninitializedVariable',
        general: "Used a local variable without initializing it first. Congratulations, your calculation is based on random leftover memory dust.",
        tamil: "Variable create pannitu value assign pannama direct-ah use panra? Pazhaya memory kuppai dhaan unakku output-ah varum!",
        fix: "Initialize local variables at declaration (e.g. int count = 0;).",
        mood: "mind_blown",
        gifKeyword: "confused"
      },
      ArrayBufferOverflow: {
        errorType: 'ArrayBufferOverflow',
        general: "Wrote 20 bytes into a 10-byte buffer. You just overwrote the stack frame return address.",
        tamil: "10-size array-la 20 elements thunichu stack memory-ah smash pannitiye! Boundary check enga da?",
        fix: "Ensure your loop indices or string copies do not exceed allocated buffer size.",
        mood: "dead",
        gifKeyword: "explosion"
      }
    },
    common: [
      {
        errorType: 'GeneralCError',
        general: "GCC/Clang compilation halted. Verify your header includes, types, and memory pointer bounds.",
        tamil: "C compiler fail aayiduchu! Headers, data types, and pointer allocations-ah check pannu!",
        fix: "Inspect the first compiler error message and resolve it first.",
        mood: "disaster",
        gifKeyword: "thinking"
      }
    ]
  },

  cpp: {
    specificErrors: {
      UndefinedReference: {
        errorType: 'UndefinedReference',
        general: "Declared the function header but forgot to link the definition. The compiler believed you, but the linker found out you lied.",
        tamil: "Function header define pannitu implementation eludhama vitta linker kandupudichidum. Linker error vandhu exit code 1 aayiduchu!",
        fix: "Provide the definition for the declared symbol or link the corresponding object file.",
        mood: "done",
        gifKeyword: "disappointed"
      },
      DanglingPointer: {
        errorType: 'DanglingPointer',
        general: "Called delete on a pointer and tried accessing it again. You are sending mail to an address of a demolished building.",
        tamil: "Memory-ah delete pannitu thirumba adhe pointer-ah access panra? Demolish panna veetukku calling bell adikkura maari irukku!",
        fix: "Set pointers to nullptr after deletion, or prefer RAII and std::unique_ptr / std::shared_ptr.",
        mood: "dead",
        gifKeyword: "facepalm"
      },
      CrypticTemplateError: {
        errorType: 'CrypticTemplateError',
        general: "One mismatched template type parameter just produced an 8-page scroll of nested STL error logs.",
        tamil: "Template types-la chinna mismatch... Terminal-la scroll panna mudiyadha alavukku STL compiler error paragraph parasitiye!",
        fix: "Verify template arguments match the concept/traits expected by the standard library container or algorithm.",
        mood: "screaming",
        gifKeyword: "screaming"
      },
      IteratorInvalidation: {
        errorType: 'IteratorInvalidation',
        general: "Erased an element from a vector while iterating through it. Your iterator is now wandering an empty void.",
        tamil: "Loop kulla iterate pannikitte vector element-ah erase panna iterator invalidate aayidum. Loop logic-ah safe-ah ezhudhu!",
        fix: "Assign the iterator to the return value of vector.erase(it) or use std::erase_if.",
        mood: "disaster",
        gifKeyword: "confused"
      }
    },
    common: [
      {
        errorType: 'GeneralCppError',
        general: "C++ compiler rejected the code. Check namespace scopes, const-correctness, and references.",
        tamil: "C++ build fail aayiduchu! Namespaces, references, and class definitions-ah check pannu!",
        fix: "Read the top-most error emitted before the template cascades.",
        mood: "disaster",
        gifKeyword: "debugging"
      }
    ]
  },

  java: {
    specificErrors: {
      NullPointerException: {
        errorType: 'NullPointerException',
        general: "NullPointerException. You attempted to invoke a method on an object that literally does not exist in the heap.",
        tamil: "Heap memory-la create-e aagadha object-ku method call panriya? Billion-dollar mistake NullPointerException vandhu vilundhuruchu!",
        fix: "Instantiate the object with 'new' or add an explicit null check before invocation.",
        mood: "dead",
        gifKeyword: "facepalm"
      },
      ClassNameMismatch: {
        errorType: 'ClassNameMismatch',
        general: "Public class name does not match the .java filename. Java's classloader refuses to play this guessing game.",
        tamil: "File name-um public class name-um vera vera... Classloader un file-ah compile panna mudiyadhu nu direct-ah reject panniduchu!",
        fix: "Rename the public class to match your filename or rename the file.",
        mood: "facepalm",
        gifKeyword: "disappointed"
      },
      MissingMainMethod: {
        errorType: 'MissingMainMethod',
        general: "Main method not found. The JVM entered your class, found no entry door, and walked away.",
        tamil: "JVM kulla enter aagi paatha main method-e kaanom! Program enga start aaganum nu entry point vekka maatiya?",
        fix: "Declare 'public static void main(String[] args)' inside your entry class.",
        mood: "mind_blown",
        gifKeyword: "searching"
      },
      ArrayIndexOutOfBoundsException: {
        errorType: 'ArrayIndexOutOfBoundsException',
        general: "Accessed index beyond array length. Java doesn't do buffer overflows like C; it throws an exception and stops immediately.",
        tamil: "Array length thaandi access panra. C maari silent-ah garbage tharaadhu, Java throw panni stop pannidum!",
        fix: "Ensure index is non-negative and strictly less than array.length.",
        mood: "disaster",
        gifKeyword: "stop"
      },
      ClassCastException: {
        errorType: 'ClassCastException',
        general: "Invalid type cast. You cannot force an object to be an unrelated subclass just by writing it in parentheses.",
        tamil: "Incompatible object-ah force panni type cast panna ClassCastException thavira vera enna varum?",
        fix: "Check object inheritance hierarchy with instanceof before casting.",
        mood: "crying_laughing",
        gifKeyword: "shocked"
      }
    },
    common: [
      {
        errorType: 'GeneralJavaError',
        general: "Java compile or runtime exception thrown. Verify package declarations, imports, and access modifiers.",
        tamil: "Java runtime exception! Imports, class structure, and access modifiers check pannu!",
        fix: "Inspect stack trace to locate the failing line in your source.",
        mood: "disaster",
        gifKeyword: "debugging"
      }
    ]
  },

  javascript: {
    specificErrors: {
      CannotReadUndefined: {
        errorType: 'CannotReadUndefined',
        general: "Cannot read properties of undefined. You tried accessing a nested property on a variable that currently contains void.",
        tamil: "Undefined variable mela property access panna TypeError thaan varum. Optional chaining ?. use panna theriyadha?",
        fix: "Use optional chaining (user?.profile?.name) or verify the object is initialized.",
        mood: "mind_blown",
        gifKeyword: "facepalm"
      },
      AccidentalNaN: {
        errorType: 'AccidentalNaN',
        general: "Your math produced NaN, and because NaN !== NaN, your sanity check failed completely.",
        tamil: "String-aiyum number-aiyum divide panni NaN aakitiye! NaN === NaN kooda false dhaan varum nu theriyadha?",
        fix: "Use Number.isNaN(val) or ensure inputs are sanitized with Number(val).",
        mood: "crying_laughing",
        gifKeyword: "confused"
      },
      UncaughtPromiseRejection: {
        errorType: 'UncaughtPromiseRejection',
        general: "Async promise rejected without a .catch() block or try/await. The async error escaped straight into the event loop.",
        tamil: "Async function call pannitu catch block podala... Unhandled Promise Rejection vandhu node process exit aayiduchu!",
        fix: "Wrap await calls in try/catch or chain a .catch(err => ...) handler.",
        mood: "screaming",
        gifKeyword: "panic"
      },
      LooseEqualityQuirks: {
        errorType: 'LooseEqualityQuirks',
        general: "Using loose equality == caused dynamic coercion to evaluate [] == ![] as true. Use strict ===.",
        tamil: "Loose equality == potu type coercion trap-la maatuna. Strict equality === use pannu thala!",
        fix: "Always use strict equality (=== and !==) to prevent implicit type casting.",
        mood: "done",
        gifKeyword: "facepalm"
      }
    },
    common: [
      {
        errorType: 'GeneralJSError',
        general: "JavaScript execution failed. Check browser/Node console for unhandled exceptions.",
        tamil: "JavaScript execution fail aayiduchu. Syntax, variable scoping, and callback structure-ah paar!",
        fix: "Check your console for the full error trace.",
        mood: "disaster",
        gifKeyword: "debugging"
      }
    ]
  }
};
