import create from 'zustand';
import { persist } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';
import { State, Actions, Persist } from './types';

const persistStore = create<State & Actions>(
    (persist as Persist)(
        set => ({
            isAutherized: false,
            authType: '',
            isDeviceRegistered: false,
            deviceUniqueId: null,
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
        }),
        {
            name: 'auth-storage',
            getStorage: () => EncryptedStorage,
        },
    ),
);

export default persistStore;