export const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs.",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
  "A SQL query goes into a bar, walks up to two tables and asks... 'Can I join you?'",
  "Why do Java programmers have to wear glasses? Because they don't C#.",
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "I've got a really good UDP joke to tell you, but I don't know if you'll get it.",
  "In C we had to code our own bugs. In C++ we can inherit them.",
  "Why did the programmer quit his job? Because he didn't get arrays.",
  "What's a programmer's favorite hangout place? Foo Bar.",
  "Why did the developer go broke? Because he used up all his cache.",
  "Real programmers count from 0.",
  "Why are Assembly programmers always soaking wet? They work below C-level.",
  "A programmer is told to 'go to hell', he finds the worst part of that statement is the 'go to'.",
  "There are only two hard things in computer science: cache invalidation and naming things.",
  "I would tell you a joke about a recursive function, but it's too repetitive.",
  "What is a ghost's favorite type of type? A boolean.",
  "Why did the Python programmer not respond? Because they were waiting for the GIL.",
  "Why do web developers make terrible comedians? Their jokes are too nested.",
  "How do you comfort a JavaScript bug? You console it.",
  "Knock, knock. Race condition. Who's there?"
];

export function getJokeOfTheDay(): string {
  // Use the current date to select a joke consistently for the whole day
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  return jokes[dayOfYear % jokes.length];
}

export function getRandomJoke(): string {
  return jokes[Math.floor(Math.random() * jokes.length)];
}
