import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getRemoteStores } from './storeManager';

interface CombinedState {
  count: number;
  name: string;
  isStoreLoaded: boolean;
  increase: () => void;
  decrease: () => void;
  updateName: (newName: string) => void;
  setStoreLoaded: (loaded: boolean) => void;
}

const useStore = create<CombinedState>()(
  persist(
    (set, get) => ({
      count: 0,
      name: '',
      isStoreLoaded: false,

      increase: () => {
        const { counterStore } = getRemoteStores();
        if (counterStore) {
          counterStore.getState().increase();
          set({ count: counterStore.getState().count });
        }
      },

      decrease: () => {
        const { counterStore } = getRemoteStores();
        if (counterStore) {
          counterStore.getState().decrease();
          set({ count: counterStore.getState().count });
        }
      },

      updateName: (newName: string) => {
        const { nameStore } = getRemoteStores();
        if (nameStore) {
          nameStore.getState().updateName(newName);
          set({ name: nameStore.getState().name });
        }
      },

      setStoreLoaded: (loaded: boolean) => {
        set({ isStoreLoaded: loaded });
      }
    }),
    {
      name: 'combined-store',
    }
  )
);

export default useStore;