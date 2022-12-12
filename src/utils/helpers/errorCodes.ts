export enum ErrorCodes {
    EMPTY_PENDING_LEAVE = 'EMPTY_PENDING_LEAVE',
    EMPTY_FILTERS_PENDING_LEAVE = 'EMPTY_FILTERS_PENDING_LEAVE',
    EMPTY_REQUEST_LEAVE = 'EMPTY_REQUEST_LEAVE',
    EMPTY_FILTERS_REQUEST_LEAVE = 'EMPTY_FILTERS_REQUEST_LEAVE',
    APPLY_CONFIRMATION_COMMON = 'APPLY_CONFIRMATION_COMMON',
    APPLY_CONFIRMATION_OVERLAP = 'APPLY_CONFIRMATION_OVERLAP',
    APPLY_CONFIRMATION_EXCEEDED = 'APPLY_CONFIRMATION_EXCEEDED',
    APPLY_CONFIRMATION_DATE = 'APPLY_CONFIRMATION_DATE',
    APPLY_CONFIRMATION_DURATION = 'APPLY_CONFIRMATION_DURATION',
    APPLY_CONFIRMATION_LEAVE_TYPE = 'APPLY_CONFIRMATION_LEAVE_TYPE',
    APPLY_CONFIRMATION_WEEKENDS = 'APPLY_CONFIRMATION_WEEKENDS',
    UNAVAILABLE_LEAVE_ENTITLEMENTS = 'UNAVAILABLE_LEAVE_ENTITLEMENTS',
    ERROR_OCCURRED = 'ERROR_OCCURRED',
    REQUEST_ALREADY_NUDGE = 'REQUEST_ALREADY_NUDGE',
}

type ErrorProp = {
    title: string;
    message: string;
};

export const getErrorMessage = (
    errorCode: keyof typeof ErrorCodes,
    patchContent?: string,
): ErrorProp => {
    let errorCodeMessage: ErrorProp;
    switch (errorCode) {
        case 'EMPTY_PENDING_LEAVE':
            errorCodeMessage = {
                title: 'No available requests',
                message:
                    'When you get a leave request from an employee under your supervision, that will show up here',
            };
            break;
        case 'EMPTY_FILTERS_PENDING_LEAVE':
            errorCodeMessage = {
                title: 'No leave requests for this filter',
                message:
                    'You have no leave requests that matches your filter setting please recheck your filters.',
            };
            break;
        case 'EMPTY_REQUEST_LEAVE':
            errorCodeMessage = {
                title: 'No leave requests',
                message:
                    'You have not requested leave. When you make a leave request, that will show up here. Don’t fret!',
            };
            break;
        case 'EMPTY_FILTERS_REQUEST_LEAVE':
            errorCodeMessage = {
                title: 'No leave requests for this filter',
                message:
                    'You have no leave requests that matches your filter setting please recheck your filters.',
            };
            break;
        case 'APPLY_CONFIRMATION_COMMON':
            errorCodeMessage = {
                title: 'Enter details before proceeding',
                message:
                    'Please enter your leave type, date and other \ndetails',
            };
            break;
        case 'APPLY_CONFIRMATION_DATE':
            errorCodeMessage = {
                title: 'Please select a date',
                message: 'Select a date on the calendar to apply leave',
            };
            break;
        case 'APPLY_CONFIRMATION_DURATION':
            errorCodeMessage = {
                title: 'Please select a duration',
                message: 'Select a duration for the leave',
            };
            break;
        case 'APPLY_CONFIRMATION_LEAVE_TYPE':
            errorCodeMessage = {
                title: 'Please select a leave type',
                message: 'Select a leave type to proceed application',
            };
            break;
        case 'APPLY_CONFIRMATION_EXCEEDED':
            errorCodeMessage = {
                title: 'Your leave allocation exceeded',
                message:
                    'Please contact your supervisor for clarifications\n or additions',
            };
            break;
        case 'APPLY_CONFIRMATION_OVERLAP':
            errorCodeMessage = {
                title: 'Leave already applied',
                message: 'You are already on leave on this date.',
            };
            break;
        case 'ERROR_OCCURRED':
            errorCodeMessage = {
                title: 'Error occurred',
                message:
                    'There was an internal error with the system.\n Please try again',
            };
            break;
        case 'UNAVAILABLE_LEAVE_ENTITLEMENTS':
            errorCodeMessage = {
                title: `No ${patchContent} leaves available`,
                message: 'No leaves left. Please contact your supervisor',
            };
            break;
        case 'APPLY_CONFIRMATION_WEEKENDS':
            errorCodeMessage = {
                title: 'Not working weekends are you?',
                message: 'This day is not a working day.',
            };
            break;
        case 'REQUEST_ALREADY_NUDGE':
            errorCodeMessage = {
                title: 'Supervisor already nudged',
                message:
                    'A reminder has been sent to your supervisor.\nThe assigned supervisor will respond to your request.',
            };
            break;
        default:
            errorCodeMessage = { title: '', message: '' };
            break;
    }

    return errorCodeMessage;
};
