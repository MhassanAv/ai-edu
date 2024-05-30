import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  token: null,
  setUser: (data) => set({ user: data.user, token: data.token }),
  page: null,
  setPage: (newPage) => set({ page: newPage }),
}));

export default useStore;
