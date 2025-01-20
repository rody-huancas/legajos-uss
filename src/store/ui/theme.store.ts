import { devtools, persist } from "zustand/middleware";
import { StateCreator, create } from "zustand";

export interface ThemeState {
  menuIsOpen   : boolean;
  setMenuIsOpen: (value: boolean) => void;
}
const storeApi: StateCreator<ThemeState> = (set) => ({
  menuIsOpen: false,
  setMenuIsOpen: (value: boolean) => set({ menuIsOpen: value }),
});

export const useThemeStore = create<ThemeState>()(
  devtools(persist(storeApi, { name: "uss-theme-ui" }))
);