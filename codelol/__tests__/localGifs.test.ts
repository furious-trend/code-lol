import { expect, test } from 'vitest'
import { getResultGif, happyGifs, roastingGifs } from '../lib/localGifs'

test('getResultGif returns a random gif from happyGifs when isCorrect is true', () => {
  const gif = getResultGif(true)
  if (happyGifs && happyGifs.length > 0) {
    expect(happyGifs).toContain(gif)
  } else {
    expect(gif).toBe('/gifs/tamil/right/placeholder.gif')
  }
})

test('getResultGif returns a random gif from roastingGifs when isCorrect is false', () => {
  const gif = getResultGif(false)
  if (roastingGifs && roastingGifs.length > 0) {
    expect(roastingGifs).toContain(gif)
  } else {
    expect(gif).toBe('/gifs/tamil/wrong/placeholder.gif')
  }
})
