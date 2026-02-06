import { create } from "zustand";

export type SortBy = "date-asc" | "price-asc" | "price-desc";

type State = {
  artist: string;
  sortBy: SortBy;
  searchText: string;

  setArtist: (v: string) => void;
  setSortBy: (v: SortBy) => void;
  setSearchText: (v: string) => void;

  reset: () => void;
};

export const useConcertsFiltersStore = create<State>((set) => ({
  artist: "all",
  sortBy: "date-asc",
  searchText: "",

  setArtist: (v) => set({ artist: v }),
  setSortBy: (v) => set({ sortBy: v }),
  setSearchText: (v) => set({ searchText: v }),

  reset: () => set({ artist: "all", sortBy: "date-asc", searchText: "" }),
}));