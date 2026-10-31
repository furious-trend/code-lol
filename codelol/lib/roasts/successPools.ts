// agent-notes: { ctx: "Universal and language-specific applause lines for clean compilation and successful test execution", deps: ["./types"], state: active, last: "sato@2026-10-31" }

import { SuccessJoke, SupportedLanguage } from './types';

export const successJokes: SuccessJoke[] = [
  {
    general: "Exit code 0. Zero compiler warnings, zero runtime tracebacks. Pure engineering perfection.",
    tamil: "Zero errors, zero warnings, clean Exit Code 0! Terminal green light kuduthuruchu!",
    fix: "Ship it to production.",
    mood: "genius",
    gifKeyword: "applause"
  },
  {
    general: "Clean syntax, exact type resolution, and optimal memory teardown. That belongs in production.",
    tamil: "Boundary cases pass, memory allocation clean, syntax sharp... Perfect execution thala!",
    fix: "Time for code review approval.",
    mood: "party",
    gifKeyword: "celebration"
  },
  {
    general: "Passed all assertions on the initial execution. Edge cases covered, algorithms verified.",
    tamil: "Type checking flawless, logic structured... Oru trace error kooda illama test cases clear aayiduchu!",
    fix: "Ready for the next challenge.",
    mood: "happy",
    gifKeyword: "success"
  },
  {
    general: "The compiler found nothing to complain about. Flawless syntax execution.",
    tamil: "Algorithms accurate, logic optimized... Compiler direct-ah clean output-ah thandhuruchu!",
    fix: "Keep this momentum going.",
    mood: "relief",
    gifKeyword: "victory"
  }
];

export const languageSpecificSuccess: Partial<Record<SupportedLanguage, SuccessJoke[]>> = {
  python: [
    {
      general: "PEP 8 compliant, generator optimized, and 100% test assertions satisfied. Pure Pythonic elegance.",
      tamil: "Indentation neat-ah irukku, list comprehension mass, ellam test cases green... Pure Pythonic victory!",
      mood: "genius",
      gifKeyword: "python pass"
    }
  ],
  c: [
    {
      general: "Zero segmentation faults, all heap allocations paired with free(), and zero valgrind memory leaks.",
      tamil: "Memory leaks zero, pointers ellam safe, clean compilation... C code mass-ah run aagiduchu!",
      mood: "relief",
      gifKeyword: "clean code"
    }
  ],
  cpp: [
    {
      general: "RAII principles preserved, zero undefined behavior, and optimal move semantics in action.",
      tamil: "STL containers accurate, templates compile aachu, zero memory leak... C++ code perfect!",
      mood: "party",
      gifKeyword: "applause"
    }
  ],
  java: [
    {
      general: "Zero NullPointerExceptions, solid encapsulation, and garbage collector in peaceful tranquility.",
      tamil: "NPE zero, class loader happy, JVM kulla smooth-ah execute aayiduchu!",
      mood: "happy",
      gifKeyword: "happy"
    }
  ],
  javascript: [
    {
      general: "Event loop unblocked, async promises safely resolved, and zero undefined coercion traps.",
      tamil: "Promise unhandled exception illa, clean strict equality, output accurate-ah vandhuruchu!",
      mood: "genius",
      gifKeyword: "celebration"
    }
  ]
};
