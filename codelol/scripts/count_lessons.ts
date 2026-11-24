import { getAllLessons } from '../lib/lessons';

const jsLessons = getAllLessons('javascript');
const pyLessons = getAllLessons('python');

console.log(`JS Lessons: ${jsLessons.length}`);
console.log(`Python Lessons: ${pyLessons.length}`);
