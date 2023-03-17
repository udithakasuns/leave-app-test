import { getHttpRecipients } from 'services/http';
import { Manager } from 'utils/types';
import { create } from 'zustand';
import { Actions, State } from './types';

const initialManager: Manager = {
    authPic: '',
    designation: '',
    employeeId: '',
    name: '',
    identificationNo: '',
    lastName: '',
    permission: 'EMPLOYEES',
};

const initialState: State = {
    managers: [initialManager],
    loading: false,
    error: '',
};

const recipientStore = create<State & Actions>(set => ({
    ...initialState,
    updateRecipients: async () => {
        const res = await getHttpRecipients();
        const managersData: [Manager] = res.results[0].items;
        set(state => ({
            ...state,
            managers: managersData,
        }));
    },
    removeUserRecipients: () =>
        set(state => ({ ...state, user: initialManager })),
}));

export default recipientStore;
