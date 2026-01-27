import { create } from "zustand";

const useBearStore = create((set) => ({
  count: 0,
  bears: [],

  increasePopulation: () => set((state) => ({ count: state.count + 1 })),
  removeAllBears: () => {
    set({ count: 0, bears: [] });
  },
  updateBears: (newBears) => set({ count: newBears }),

  fetchBears: async () => {
    try {
      const request = await fetch(
          `https://694eda01b5bc648a93c1705e.mockapi.io/posts`,
        ),
        response = await request.json();

      set(() => ({ bears: response, count: response.length }));
    } catch (error) {
      throw new Error(error);
    }
  },
}));

export default useBearStore;
