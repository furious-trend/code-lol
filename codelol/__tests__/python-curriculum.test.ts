import { describe, it, expect } from 'vitest';
import { pythonCurriculum } from '../lib/python/curriculum';
import { Chapter, Lesson } from '../lib/python/types';

describe('Python Curriculum', () => {
  it('should have exactly 19 chapters', () => {
    expect(pythonCurriculum.length).toBe(19);
  });

  it('should have correct tiers for each chapter', () => {
    // Beginner = ch1-5, Intermediate = ch6-9, Advanced = ch10-12, Expert = ch13-15, Specialized = ch16-19
    for (let i = 0; i < 5; i++) expect(pythonCurriculum[i].tier).toBe('Beginner');
    for (let i = 5; i < 9; i++) expect(pythonCurriculum[i].tier).toBe('Intermediate');
    for (let i = 9; i < 12; i++) expect(pythonCurriculum[i].tier).toBe('Advanced');
    for (let i = 12; i < 15; i++) expect(pythonCurriculum[i].tier).toBe('Expert');
    for (let i = 15; i < 19; i++) expect(pythonCurriculum[i].tier).toBe('Specialized');
  });

  it('should have all required fields for each chapter', () => {
    pythonCurriculum.forEach(ch => {
      expect(typeof ch.id).toBe('string');
      expect(typeof ch.title).toBe('string');
      expect(['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Specialized']).toContain(ch.tier);
      expect(Array.isArray(ch.technicalCore)).toBe(true);
      expect(ch.technicalCore.length).toBeGreaterThan(0);
      expect(typeof ch.analogyGeneral).toBe('string');
      expect(ch.analogyGeneral.length).toBeGreaterThan(0);
      expect(typeof ch.analogyTamil).toBe('string');
      expect(ch.analogyTamil.length).toBeGreaterThan(0);
      expect(typeof ch.roastGeneral).toBe('string');
      expect(ch.roastGeneral.length).toBeGreaterThan(0);
      expect(typeof ch.roastTamil).toBe('string');
      expect(ch.roastTamil.length).toBeGreaterThan(0);
      expect(Array.isArray(ch.lessons)).toBe(true);
      
      // Each chapter must have 3-6 lessons
      expect(ch.lessons.length).toBeGreaterThanOrEqual(3);
      expect(ch.lessons.length).toBeLessThanOrEqual(6);
    });
  });

  it('should have all required fields for each lesson', () => {
    pythonCurriculum.forEach(ch => {
      ch.lessons.forEach(lesson => {
        expect(typeof lesson.id).toBe('string');
        expect(typeof lesson.title).toBe('string');
        expect(typeof lesson.explanation).toBe('string');
        expect(lesson.explanation.length).toBeGreaterThan(0);
        expect(typeof lesson.codeExample).toBe('string');
        expect(lesson.codeExample.length).toBeGreaterThan(0);
        
        expect(typeof lesson.expectedOutput).toBe('string');
        
        expect(Array.isArray(lesson.verificationChecks)).toBe(true);
        expect(lesson.verificationChecks.length).toBeGreaterThan(0);
        
        expect(lesson.miniQuiz).toBeDefined();
        expect(typeof lesson.miniQuiz.question).toBe('string');
        expect(Array.isArray(lesson.miniQuiz.options)).toBe(true);
        expect(lesson.miniQuiz.options.length).toBe(4);
        expect(typeof lesson.miniQuiz.correctAnswerIndex).toBe('number');
        expect(lesson.miniQuiz.correctAnswerIndex).toBeGreaterThanOrEqual(0);
        expect(lesson.miniQuiz.correctAnswerIndex).toBeLessThan(4);

        expect(typeof lesson.funnyLineGeneral).toBe('string');
        // general humor lines at most 20 words
        expect(lesson.funnyLineGeneral.split(' ').length).toBeLessThanOrEqual(20);
        expect(typeof lesson.funnyLineTamil).toBe('string');
      });
    });
  });

  it('should have "Katuna college fees" at most 3 times across the curriculum', () => {
    let count = 0;
    const jsonStr = JSON.stringify(pythonCurriculum).toLowerCase();
    
    // count occurrences
    let index = 0;
    while (true) {
      index = jsonStr.indexOf('katuna college fees', index);
      if (index === -1) break;
      count++;
      index += 'katuna college fees'.length;
    }
    
    expect(count).toBeLessThanOrEqual(3);
  });
});
