export type RoastMood = 
  | 'facepalm'
  | 'mind_blown'
  | 'dead'
  | 'screaming'
  | 'crying_laughing'
  | 'done'
  | 'disaster'
  | 'relief';

export const moodToGifKeyword: Record<RoastMood, string> = {
  facepalm: "facepalm meme",
  mind_blown: "mind blown reaction",
  dead: "im dead lol",
  screaming: "internal screaming",
  crying_laughing: "crying laughing meme",
  done: "im done reaction",
  disaster: "this is fine fire",
  relief: "phew relief meme"
};
