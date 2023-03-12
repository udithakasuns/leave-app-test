import { Team } from 'src/utils/types';
import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

type Manager = {
    filteredTeams: Team[];
};

export type State = {
    deviceUniqueId: string | null; // For notifications
    manager: Manager;
};

export type Actions = {
    setDeviceUniqueId: (deviceUniqueId: string | null) => void;
    setManagerFilteredTeams: (filteredTeams: Team[]) => void;
};

export type Persist = (
    config: StateCreator<State & Actions>,
    options: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;
