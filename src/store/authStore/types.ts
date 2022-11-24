import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export type State = {
    isAutherized: boolean;
};

export type Actions = {
    setIsAutherized: (isAutherized: boolean) => void;
};

export type Persist = (
    config: StateCreator<State & Actions>,
    options: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;
