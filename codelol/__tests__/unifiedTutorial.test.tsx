// agent-notes: { ctx: "TDD test suite for unified W3Schools-style tutorial hub and components", deps: ["@/lib/lessons/unifiedTopics", "@/components/w3schools/TutorialSidebar", "@/components/w3schools/ExampleCard", "@/components/w3schools/ExerciseBox"], state: active, last: "tara@2026-10-13" }
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { getUnifiedTopics, getUnifiedChapters } from '@/lib/lessons/unifiedTopics';
import { TutorialSidebar } from '@/components/w3schools/TutorialSidebar';
import { ExampleCard } from '@/components/w3schools/ExampleCard';
import { ExerciseBox } from '@/components/w3schools/ExerciseBox';

describe('Unified Topics Adapter (lib/lessons/unifiedTopics)', () => {
  const languages = ['python', 'javascript', 'c', 'cpp', 'java'] as const;

  languages.forEach((lang) => {
    it(`normalizes topics for ${lang} with required W3Schools fields`, () => {
      const topics = getUnifiedTopics(lang);
      expect(topics.length).toBeGreaterThan(0);

      const firstTopic = topics[0];
      expect(firstTopic.id).toBeDefined();
      expect(firstTopic.title).toBeTruthy();
      expect(firstTopic.chapter).toBeTruthy();
      expect(firstTopic.codeExample).toBeTruthy();
      expect(firstTopic.explanation).toBeTruthy();
      expect(firstTopic.language).toBe(lang);
    });

    it(`groups topics into chapters for ${lang}`, () => {
      const chapters = getUnifiedChapters(lang);
      expect(chapters.length).toBeGreaterThan(0);
      expect(chapters[0].title).toBeTruthy();
      expect(chapters[0].topics.length).toBeGreaterThan(0);
    });
  });

  it('correctly maps Python curriculum chapters', () => {
    const chapters = getUnifiedChapters('python');
    expect(chapters[0].topics[0].id).toBe('ch1-l1');
  });

  it('correctly maps JavaScript curriculum topics', () => {
    const topics = getUnifiedTopics('javascript');
    expect(topics[0].id).toBe('1');
    expect(topics[0].codeExample).toContain('Biryani');
  });
});

describe('W3Schools TutorialSidebar Component', () => {
  const sampleTopics = [
    {
      id: 'topic-1',
      language: 'python' as const,
      chapter: 'Python Basics',
      tier: 'Beginner' as const,
      title: 'Python Syntax',
      sticker: '🐍',
      explanation: 'Syntax rules',
      codeExample: 'print("Hello")',
      expectedOutput: 'Hello',
    },
    {
      id: 'topic-2',
      language: 'python' as const,
      chapter: 'Python Basics',
      tier: 'Beginner' as const,
      title: 'Python Variables',
      sticker: '📦',
      explanation: 'Variables store data',
      codeExample: 'x = 5',
      expectedOutput: '',
    },
    {
      id: 'topic-3',
      language: 'python' as const,
      chapter: 'Control Flow',
      tier: 'Intermediate' as const,
      title: 'Python If Else',
      sticker: '🔀',
      explanation: 'Conditionals',
      codeExample: 'if x > 0: pass',
      expectedOutput: '',
    },
  ];

  it('renders language header and chapter headings', () => {
    render(
      <TutorialSidebar
        language="python"
        topics={sampleTopics}
        activeTopicId="topic-1"
        onSelectTopic={vi.fn()}
        learnedTopicIds={new Set(['topic-1'])}
      />
    );

    expect(screen.getByText(/Python Library/i)).toBeTruthy();
    expect(screen.getByText('Python Basics')).toBeTruthy();
    expect(screen.getByText('Control Flow')).toBeTruthy();
    expect(screen.getByText('Python Syntax')).toBeTruthy();
    expect(screen.getByText('Python Variables')).toBeTruthy();
  });

  it('filters topics dynamically when search query is entered', () => {
    render(
      <TutorialSidebar
        language="python"
        topics={sampleTopics}
        activeTopicId="topic-1"
        onSelectTopic={vi.fn()}
        learnedTopicIds={new Set()}
      />
    );

    const searchInput = screen.getByPlaceholderText(/Filter.*topics/i);
    fireEvent.change(searchInput, { target: { value: 'Variables' } });

    expect(screen.getByText('Python Variables')).toBeTruthy();
    expect(screen.queryByText('Python Syntax')).toBeNull();
    expect(screen.queryByText('Python If Else')).toBeNull();
  });

  it('triggers onSelectTopic when a topic link is clicked', () => {
    const onSelect = vi.fn();
    render(
      <TutorialSidebar
        language="python"
        topics={sampleTopics}
        activeTopicId="topic-1"
        onSelectTopic={onSelect}
        learnedTopicIds={new Set()}
      />
    );

    fireEvent.click(screen.getByText('Python Variables'));
    expect(onSelect).toHaveBeenCalledWith('topic-2');
  });

  it('displays learned checkmarks for completed topics', () => {
    render(
      <TutorialSidebar
        language="python"
        topics={sampleTopics}
        activeTopicId="topic-1"
        onSelectTopic={vi.fn()}
        learnedTopicIds={new Set(['topic-1'])}
      />
    );

    expect(screen.getByTestId('learned-topic-1')).toBeTruthy();
    expect(screen.queryByTestId('learned-topic-2')).toBeNull();
  });
});

describe('LiveExampleCard Component', () => {
  it('renders example code and handles "Try It Live »" click', () => {
    const onTry = vi.fn();
    render(
      <ExampleCard
        title="Example"
        code='print("Hello, World!")'
        explanation="Print text to standard output"
        onTryItYourself={onTry}
      />
    );

    expect(screen.getByText('Example')).toBeTruthy();
    expect(screen.getByText(/Hello, World!/)).toBeTruthy();

    const tryBtn = screen.getByRole('button', { name: /Try It Live|Try it Yourself/i });
    fireEvent.click(tryBtn);
    expect(onTry).toHaveBeenCalled();
  });
});

describe('W3Schools ExerciseBox Component', () => {
  const sampleQuiz = {
    question: 'Which keyword defines a function in Python?',
    options: ['func', 'def', 'function', 'define'],
    correctAnswerIndex: 1,
    explanation: "'def' is used in Python to define functions.",
  };

  it('renders question and options', () => {
    render(<ExerciseBox quiz={sampleQuiz} onCorrect={vi.fn()} />);

    expect(screen.getByText(/Test Yourself With Exercises/i)).toBeTruthy();
    expect(screen.getByText(sampleQuiz.question)).toBeTruthy();
    sampleQuiz.options.forEach((opt) => {
      expect(screen.getByText(opt)).toBeTruthy();
    });
  });

  it('gives immediate feedback on correct answer and triggers onCorrect callback', () => {
    const onCorrect = vi.fn();
    render(<ExerciseBox quiz={sampleQuiz} onCorrect={onCorrect} />);

    // Select correct answer ('def')
    const correctOption = screen.getByLabelText('def');
    fireEvent.click(correctOption);

    const submitBtn = screen.getByRole('button', { name: /Submit Answer/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Correct!/i)).toBeTruthy();
    expect(onCorrect).toHaveBeenCalled();
  });

  it('displays error notice on wrong answer and allows retry', () => {
    const onCorrect = vi.fn();
    render(<ExerciseBox quiz={sampleQuiz} onCorrect={onCorrect} />);

    // Select incorrect answer ('func')
    const wrongOption = screen.getByLabelText('func');
    fireEvent.click(wrongOption);

    const submitBtn = screen.getByRole('button', { name: /Submit Answer/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Not quite! Try again/i)).toBeTruthy();
    expect(onCorrect).not.toHaveBeenCalled();
  });
});
