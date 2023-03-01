/* eslint-disable react/no-unstable-nested-components */
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { Modal } from 'src/components/molecules';
import { useEmployeeStore, useRecipientStore } from 'src/store';
import {
    TID_EMPLOYEE_APPLY_LEAVE_MODAL,
    TID_EMPLOYEE_APPROVED_LEAVE_MODAL,
    TID_EMPLOYEE_CANCELLED_LEAVE_MODAL,
    TID_EMPLOYEE_CANCEL_REQUEST_MODAL,
    TID_EMPLOYEE_CHOSE_DATE_MODAL,
    TID_EMPLOYEE_DENIED_LEAVE_MODAL,
    TID_EMPLOYEE_LEAVE_INFORMATION,
    TID_EMPLOYEE_PENDING_LEAVE_MODAL,
    TID_EMPLOYEE_REVOKE_REQUEST_MODAL,
} from 'src/utils/testIds';
import {
    ApplyFormValues,
    AwayTeamByDate,
    EmployeeModal,
    PartialBy,
    TestProps,
} from 'src/utils/types';
import TeamAvailabilitySheetBody from '../../TeamAvailability/LATeamAvailabilitySheetBody';
import ApplyLeaveSheetBody from './ApplyLeaveSheetBody';
import ApprovedLeaveSheetBody from './ApprovedLeaveSheetBody';
import CancelLeaveSheetBody from './CancelLeaveSheetBody';
import CancelledLeaveSheetBody from './CancelledLeaveSheetBody';
import ChooseDateSheetBody from './ChooseDateSheetBody';
import DeniedLeaveSheetBody from './DeniedLeaveSheetBody';
import LeaveInformationSheetBody from './LeaveInformationSheetBody';
import PendingSheetBody from './PendingSheetBody';
import RevokeLeaveSheetBody from './RevokeLeaveSheetBody';
import { styles } from './styles';

export type ModalProps = {
    modalType: EmployeeModal;
    onBackPressType: EmployeeModal;
    isNudgeVisble: boolean;
    lastNudgedDateTime: string | null;
    startDate: string;
    endDate: string;
    awayMemberList: AwayTeamByDate[];
};

export type LAEmployeeModalProps = Partial<ModalProps>;

interface Props extends Partial<TestProps>, LAEmployeeModalProps {
    onClose: () => void;
    formik: FormikProps<ApplyFormValues>;
    onPressSelectDate: () => void;
    onBackPress: (modalType: EmployeeModal) => void;
    onPressNudge: (isDisable: boolean) => void;
    onPressLeaveInformation: (onBackPressModal: EmployeeModal) => void;
    onPressRevokeLeave: () => void;
    onPressCancelLeave: () => void;
    onNavigateToCancelLeave: () => void;
    onRevokeLeaveRequest: (revokeComment: string) => void;
    onPressTeamAvailibility: (startDate: string, endDate: string) => void;
}

const LAEmployeeModals = ({
    modalType,
    onBackPressType,
    formik,
    isNudgeVisble,
    startDate,
    endDate,
    awayMemberList,
    onClose,
    onBackPress,
    onPressSelectDate,
    onPressNudge,
    onPressLeaveInformation,
    onPressCancelLeave,
    onNavigateToCancelLeave,
    onPressRevokeLeave,
    onRevokeLeaveRequest,
    onPressTeamAvailibility,
}: PartialBy<Props, 'formik'>) => {
    const [isHalfSelected, setIsHalfSelected] = useState(false);
    const { employeeRequest } = useEmployeeStore();
    const { managers } = useRecipientStore();

    const onCancellation = () => {
        setIsHalfSelected(false);
        formik?.resetForm();
        const entitlementsDeepClone = formik?.values.entitlements.map(item => {
            const tempEntitlement = item;
            tempEntitlement.isSelected = false;
            return tempEntitlement;
        });
        formik?.setFieldValue('entitlements', entitlementsDeepClone);
        onClose();
    };
    return (
        <>
            {modalType === EmployeeModal.APPLY_LEAVE_MODAL && formik && (
                <Modal
                    testIdModal={TID_EMPLOYEE_APPLY_LEAVE_MODAL}
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
            {modalType === EmployeeModal.CHOSE_DATE_MODAL && formik && (
                <Modal
                    testIdModal={TID_EMPLOYEE_CHOSE_DATE_MODAL}
                    onClose={() => onBackPress(EmployeeModal.CHOSE_DATE_MODAL)}
                    isVisible
                    header='Choose Date'
                    headerIcon='arrow-back'
                    style={styles.commonStyle}
                    sheetBody={
                        <ChooseDateSheetBody
                            formik={formik}
                            onBackPress={onBackPress}
                            onPressTeamAvailibility={onPressTeamAvailibility}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.PENDING_LEAVE_MODAL && (
                <Modal
                    testIdModal={TID_EMPLOYEE_PENDING_LEAVE_MODAL}
                    onClose={onClose}
                    isVisible
                    header='Pending leave status'
                    style={styles.commonStyle}
                    sheetBody={
                        <PendingSheetBody
                            isNudgeVisble={isNudgeVisble || false}
                            requestDetails={{
                                leaveRequest: employeeRequest,
                                recipient: [managers[0]],
                            }}
                            onPressNudge={onPressNudge}
                            onPressViewMoreDetails={() =>
                                onPressLeaveInformation(
                                    EmployeeModal.PENDING_LEAVE_MODAL,
                                )
                            }
                            onPressCancelLeave={onNavigateToCancelLeave}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.LEAVE_INFORMATION && (
                <Modal
                    testIdModal={TID_EMPLOYEE_LEAVE_INFORMATION}
                    onClose={() => {
                        onBackPress(
                            onBackPressType ??
                                EmployeeModal.APPROVED_LEAVE_MODAL,
                        );
                    }}
                    isVisible
                    header='Leave Information'
                    headerIcon='arrow-back'
                    style={styles.commonStyle}
                    sheetBody={
                        <LeaveInformationSheetBody
                            requestDetails={employeeRequest}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.CANCEL_REQUEST_MODAL && (
                <Modal
                    testIdModal={TID_EMPLOYEE_CANCEL_REQUEST_MODAL}
                    onClose={onClose}
                    isVisible
                    header='Cancel requested leave'
                    style={styles.commonStyle}
                    sheetBody={
                        <CancelLeaveSheetBody
                            requestDetails={{
                                leaveRequest: employeeRequest,
                                recipient: [managers[0]],
                            }}
                            onPressCancelLeave={onPressCancelLeave}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.CANCELLED_LEAVE_MODAL && (
                <Modal
                    testIdModal={TID_EMPLOYEE_CANCELLED_LEAVE_MODAL}
                    onClose={onClose}
                    isVisible
                    header={
                        employeeRequest.status === 'CANCELLED'
                            ? 'Cancelled leave status'
                            : 'Revoked leave status'
                    }
                    style={styles.commonStyle}
                    sheetBody={
                        <CancelledLeaveSheetBody
                            requestDetails={{
                                leaveRequest: employeeRequest,
                                recipient: [managers[0]],
                            }}
                            onClose={onClose}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.DENIED_LEAVE_MODAL && (
                <Modal
                    testIdModal={TID_EMPLOYEE_DENIED_LEAVE_MODAL}
                    onClose={onClose}
                    isVisible
                    header='Denied leave status'
                    style={styles.commonStyle}
                    sheetBody={
                        <DeniedLeaveSheetBody
                            requestDetails={{
                                leaveRequest: employeeRequest,
                                recipient: [managers[0]],
                            }}
                            onClose={onClose}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.APPROVED_LEAVE_MODAL && (
                <Modal
                    testIdModal={TID_EMPLOYEE_APPROVED_LEAVE_MODAL}
                    onClose={onClose}
                    isVisible
                    header='Approved leave status'
                    style={styles.commonStyle}
                    sheetBody={
                        <ApprovedLeaveSheetBody
                            requestDetails={{
                                leaveRequest: employeeRequest,
                                recipient: [managers[0]],
                            }}
                            onPressRevokeLeave={onPressRevokeLeave}
                            onPressViewMoreDetails={() => {
                                onPressLeaveInformation(
                                    EmployeeModal.APPROVED_LEAVE_MODAL,
                                );
                            }}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.REVOKE_REQUEST_MODAL && (
                <Modal
                    testIdModal={TID_EMPLOYEE_REVOKE_REQUEST_MODAL}
                    onClose={onClose}
                    isVisible
                    header='Revoke requested leave'
                    style={styles.commonStyle}
                    sheetBody={
                        <RevokeLeaveSheetBody
                            requestDetails={{
                                leaveRequest: employeeRequest,
                                recipient: [managers[0]],
                            }}
                            onRevokeLeaveRequest={onRevokeLeaveRequest}
                        />
                    }
                />
            )}
            {modalType === EmployeeModal.TEAM_AVAILABILITY_MODAL && (
                <Modal
                    onClose={() => {
                        onBackPress(EmployeeModal.CHOSE_DATE_MODAL);
                    }}
                    isVisible
                    header='Team availability'
                    headerIcon='arrow-back'
                    style={styles.commonStyle}
                    sheetBody={
                        <TeamAvailabilitySheetBody
                            awayTeamsByDate={awayMemberList || []}
                            onPressGoBack={() => {
                                onBackPress(EmployeeModal.CHOSE_DATE_MODAL);
                            }}
                        />
                    }
                />
            )}
        </>
    );
};
export default LAEmployeeModals;
