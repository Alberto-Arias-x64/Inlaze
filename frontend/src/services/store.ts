/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { create } from "zustand";

interface Store {
  user: string | null;
  setUser: (token: string | null) => void;
  loginModal: boolean;
  setLoginModal: (value: boolean) => void;
}

const useStore = create<Store>((set) => ({
  user: null,
  loginModal: false,
  setUser: (token) => set({ user: token }),
  setLoginModal: (value) => set({ loginModal: value }),
}));

export default useStore;
