import { EmployeeType, UserRole, UserType } from 'utils/types';

export interface State {
    managers: [EmployeeType];
    loading: boolean;
    error: string;
}

export type Actions = {
    updateRecipients: () => void;
    removeUserRecipients: () => void;
};
