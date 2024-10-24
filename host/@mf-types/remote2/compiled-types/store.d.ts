export interface NameState {
    name: string;
    updateName: (newName: string) => void;
}
declare const useStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<NameState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<NameState, NameState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: NameState) => void) => () => void;
        onFinishHydration: (fn: (state: NameState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<NameState, NameState>>;
    };
}>;
export default useStore;
