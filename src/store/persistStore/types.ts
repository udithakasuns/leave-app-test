import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

export type State = {
    deviceUniqueId: string | null; // For notifications
};

export type Actions = {
    setDeviceUniqueId: (deviceUniqueId: string | null) => void;
};

export type Persist = (
    config: StateCreator<State & Actions>,
    options: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;
