export enum SuccessCodes {
    CANCELLATION_UNDONE = 'CANCELLATION_UNDONE',
    NUDGED_SUPERVISOR = 'NUDGED_SUPERVISOR',
    NOTIFICATION_SETTINGS_SAVE = 'NOTIFICATION_SETTINGS_SAVE',
}

type SuccessProp = {
    title: string;
    message: string;
};

export const getSuccessMessage = (
    errorCode: keyof typeof SuccessCodes,
    patchContent?: string,
): SuccessProp => {
    let successCodeMessage: SuccessProp;
    switch (errorCode) {
        case 'CANCELLATION_UNDONE':
            successCodeMessage = {
                title: 'Cancellation Undone',
                message: 'Your leave request cancellation was undone',
            };
            break;
        case 'NUDGED_SUPERVISOR':
            successCodeMessage = {
                title: 'You have nudged your supervisor',
                message: `${patchContent} was sent a reminder`,
            };
            break;
        case 'NOTIFICATION_SETTINGS_SAVE':
            successCodeMessage = {
                title: 'Successfully saved your settings',
                message: '',
            };
            break;
        default:
            successCodeMessage = { title: '', message: '' };
            break;
    }

    return successCodeMessage;
};
