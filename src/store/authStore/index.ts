import create from 'zustand';
import { persist } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';
import { State, Actions, Persist } from './types';

const authStore = create<State & Actions>(
    (persist as Persist)(
        set => ({
            isAutherized: false,
            setIsAutherized: isAutherized =>
                set(() => ({
                    isAutherized,
                })),
        }),
        {
            name: 'auth-storage',
            getStorage: () => EncryptedStorage,
        },
    ),
);

export default authStore;
