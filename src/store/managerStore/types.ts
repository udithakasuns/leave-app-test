import { PendingRequestByID } from 'utils/types';

export type State = {
    isManagerModalLoading: boolean;
    managerRequest: PendingRequestByID;
};

export type Actions = {
    getManagerModal: (requestedId: number) => void;
    setManagerRequest: (managerRequest: PendingRequestByID) => void;
    resetManagerRequest: () => void;
};
