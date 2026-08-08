export type RoastMood = 
  | 'facepalm'
  | 'mind_blown'
  | 'dead'
  | 'screaming'
  | 'crying_laughing'
  | 'done'
  | 'disaster'
  | 'relief'
  | 'party'
  | 'genius'
  | 'happy';

export const moodToGifKeyword: Record<RoastMood, string> = {
  facepalm: "vadivelu facepalm reaction",
  mind_blown: "vivek shocked reaction",
  dead: "vadivelu crying reaction",
  screaming: "santhanam screaming reaction",
  crying_laughing: "yogi babu laughing reaction",
  done: "goundamani frustrated reaction",
  disaster: "seeman angry reaction",
  relief: "vadivelu relief sigh reaction",
  party: "tamil kuthu dance celebration",
  genius: "santhanam smart thinking reaction",
  happy: "soori happy smile reaction"
};
