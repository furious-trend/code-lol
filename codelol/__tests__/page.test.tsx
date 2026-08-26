import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Home from '../app/page'

// Mock the dependencies
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({ data: { user: null } }),
    },
  })),
}))

vi.mock('@/lib/jokes', () => ({
  getJokeOfTheDay: vi.fn(() => 'Test Joke'),
}))

test('renders Learn option on the home page', async () => {
  // Since Home is an async component, we resolve it first
  const page = await Home()
  render(page)
  
  // Look for the heading of the card
  const learnHeading = screen.getByRole('heading', { name: /Learn/i })
  expect(learnHeading).toBeDefined()
  
  // Look for the link
  const learnLink = screen.getByRole('link', { name: /Learn.*Guides to master coding/i })
  expect(learnLink).toBeDefined()
})
