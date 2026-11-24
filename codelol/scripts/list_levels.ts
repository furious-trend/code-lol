import { getAllLessons } from '../lib/lessons';

const lessons = getAllLessons('javascript');

console.log('# codelol - Complete Lesson List (JavaScript)\n');

let currentTier = '';
lessons.forEach((lesson, index) => {
  if (lesson.tier !== currentTier) {
    currentTier = lesson.tier;
    console.log(`\n## ${currentTier.toUpperCase()}`);
  }
  console.log(`${index + 1}. ${lesson.title}`);
});
