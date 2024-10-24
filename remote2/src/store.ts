import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface NameState {
    name: string;
    updateName: (newName: string) => void;
}

const useStore = create<NameState>()(
    persist(
      (set) => ({
        name: '',
        updateName: (newName: string) => set({ name: newName }),
      }),
      {
        name: 'name-session-storage', 
      }
    )
);

export default useStore;
