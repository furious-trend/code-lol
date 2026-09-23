// agent-notes: { ctx: "Unit tests for reaction GIF selector across general and tamil", deps: ["../lib/localGifs"], state: active, last: "sato@2026-09-23" }
import { expect, test } from 'vitest'
import { 
  getResultGif, 
  tamilHappyGifs, 
  tamilRoastingGifs, 
  generalHappyGifs, 
  generalRoastingGifs 
} from '../lib/localGifs'

test('getResultGif returns a random gif from tamilHappyGifs when isCorrect is true and humorPref is tamil', () => {
  const gif = getResultGif(true, 'tamil')
  if (tamilHappyGifs && tamilHappyGifs.length > 0) {
    expect(tamilHappyGifs).toContain(gif)
  } else {
    expect(gif).toBe('/gifs/tamil/right/placeholder.gif')
  }
})

test('getResultGif returns a random gif from tamilRoastingGifs when isCorrect is false and humorPref is tamil', () => {
  const gif = getResultGif(false, 'tamil')
  if (tamilRoastingGifs && tamilRoastingGifs.length > 0) {
    expect(tamilRoastingGifs).toContain(gif)
  } else {
    expect(gif).toBe('/gifs/tamil/wrong/placeholder.gif')
  }
})

test('getResultGif returns a random gif from generalHappyGifs when isCorrect is true and humorPref is general', () => {
  const gif = getResultGif(true, 'general')
  expect(generalHappyGifs).toContain(gif)
})

test('getResultGif returns a random gif from generalRoastingGifs when isCorrect is false and humorPref is general', () => {
  const gif = getResultGif(false, 'general')
  expect(generalRoastingGifs).toContain(gif)
})
