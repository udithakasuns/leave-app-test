import { getHttpRecipients } from 'services/http';
import { EmployeeType } from 'utils/types';
import create from 'zustand';
import { Actions, State } from './types';

const initialManager = {
    authPic: '',
    designation: '',
    employeeId: '',
    name: '',
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
        const managersData: [EmployeeType] = res.results[0].items;
        set(state => ({
            ...state,
            managers: managersData,
        }));
    },
    removeUserRecipients: () =>
        set(state => ({ ...state, user: initialManager })),
}));

export default recipientStore;
