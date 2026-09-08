import manifest from './gifManifest.json';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://brxautcammfkxupmweyc.supabase.co';
const supabaseStorageUrl = `${supabaseUrl}/storage/v1/object/public/gifs`;

const toSupabaseUrl = (path: string) => {
  return path.replace(/^\/gifs/, supabaseStorageUrl);
};

export const tamilHappyGifs = manifest.tamil.right.map(toSupabaseUrl);
export const tamilRoastingGifs = manifest.tamil.wrong.map(toSupabaseUrl);
export const generalHappyGifs = manifest.general.right.map(toSupabaseUrl);
export const generalRoastingGifs = manifest.general.wrong.map(toSupabaseUrl);

export function getResultGif(isCorrect: boolean, humorPref: 'general' | 'tamil' = 'general'): string {
  const happyGifs = humorPref === 'tamil' && tamilHappyGifs.length > 0 ? tamilHappyGifs : generalHappyGifs;
  const roastingGifs = humorPref === 'tamil' && tamilRoastingGifs.length > 0 ? tamilRoastingGifs : generalRoastingGifs;
  
  const array = isCorrect ? happyGifs : roastingGifs;
  if (!array || array.length === 0) {
    if (humorPref === 'tamil') {
      return toSupabaseUrl(isCorrect ? "/gifs/tamil/right/placeholder.gif" : "/gifs/tamil/wrong/placeholder.gif");
    }
    return toSupabaseUrl(isCorrect ? "/gifs/general/right/placeholder.gif" : "/gifs/general/wrong/placeholder.gif");
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
