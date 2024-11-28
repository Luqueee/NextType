import type { StateCreator } from "zustand";

interface GameStoreSliceState {
  game: {
    words: string;
    words_mached: string;
    words_split: string[];
    cursor: number;
    words_length: number;
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

  getGame: () => GameStoreSliceState["game"];

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
  getPlaying: () => get().isPlaying,

  getGame: () => get().game,

  reset: () => set(initialState),
});
