import { create } from "zustand";

export type SortBy = "date-asc" | "price-asc" | "price-desc";

type State = {
  airline: string;
  sortBy: SortBy;
  searchText: string;

  setAirline: (v: string) => void;
  setSortBy: (v: SortBy) => void;
  setSearchText: (v: string) => void;

  reset: () => void;
};

export const useFlightsFiltersStore = create<State>((set) => ({
  airline: "all",
  sortBy: "date-asc",
  searchText: "",

  setAirline: (v) => set({ airline: v }),
  setSortBy: (v) => set({ sortBy: v }),
  setSearchText: (v) => set({ searchText: v }),

  reset: () => set({ airline: "all", sortBy: "date-asc", searchText: "" }),
}));