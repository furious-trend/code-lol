import manifest from './gifManifest.json';

// Provide arrays directly from manifest
export const tamilHappyGifs = manifest.tamil.right;
export const tamilRoastingGifs = manifest.tamil.wrong;
export const generalHappyGifs = manifest.general.right;
export const generalRoastingGifs = manifest.general.wrong;

export function getResultGif(isCorrect: boolean, humorPref: 'general' | 'tamil' = 'general'): string {
  const happyGifs = humorPref === 'tamil' && tamilHappyGifs.length > 0 ? tamilHappyGifs : generalHappyGifs;
  const roastingGifs = humorPref === 'tamil' && tamilRoastingGifs.length > 0 ? tamilRoastingGifs : generalRoastingGifs;
  
  const array = isCorrect ? happyGifs : roastingGifs;
  // Fallback to placeholder if manifest is empty for some reason
  if (!array || array.length === 0) {
    if (humorPref === 'tamil') {
      return isCorrect ? "/gifs/tamil/right/placeholder.gif" : "/gifs/tamil/wrong/placeholder.gif";
    }
    return isCorrect ? "/gifs/general/right/placeholder.gif" : "/gifs/general/wrong/placeholder.gif";
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
