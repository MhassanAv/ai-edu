import axios from "axios";
import { create } from "zustand";

const useStore = create((set) => ({
  user: null,
  signIn: (userData) => set({user:userData}),
  signOut: () => set({user:null})
})); 

export default useStore;
