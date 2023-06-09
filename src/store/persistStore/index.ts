import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';
import { State, Actions, Persist } from './types';

const initialState: State = {
    deviceUniqueId: null,
    manager: {
        filteredTeams: [],
    },
};

const persistStore = create<State & Actions>(
    (persist as Persist)(
        set => ({
            ...initialState,
            setDeviceUniqueId: deviceUniqueId =>
                set(() => ({
                    deviceUniqueId,
                })),
            setManagerFilteredTeams: filteredTeams =>
                set(() => ({
                    manager: {
                        filteredTeams,
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
