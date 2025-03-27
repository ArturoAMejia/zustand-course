import { type StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { customSessionStorage } from "../storages/session-storage.store";

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

// Extrayendo toda la función del store
const storeAPI: StateCreator<
  PersonState & Actions,
  [["zustand/devtools", never]]
> = (set) => ({
  firstName: "",
  lastName: "",
  // Add name to action on redux devtools
  setFirstName: (value: string) =>
    set({ firstName: value }, false, "setFirstName"),
  setLastName: (value: string) =>
    set({ lastName: value }, false, "setLastName"),
});

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(storeAPI, {
      name: "person-store",
      storage: customSessionStorage,
    }),
  ),
);
