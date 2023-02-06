import { getHttpNotificationCount } from 'src/services/http';
import { create } from 'zustand';
import { State, Actions } from './types';

const initialState: State = {
    count: '',
    isPopupVisible: false,
    notifyUserRole: 'EMPLOYEE',
};

const notificationStore = create<State & Actions>(set => ({
    ...initialState,
    getCount: async userRole => {
        const res = await getHttpNotificationCount(userRole);
        const { count }: { count: number } = res.data.results[0];
        set(() => ({
            count,
            notifyUserRole: userRole,
        }));
    },
    resetCount: () => set(() => ({ count: '' })),
    setIsPopupVisible: isPopupVisible => set(() => ({ isPopupVisible })),
}));

export default notificationStore;
