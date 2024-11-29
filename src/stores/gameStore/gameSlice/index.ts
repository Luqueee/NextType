import type { StateCreator } from "zustand";

type InputStat = { index: number; wpm: number };

interface GameStoreSliceState {
  game: {
    words: string;
    words_mached: string;
    words_split: string[];
    cursor: number;
    words_length: number;
    stats: InputStat[];
    sentence: string;
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

  setSentence: (sentence: string) => void;

  reset: () => void;
}

export type GameStoreSlice = GameStoreSliceState & GameStoreSliceActions;

const initialState: GameStoreSliceState = {
  game: {
    words: "",
    words_mached: "",
    words_split: [],
    cursor: 0,
    words_length: 5,
    stats: [],
    sentence: "",
  },
  time: 0,
  wpm: 0,
  isPlaying: false,
};

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

  appendStat: (stat) =>
    set((state) => ({
      game: { ...state.game, stats: [...state.game.stats, stat] },
    })),
  getStats: () => get().game.stats,
  setStats: (stats) => set((state) => ({ game: { ...state.game, stats } })),
  removeStat: (index) =>
    set((state) => ({
      game: {
        ...state.game,
        stats: state.game.stats.filter((_, i) => i !== index),
      },
    })),

  setSentence: (sentence) =>
    set((state) => ({ game: { ...state.game, sentence } })),

  reset: () =>
    set((state) => ({
      game: {
        ...initialState.game,
        words_length: state.game.words_length,
        sentence: state.game.sentence,
      },
      time: initialState.time,
      wpm: initialState.wpm,
      isPlaying: initialState.isPlaying,
    })),
});
