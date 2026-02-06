import { create } from "zustand";

const KEY = "authToken";

type AuthState = {
  isAuthed: boolean;
  login: () => void;
  logout: () => void;
  sync: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthed: Boolean(localStorage.getItem(KEY)),
  sync: () => set({ isAuthed: Boolean(localStorage.getItem(KEY)) }),
  login: () => {
    localStorage.setItem(KEY, "fake-token");
    set({ isAuthed: true });
  },
  logout: () => {
    localStorage.removeItem(KEY);
    set({ isAuthed: false });
  },
}));