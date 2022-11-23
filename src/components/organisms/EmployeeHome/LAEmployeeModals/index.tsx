/* eslint-disable react/no-unstable-nested-components */
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { Modal } from 'src/components/molecules';
import theme from 'src/utils/theme';
import {
    ApplyFormValues,
    EmployeeModal,
    LeaveRequestType,
    RequestDetails,
    TestProps,
} from 'src/utils/types';
import ApplyLeaveSheetBody from './ApplyLeaveSheetBody';
import CancelLeaveSheetBody from './CancelLeaveSheetBody';
import ChooseDateSheetBody from './ChooseDateSheetBody';
import DeniedLeaveSheetBody from './DeniedLeaveSheetBody';
import LeaveInformationSheetBody from './LeaveInformationSheetBody';
import PendingSheetBody from './PendingSheetBody';
import { styles } from './styles';

export type ModalProps = {
    modalType: EmployeeModal;
    leaveRequest: LeaveRequestType;
    requestDetails: RequestDetails;
};

export type LAEmployeeModalProps = Partial<ModalProps>;

const { colors } = theme;

interface Props extends Partial<TestProps>, LAEmployeeModalProps {
    onClose: () => void;
    formik: FormikProps<ApplyFormValues>;
    onPressSelectDate: () => void;
    onBackPress: (modalType: EmployeeModal) => void;
    onPressNudge: (isDisable: boolean) => void;
    onPressViewMoreDetails: () => void;
    onPressCancelLeave: () => void;
    onNavigateToCancelLeave: () => void;
}

const LAEmployeeModals = ({
    modalType,
    onClose,
    formik,
    onBackPress,
    onPressSelectDate,
    onPressNudge,
    onPressViewMoreDetails,
    requestDetails,
    onPressCancelLeave,
    onNavigateToCancelLeave,
}: Props) => {
    const [isHalfSelected, setIsHalfSelected] = useState(false);
    const onCancellation = () => {
        setIsHalfSelected(false);
        formik.resetForm();
        const entitlementsDeepClone = formik.values.entitlements.map(item => {
            const tempEntitlement = item;
            tempEntitlement.isSelected = false;
            return tempEntitlement;
        });
        formik.setFieldValue('entitlements', entitlementsDeepClone);
        onClose();
    };
    return (
        <>
            {modalType === EmployeeModal.APPLY_LEAVE_MODAL && (
                <Modal
                    onClose={onCancellation}
                    isVisible
                    header='Apply Leave'
                    style={styles.commonStyle}
                    sheetBody={
                        <ApplyLeaveSheetBody
                            formik={formik}
                            onPressSelectDate={onPressSelectDate}
                            isHalfSelected={isHalfSelected}
                            setIsHalfSelected={setIsHalfSelected}
                            onCancellation={onCancellation}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.CHOSE_DATE_MODAL && (
                <Modal
                    onClose={() => onBackPress(EmployeeModal.CHOSE_DATE_MODAL)}
                    isVisible
                    header='Choose Date'
                    headerIcon='arrow-back'
                    style={styles.commonStyle}
                    sheetBody={
                        <ChooseDateSheetBody
                            formik={formik}
                            onBackPress={onBackPress}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.PENDING_LEAVE_MODAL && (
                <Modal
                    onClose={onClose}
                    isVisible
                    header='Pending leave status'
                    style={styles.commonStyle}
                    sheetBody={
                        <PendingSheetBody
                            requestDetails={requestDetails}
                            onPressNudge={onPressNudge}
                            onPressViewMoreDetails={onPressViewMoreDetails}
                            onPressCancelLeave={onNavigateToCancelLeave}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.LEAVE_INFORMATION && (
                <Modal
                    onClose={() =>
                        onBackPress(EmployeeModal.PENDING_LEAVE_MODAL)
                    }
                    isVisible
                    header='Leave Information'
                    headerIcon='arrow-back'
                    style={styles.commonStyle}
                    sheetBody={
                        <LeaveInformationSheetBody
                            requestDescription={
                                requestDetails?.leaveRequest?.requestDesc ?? ''
                            }
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.CANCEL_REQUEST_MODAL && (
                <Modal
                    onClose={onClose}
                    isVisible
                    header='Cancel requested leave'
                    style={styles.commonStyle}
                    sheetBody={
                        <CancelLeaveSheetBody
                            requestDetails={requestDetails}
                            onPressNudge={onPressNudge}
                            onPressViewMoreDetails={onPressViewMoreDetails}
                            onPressCancelLeave={onPressCancelLeave}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.DENIED_LEAVE_MODAL && (
                <Modal
                    onClose={onClose}
                    isVisible
                    header='Denied leave status'
                    style={styles.commonStyle}
                    sheetBody={
                        <DeniedLeaveSheetBody
                            requestDetails={requestDetails}
                            onClose={onClose}
                        />
                    }
                />
            )}
        </>
    );
};
export default LAEmployeeModals;
