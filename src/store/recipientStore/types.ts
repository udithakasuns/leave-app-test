import { Manager } from 'utils/types';

export interface State {
    managers: [Manager];
    loading: boolean;
    error: string;
}

export type Actions = {
    updateRecipients: () => void;
    removeUserRecipients: () => void;
};
