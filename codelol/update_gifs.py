import json

with open("lib/localGifs.ts", "w") as f:
    f.write("""import manifest from './gifManifest.json';

// General gifs (can be used as fallbacks)
export const happyGifs = manifest.general.right;
export const roastingGifs = manifest.tamil.wrong.length > 0 ? manifest.tamil.wrong : manifest.general.wrong;

export function getResultGif(isCorrect: boolean): string {
  const array = isCorrect ? happyGifs : roastingGifs;
  // Fallback to placeholder if manifest is empty for some reason
  if (!array || array.length === 0) {
    return isCorrect ? "/gifs/general/right/placeholder.gif" : "/gifs/tamil/wrong/placeholder.gif";
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
""")
