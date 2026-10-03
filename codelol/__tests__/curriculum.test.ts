import { describe, it, expect } from 'vitest';
import { beginnerLessons } from '../lib/lessons/beginner';

describe('Beginner Curriculum Humor Content', () => {
  it('Data Types lesson should have updated Tamil humor', () => {
    const lesson = beginnerLessons.find(l => l.title === 'Data Types');
    expect(lesson).toBeDefined();
    expect(lesson?.biteSized?.meaning).toBe('The specific category of data (Number, Text, True/False) so the computer knows how to handle it.');
    expect(lesson?.biteSized?.funnyEgTamil).toBe('Ration shop-la rice, kerosene, and sugar-ah orey dabba-la pottu mix panna koodaadhu la? Adhey dhaan!');
  });

  it('Comments lesson should have updated Tamil humor', () => {
    const lesson = beginnerLessons.find(l => l.title === 'Comments');
    expect(lesson).toBeDefined();
    expect(lesson?.biteSized?.meaning).toBe('Secret notes inside code for human eyes only; the computer completely ignores them.');
    expect(lesson?.biteSized?.funnyEgTamil).toBe('Question paper munnadi teacher paakaama friend-kku bit la ezhudhi pass panra dialogue maari.');
  });
});
