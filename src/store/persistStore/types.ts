import { SelectedTeam } from 'src/utils/types';
import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

type AuthType = 'social' | 'general' | '';

type Manager = {
    selectedTeams: SelectedTeam[];
};

export type State = {
    isAutherized: boolean; // For authentication
    authType: AuthType; // For authentication
    deviceUniqueId: string | null; // For notifications
    manager: Manager;
};

export type Actions = {
    setIsAutherized: (isAutherized: boolean) => void; // For authentication
    setAuthType: (authType: AuthType) => void; // For authentication
    setDeviceUniqueId: (deviceUniqueId: string | null) => void;
    setManagerTeams: (selectedTeams: SelectedTeam[]) => void;
};

export type Persist = (
    config: StateCreator<State & Actions>,
    options: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;
