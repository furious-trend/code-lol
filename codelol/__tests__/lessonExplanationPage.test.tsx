import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LessonExplanationPage from '../app/lessons/[id]/page';
import { useRouter, useParams } from 'next/navigation';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import * as lessons from '../lib/lessons';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useParams: vi.fn()
}));

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: { id: 'test-user' } } })
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: vi.fn().mockResolvedValue({ data: { humor_preference: 'general', learning_language: 'javascript' } })
        })
      })
    })
  })
}));

// Mock the lessons library
vi.mock('@/lib/lessons', () => ({
  getAllLessons: vi.fn(),
  allLessons: [] // required by import
}));

describe('LessonExplanationPage', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    (useParams as any).mockReturnValue({ id: '1' });
    
    // Default mock lesson with the new schema
    (lessons.getAllLessons as any).mockReturnValue([
      {
        id: 1,
        chapter: "Chapter 1",
        tier: "Beginner",
        title: "Test Lesson",
        sticker: "🧪",
        funnyExplanationGeneral: "Old funny text",
        funnyExplanationTamil: "Old tamil text",
        codeExample: "let x = 1;",
        expectedOutput: "1",
        gifKeyword: "test",
        miniQuizQuestion: { question: "Q?", options: ["A", "B"], correctAnswerIndex: 0 },
        deepConcept: {
          whatIsIt: "It is a test.",
          underTheHood: "Runs in vitest.",
          gotchasAndBugs: "Sometimes fails."
        },
        humor: {
          general: { analogy: "Like a test.", punchline: "It passes." },
          tamil: { analogy: "Oru test.", punchline: "Pass aagum." }
        },
        workoutSteps: [
          { stepNumber: 1, title: "Step 1", code: "let x = 1;", lineExplanation: "Set x" }
        ],
        examples: [{ explanation: "Ex 1", code: "console.log(x)" }]
      }
    ]);
  });

  it('renders the new DeepConcept fields', async () => {
    render(<LessonExplanationPage />);
    
    // Wait for the lesson to load
    await waitFor(() => {
      expect(screen.getByText('Test Lesson')).toBeTruthy();
    });

    // We expect the new Deep Concept UI to exist
    expect(screen.getByText('What is it?')).toBeTruthy();
    expect(screen.getByText('It is a test.')).toBeTruthy();
    expect(screen.getByText('Under the Hood')).toBeTruthy();
    expect(screen.getByText('Runs in vitest.')).toBeTruthy();
  });

  it('renders the dual humor fields based on preference', async () => {
    render(<LessonExplanationPage />);
    
    await waitFor(() => {
      expect(screen.getByText(/Like a test/i)).toBeTruthy();
      expect(screen.getByText(/It passes/i)).toBeTruthy();
    });
  });

  it('renders workout steps in the carousel', async () => {
    render(<LessonExplanationPage />);
    
    await waitFor(() => {
      expect(screen.getByText('Step 1')).toBeTruthy();
      expect(screen.getByText('Set x')).toBeTruthy();
    });
  });
});
