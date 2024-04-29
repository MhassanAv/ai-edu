import axios from "axios";
import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  setUser: (userData) => set({user:userData}),
  page:'Members',
  setPage: (newPage) => set({page:newPage})
})); 

export default useStore;
