import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';

export interface CounterState {
    count: number;
    increase: () => void;
    decrease: () => void;
}

// const useStore = create<CounterState>((set) => ({
//     count: 0,
//     increase: () => set((state) => ({ count: state.count + 1 })),
//     decrease: () => set((state) => ({ count: state.count - 1 })),
// }));

const useStore = create<CounterState>()(
    persist(
      (set) => ({
        count: 0,
        increase: () => set((state) => ({ count: state.count + 1 })),
        decrease: () => set((state) => ({ count: state.count - 1 })),
      }),
      {
        name: 'counter-session-storage',
      }
    )
  );
export default useStore;
