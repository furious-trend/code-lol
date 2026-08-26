import { describe, it, expect } from 'vitest';
import { quizzes } from '../lib/quizzes';

describe('quizzes structure', () => {
  it('should export an object of quizzes', () => {
    expect(quizzes).toBeDefined();
    expect(typeof quizzes).toBe('object');
  });

  it('every quiz topic should have tier, title, icon, color, and questions properties', () => {
    const keys = Object.keys(quizzes);
    expect(keys.length).toBeGreaterThan(0);
    
    for (const key of keys) {
      const topic = quizzes[key];
      expect(topic.id).toBe(key);
      expect(topic.title).toBeDefined();
      expect(['Beginner', 'Intermediate', 'Advanced', 'Expert']).toContain(topic.tier);
      expect(topic.icon).toBeDefined();
      expect(topic.color).toBeDefined();
      expect(Array.isArray(topic.questions)).toBe(true);
    }
  });

  it('should have at least 8 questions per topic', () => {
    const keys = Object.keys(quizzes);
    for (const key of keys) {
      const topic = quizzes[key];
      expect(topic.questions.length).toBeGreaterThanOrEqual(8);
    }
  });

  it('every question should have exactly 4 options and a valid correctIndex', () => {
    const keys = Object.keys(quizzes);
    for (const key of keys) {
      const topic = quizzes[key];
      for (const question of topic.questions) {
        expect(question.options.length).toBe(4);
        expect(question.correctIndex).toBeGreaterThanOrEqual(0);
        expect(question.correctIndex).toBeLessThan(4);
      }
    }
  });

  it('should not have any duplicate question IDs across all topics', () => {
    const allIds = new Set<string>();
    const keys = Object.keys(quizzes);
    for (const key of keys) {
      for (const question of quizzes[key].questions) {
        expect(allIds.has(question.id)).toBe(false);
        allIds.add(question.id);
      }
    }
  });
});
