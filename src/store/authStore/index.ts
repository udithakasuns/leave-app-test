import create from 'zustand';
import { persist } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';
import { State, Actions, Persist } from './types';

const authStore = create<State & Actions>(
    (persist as Persist)(
        set => ({
            isAutherized: false,
            authType: '',
            setIsAutherized: isAutherized =>
                set(() => ({
                    isAutherized,
                })),
            setAuthType: authType =>
                set(() => ({
                    authType,
                })),
        }),
        {
            name: 'auth-storage',
            getStorage: () => EncryptedStorage,
        },
    ),
);

export default authStore;
