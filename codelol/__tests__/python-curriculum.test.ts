// agent-notes: { ctx: "Vitest test suite for 20-chapter Python curriculum structure and roasts", deps: ["../lib/python/curriculum", "../lib/python/types"], state: active, last: "tara@2026-10-11" }
import { describe, it, expect } from 'vitest';
import { pythonCurriculum, pythonLessons } from '../lib/python/curriculum';
import { Chapter, Lesson, PythonLesson } from '../lib/python/types';
import { getAllLessons } from '../lib/lessons';

describe('Python Curriculum', () => {
  it('should have exactly 20 chapters', () => {
    expect(pythonCurriculum.length).toBe(20);
  });

  it('should have correct tiers for each chapter', () => {
    // Beginner = ch1-5 (5), Intermediate = ch6-9 (4), Advanced = ch10-13 (4), Expert = ch14-16 (3), Specialized = ch17-20 (4)
    for (let i = 0; i < 5; i++) expect(pythonCurriculum[i].tier).toBe('Beginner');
    for (let i = 5; i < 9; i++) expect(pythonCurriculum[i].tier).toBe('Intermediate');
    for (let i = 9; i < 13; i++) expect(pythonCurriculum[i].tier).toBe('Advanced');
    for (let i = 13; i < 16; i++) expect(pythonCurriculum[i].tier).toBe('Expert');
    for (let i = 16; i < 20; i++) expect(pythonCurriculum[i].tier).toBe('Specialized');
  });

  it('should include Chapter 9 covering File Handling & System Integration', () => {
    const fileCh = pythonCurriculum.find(ch => ch.title.toLowerCase().includes('file handling'));
    expect(fileCh).toBeDefined();
    expect(fileCh?.tier).toBe('Intermediate');
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

  it('should have "Katuna college fees" at most 3 times and at least once across the curriculum', () => {
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
    
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThanOrEqual(3);
    expect(jsonStr).toContain('katuna college fees-ku naalu cow vangirukalam da!');
  });

  it('should include verified celebration lines', () => {
    const jsonStr = JSON.stringify(pythonCurriculum).toLowerCase();
    expect(jsonStr).toContain('bloody sweet... output vandhuruchu da!');
    expect(jsonStr).toContain('appa, unga pulla urupputturuchu pa!');
  });

  it('should export pythonLessons conforming to the PythonLesson schema', () => {
    expect(Array.isArray(pythonLessons)).toBe(true);
    expect(pythonLessons.length).toBeGreaterThanOrEqual(60);
    pythonLessons.forEach((pl: PythonLesson) => {
      expect(typeof pl.id).toBe('string');
      expect(typeof pl.chapterId).toBe('string');
      expect(typeof pl.title).toBe('string');
      expect(['beginner', 'intermediate', 'advanced', 'expert', 'specialized']).toContain(pl.tier);
      expect(Array.isArray(pl.technicalCore)).toBe(true);
      expect(typeof pl.englishExplanation).toBe('string');
      expect(pl.englishExplanation.length).toBeGreaterThan(0);
      expect(typeof pl.tamilRoast).toBe('string');
      expect(pl.tamilRoast.length).toBeGreaterThan(0);
      expect(typeof pl.codeExample).toBe('string');
      expect(typeof pl.expectedOutput).toBe('string');
      expect(Array.isArray(pl.verificationChecks)).toBe(true);
      expect(pl.miniQuiz).toBeDefined();
      expect(typeof pl.miniQuiz.question).toBe('string');
      expect(Array.isArray(pl.miniQuiz.options)).toBe(true);
      expect(typeof pl.miniQuiz.answerIndex).toBe('number');
    });
  });

  it('should return populated Python lessons via getAllLessons("python")', () => {
    const lessons = getAllLessons('python');
    expect(Array.isArray(lessons)).toBe(true);
    expect(lessons.length).toBeGreaterThanOrEqual(60);
    expect(lessons[0].language).toBe('python');
  });
});
