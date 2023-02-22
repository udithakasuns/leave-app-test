import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';
import { State, Actions, Persist } from './types';

const initialState: State = {
    isAutherized: false,
    authType: '',
    deviceUniqueId: null,
    manager: {
        selectedTeams: [],
    },
};

const persistStore = create<State & Actions>(
    (persist as Persist)(
        set => ({
            ...initialState,
            setIsAutherized: isAutherized =>
                set(() => ({
                    isAutherized,
                })),
            setAuthType: authType =>
                set(() => ({
                    authType,
                })),
            setDeviceUniqueId: deviceUniqueId =>
                set(() => ({
                    deviceUniqueId,
                })),
            setManagerTeams: managerTeams =>
                set(() => ({
                    manager: {
                        selectedTeams: managerTeams,
                    },
                })),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => EncryptedStorage),
        },
    ),
);

export default persistStore;
