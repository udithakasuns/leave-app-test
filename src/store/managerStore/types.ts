import { PendingRequestByID } from 'utils/types';

export type State = {
    managerRequest: PendingRequestByID;
};

export type Actions = {
    getManagerModal: (requestedId: number) => void;
    setManagerRequest: (managerRequest: PendingRequestByID) => void;
};
