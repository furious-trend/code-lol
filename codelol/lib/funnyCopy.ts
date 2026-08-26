export const loadingMessages = [
  "Untangling your semicolons...",
  "Asking the code gods for mercy...",
  "Reticulating splines (we don't know what that means either)...",
  "Bribing the compiler with snacks...",
  "Downloading more RAM...",
  "Convincing the server to play nice...",
  "Locating the missing parenthesis...",
  "Checking StackOverflow for the 100th time...",
  "Rebooting the Matrix...",
  "Generating infinite loop, please wait..."
];

export const emptyMessages = [
  "Run your code to see results and get roasted!",
  "It's awfully quiet in here. Hit Run!",
  "Your code won't run itself (yet).",
  "Waiting for you to break something...",
  "I'm ready to judge your code. Hit Run.",
  "Hello? Is anybody coding out there?",
  "Type code. Press Run. Get Roasted. It's simple."
];

export const successMessages = [
  "🎉 Accepted! Nailed it!",
  "🧠 BIG BRAIN ENERGY. Tests passed!",
  "🔥 You're on fire! All tests green.",
  "🚀 Code so clean, even the compiler wept.",
  "✅ Flawless victory.",
  "💯 100% correct. Bugsy is proud.",
  "🏆 You crushed it! Next challenge awaits."
];

export const nudges = [
  "One more? Bugsy dares you 😏",
  "Don't stop now, you're on a roll! 🚀",
  "Just one more problem... we promise.",
  "Your streak is looking lonely. Feed it! 🔥",
  "Bugsy thinks you can't beat the next one."
];

export function getRandomLoadingMessage(): string {
  return loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
}

export function getRandomEmptyMessage(): string {
  return emptyMessages[Math.floor(Math.random() * emptyMessages.length)];
}

export function getRandomSuccessMessage(): string {
  return successMessages[Math.floor(Math.random() * successMessages.length)];
}

export function getRandomNudgeMessage(): string {
  return nudges[Math.floor(Math.random() * nudges.length)];
}
