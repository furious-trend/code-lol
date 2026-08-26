import manifest from './gifManifest.json';

export const happyGifs = manifest.happy;
export const roastingGifs = manifest.roasting;

export function getResultGif(isCorrect: boolean): string {
  const array = isCorrect ? happyGifs : roastingGifs;
  // Fallback to placeholder if manifest is empty for some reason
  if (!array || array.length === 0) {
    return isCorrect ? "/gifs/happy/reaction-1.gif" : "/gifs/roasting/reaction-1.gif";
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
