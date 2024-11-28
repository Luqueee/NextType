import { create } from "zustand";
//import { createGameSlice, type GameStoreSlice } from "./gameSlice";
import { createGameSlice, type GameStoreSlice } from "./gameSlice";

// const useGameStore: StateCreator<GameStoreSlice> = create<GameStore>()(
//   (set, get) => ({
//     ...initialState,
//     ...createGameSlice(set, get),
//     toggleIsPlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
//     setWordsLength: (length) => set({ words_length: length }),
//     setWords: (words) => set({ words }),
//     getWords: () => get().words,
//     setWordsSplit: (words) => set({ words_split: words }),
//     getWordsSplit: () => get().words_split,
//     setCursor: (cursor) => set({ cursor }),
//     getCursor: () => get().cursor,

//     getPlaying: () => get().isPlaying,
//     reset: () => set(initialState),
//   })
// );

type CombinedStoreSlice = GameStoreSlice;

export const useGameStoreBase = create<CombinedStoreSlice>((...a) => ({
  ...createGameSlice(...a),
}));

export default useGameStoreBase;
