import manifest from './gifManifest.json';

const cdnUrl = process.env.NEXT_PUBLIC_SUPABASE_URL 
  ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/gifs` 
  : '';

// Helper to convert manifest paths (e.g. "/gifs/tamil/right/1.gif") to CDN paths
const toCdnPath = (path: string) => cdnUrl ? `${cdnUrl}${path.replace('/gifs', '')}` : path;

export const tamilHappyGifs = manifest.tamil.right.map(toCdnPath);
export const tamilRoastingGifs = manifest.tamil.wrong.map(toCdnPath);
export const generalHappyGifs = manifest.general.right.map(toCdnPath);
export const generalRoastingGifs = manifest.general.wrong.map(toCdnPath);

export function getResultGif(isCorrect: boolean, humorPref: 'general' | 'tamil' = 'general'): string {
  const happyGifs = humorPref === 'tamil' && tamilHappyGifs.length > 0 ? tamilHappyGifs : generalHappyGifs;
  const roastingGifs = humorPref === 'tamil' && tamilRoastingGifs.length > 0 ? tamilRoastingGifs : generalRoastingGifs;
  
  const array = isCorrect ? happyGifs : roastingGifs;
  // Fallback to placeholder if manifest is empty for some reason
  if (!array || array.length === 0) {
    if (humorPref === 'tamil') {
      return toCdnPath(isCorrect ? "/gifs/tamil/right/placeholder.gif" : "/gifs/tamil/wrong/placeholder.gif");
    }
    return toCdnPath(isCorrect ? "/gifs/general/right/placeholder.gif" : "/gifs/general/wrong/placeholder.gif");
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
