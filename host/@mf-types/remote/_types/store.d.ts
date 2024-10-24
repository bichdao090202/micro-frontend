export interface CounterState {
    count: number;
    increase: () => void;
    decrease: () => void;
}
declare const useStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<CounterState>, "persist"> & {
    persist: {
        setOptions: (options: Partial<import("zustand/middleware").PersistOptions<CounterState, CounterState>>) => void;
        clearStorage: () => void;
        rehydrate: () => Promise<void> | void;
        hasHydrated: () => boolean;
        onHydrate: (fn: (state: CounterState) => void) => () => void;
        onFinishHydration: (fn: (state: CounterState) => void) => () => void;
        getOptions: () => Partial<import("zustand/middleware").PersistOptions<CounterState, CounterState>>;
    };
}>;
export default useStore;
