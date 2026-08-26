import { beginnerLessons } from '../lib/lessons/beginner';
import { intermediateLessons } from '../lib/lessons/intermediate';
import { expertLessons } from '../lib/lessons/expert';
import { interviewLessons } from '../lib/lessons/interview';

const allLessons = [
  ...beginnerLessons.map(l => ({ ...l, tier: 'beginner' })),
  ...intermediateLessons.map(l => ({ ...l, tier: 'intermediate' })),
  ...expertLessons.map(l => ({ ...l, tier: 'expert' })),
  ...interviewLessons.map(l => ({ ...l, tier: 'interview' }))
];

const flagged = [];

for (const l of allLessons) {
  const exp = l.funnyExplanation || '';
  const words = exp.split(/\s+/).length;
  // match periods or exclamation marks not at the very end
  const sentences = (exp.match(/[.!?!]+(?=\s+.)/g) || []).length + 1;
  const keywordWords = (l.gifKeyword || '').split(/\s+/).length;

  const reasons: string[] = [];
  if (words > 20) reasons.push(`Too long (${words} words)`);
  if (sentences > 1) reasons.push(`Multiple sentences (${sentences})`);
  if (keywordWords < 1 || keywordWords > 4) reasons.push(`Keyword length (${keywordWords} words)`);

  if (reasons.length > 0) {
    flagged.push({ title: l.title, exp, keyword: l.gifKeyword, reasons });
  }
}

console.log(`Total lessons: ${allLessons.length}`);
console.log(`Flagged: ${flagged.length}`);
for (const f of flagged) {
  console.log(`- ${f.title}: ${f.reasons.join(', ')}`);
  console.log(`  EXP: ${f.exp}`);
  console.log(`  KEY: ${f.keyword}`);
}
