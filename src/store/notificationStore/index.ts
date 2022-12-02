import { getHttpNotificationCount } from 'src/services/http';
import create from 'zustand';
import { State, Actions } from './types';

const initialState: State = {
    count: '',
};

const notificationStore = create<State & Actions>(set => ({
    ...initialState,
    getCount: async () => {
        const res = await getHttpNotificationCount();
        const { count }: { count: number } = res.data.results[0];
        set(state => ({
            ...state,
            count,
        }));
    },
}));

export default notificationStore;
