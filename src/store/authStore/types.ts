import { StateCreator } from 'zustand';
import { PersistOptions } from 'zustand/middleware';

type AuthType = 'social' | 'general' | '';

export type State = {
    isAutherized: boolean;
    authType: AuthType;
    isDeviceRegistered: boolean; // For notifications
};

export type Actions = {
    setIsAutherized: (isAutherized: boolean) => void;
    setAuthType: (authType: AuthType) => void;
    setIsDeviceRegistered: (isDeviceRegistered: boolean) => void; // For notifications
};

export type Persist = (
    config: StateCreator<State & Actions>,
    options: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;
