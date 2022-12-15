import { showErrorToast } from 'src/utils/alerts';
import { ErrorCodes } from 'src/utils/helpers/errorCodes';

export const handleApplyLeaveError = (error: any) => {
    const { message } = error.response.data.results[0];
    if (message === 'Found leave request overlap') {
        showErrorToast(ErrorCodes.APPLY_CONFIRMATION_OVERLAP);
    } else if (message === 'Leave Entitlement is not sufficient to proceed') {
        showErrorToast(ErrorCodes.APPLY_CONFIRMATION_EXCEEDED);
    } else {
        showErrorToast(ErrorCodes.ERROR_OCCURRED);
    }
};

export const handleAlreadyNudgeError = () => {
    showErrorToast(ErrorCodes.REQUEST_ALREADY_NUDGE);
};
