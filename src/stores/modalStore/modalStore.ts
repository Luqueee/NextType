import { create } from "zustand";
import { createFinishStoreSlice, type FinishStoreSlice } from "./finishGameSlice";


type CombinedStoreSlice = FinishStoreSlice;

export const useFinishStoreBase = create<CombinedStoreSlice>((...a) => ({
  ...createFinishStoreSlice(...a),
}));

export default useFinishStoreBase;
