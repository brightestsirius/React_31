import { create } from "zustand";

const useBearsStore = create((set) => ({
  bears: 0,
  bearsTitles: [],

  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),

  fetchBears: async () => {
    try {
      const request = await fetch(
          `https://jsonplaceholder.typicode.com/todos/`,
        ),
        response = await request.json();

      set({ bearsTitles: response, bears: response.length });
    } catch (err) {
      throw new Error(err);
    }
  },
}));

export default useBearsStore;
