import { expect, test } from 'vitest'
import { getResultGif, happyGifs, roastingGifs } from '../lib/localGifs'

test('getResultGif returns a random gif from happyGifs when isCorrect is true', () => {
  const gif = getResultGif(true)
  expect(happyGifs).toContain(gif)
})

test('getResultGif returns a random gif from roastingGifs when isCorrect is false', () => {
  const gif = getResultGif(false)
  expect(roastingGifs).toContain(gif)
})
