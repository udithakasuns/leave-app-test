import create, { StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import EncryptedStorage from 'react-native-encrypted-storage';
import { State, Actions } from './types';

type Persist = (
    config: StateCreator<State & Actions>,
    options: PersistOptions<State & Actions>,
) => StateCreator<State & Actions>;

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
