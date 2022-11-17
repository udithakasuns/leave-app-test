import create from 'zustand';
import { State, Actions } from './types';

const initialState: State = {
    userId: -1,
    username: '',
    email: '',
    active: false,
    loading: false,
};

const userStore = create<State & Actions>(set => ({
    ...initialState,
    saveUser: (user: State) => set(() => ({ ...user })),
    removeUser: () => set(state => ({ ...state, ...initialState })),
    setLoading: loading => set(state => ({ ...state, loading })),
}));

export default userStore;
