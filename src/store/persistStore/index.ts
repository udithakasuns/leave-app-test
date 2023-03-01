import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';
import { State, Actions, Persist } from './types';

const persistStore = create<State & Actions>(
    (persist as Persist)(
        set => ({
            isDeviceRegistered: false,
            deviceUniqueId: null,
            setDeviceUniqueId: deviceUniqueId =>
                set(() => ({
                    deviceUniqueId,
                })),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => EncryptedStorage),
        },
    ),
);

export default persistStore;
