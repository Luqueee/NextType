import type { StateCreator } from "zustand";


type InputStat = {index: number, wpm: number}

interface GameStoreSliceState {
  game: {
    words: string;
    words_mached: string;
    words_split: string[];
    cursor: number;
    words_length: number;
    stats: InputStat[];
  };

  time: number;
  wpm: number;
  isPlaying: boolean;
}


interface GameStoreSliceActions {
  setWords: (words: string) => void;
  getWords: () => string;
  getWordsSplit: () => string[];
  setWordsLength: (length: number) => void;
  setWordsMached: (words: string) => void;

  setWordsSplit: (words: string[]) => void;

  setCursor: (cursor: number) => void;
  getCursor: () => number;

  setWpm: (wpm: number) => void;
  getWpm: () => number;

  setTime: (time: number) => void;
  getTime: () => number;

  toggleIsPlaying: () => void;
  getPlaying: () => boolean;
  setIsPlaying: (isPlaying: boolean) => void;

  getGame: () => GameStoreSliceState["game"];

  appendStat: (stat: InputStat) => void;
  getStats: () => InputStat[];
  setStats: (stats: InputStat[]) => void;
  removeStat: (index: number) => void;

  reset: () => void;
}

export type GameStoreSlice = GameStoreSliceState & GameStoreSliceActions;

const initialState: GameStoreSliceState = {
  game: {
    words: "",
    words_mached: "",
    words_split: [],
    cursor: 0,
    words_length: 10,
    stats: [],
  },
  time: 0,
  wpm: 0,
  isPlaying: false,
};

// const initialState: GameStoreSliceState = {
//   game: {
//     "words": "oohed truly vamps talas rajas toric drink randy cusks exit",
//     "words_mached": "   s     s e",
//     "words_split": [
//         "o",
//         "o",
//         "h",
//         "e",
//         "d",
//         " ",
//         "t",
//         "r",
//         "u",
//         "l",
//         "y",
//         " ",
//         "v",
//         "a",
//         "m",
//         "p",
//         "s",
//         " ",
//         "t",
//         "a",
//         "l",
//         "a",
//         "s",
//         " ",
//         "r",
//         "a",
//         "j",
//         "a",
//         "s",
//         " ",
//         "t",
//         "o",
//         "r",
//         "i",
//         "c",
//         " ",
//         "d",
//         "r",
//         "i",
//         "n",
//         "k",
//         " ",
//         "r",
//         "a",
//         "n",
//         "d",
//         "y",
//         " ",
//         "c",
//         "u",
//         "s",
//         "k",
//         "s",
//         " ",
//         "e",
//         "x",
//         "i",
//         "t"
//     ],
//     "cursor": 58,
//     "words_length": 10,
//     "stats": [
//         {
//             "index": 5,
//             "wpm": 0
//         },
//         {
//             "index": 10,
//             "wpm": 2
//         },
//         {
//             "index": 15,
//             "wpm": 4
//         },
//         {
//             "index": 15,
//             "wpm": 3
//         },
//         {
//             "index": 20,
//             "wpm": 5
//         },
//         {
//             "index": 25,
//             "wpm": 8
//         },
//         {
//             "index": 30,
//             "wpm": 6
//         },
//         {
//             "index": 35,
//             "wpm": 7
//         },
//         {
//             "index": 40,
//             "wpm": 7
//         },
//         {
//             "index": 45,
//             "wpm": 7
//         },
//         {
//             "index": 50,
//             "wpm": 8
//         },
//         {
//             "index": 55,
//             "wpm": 9
//         }
//     ]
// },
//   time: 20,
//   wpm: 10,
//   isPlaying: false,
// };

export const createGameSlice: StateCreator<GameStoreSlice> = (set, get) => ({
  ...initialState,

  setWords: (words) => set((state) => ({ game: { ...state.game, words } })),
  setWordsMached: (words) =>
    set((state) => ({ game: { ...state.game, words_mached: words } })),
  getWords: () => get().game.words,
  getWordsSplit: () => get().game.words_split,
  setWordsLength: (length) =>
    set((state) => ({ game: { ...state.game, words_length: length } })),
  setWordsSplit: (words) =>
    set((state) => ({ game: { ...state.game, words_split: words } })),

  setCursor: (cursor) => set((state) => ({ game: { ...state.game, cursor } })),
  getCursor: () => get().game.cursor,

  setTime: (time) => set({ time }),
  getTime: () => get().time,

  setWpm: (wpm) => set({ wpm }),
  getWpm: () => get().wpm,

  toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  getPlaying: () => get().isPlaying,

  getGame: () => get().game,

  appendStat: (stat) => set((state) => ({ game: { ...state.game, stats: [...state.game.stats, stat] } })),
  getStats: () => get().game.stats,
  setStats: (stats) => set((state) => ({ game: { ...state.game, stats } })),
  removeStat: (index) =>
    set((state) => ({
      game: {
        ...state.game,
        stats: state.game.stats.filter((_, i) => i !== index),
      },
    })),

  reset: () => set(initialState),
});
