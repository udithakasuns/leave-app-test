import { getHttpNotificationCount } from 'src/services/http';
import create from 'zustand';
import { State, Actions } from './types';

const initialState: State = {
    count: '',
    isPopupVisible: false,
};

const notificationStore = create<State & Actions>(set => ({
    ...initialState,
    getCount: async () => {
        // Need update the userRole
        const res = await getHttpNotificationCount('MANAGER');
        const { count }: { count: number } = res.data.results[0];
        set(state => ({
            ...state,
            count,
        }));
    },
    setIsPopupVisible: isPopupVisible =>
        set(state => ({ ...state, isPopupVisible })),
}));

export default notificationStore;
