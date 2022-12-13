import { PendingRequestByID } from 'utils/types';

export type State = {
    managerRequest: PendingRequestByID;
};

export type Actions = {
    // setPendingRequestByID: (requestedId: number) => void;
    // setPendingRequest: (managerRequest: PendingRequestByID) => void;
    getManagerModal: (requestedId: number) => void;
    setManagerRequest: (managerRequest: PendingRequestByID) => void;
};
