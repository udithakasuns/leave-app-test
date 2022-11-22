/* eslint-disable react/no-unstable-nested-components */
import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { Divider, Input, Spacer, Text } from 'src/components/atoms';
import {
    ButtonDock,
    LeaveInformationSection,
    Modal,
    RequestDetailsSection,
    SelectionButton,
} from 'src/components/molecules';
import { leaveRequests } from 'src/screens/EmployeeHome/dummy';
import theme from 'src/utils/theme';
import {
    ApplyFormValues,
    EmployeeModal,
    LeaveRequestType,
    RequestDetails,
    TestProps,
} from 'src/utils/types';
import ApplyLeaveSheetBody from './ApplyLeaveSheetBody';
import ChooseDateSheetBody from './ChooseDateSheetBody';
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
                        <>
                            <Spacer height={5} />
                            <Text color={colors.gray700}>
                                Your leave request is still pending approval
                                from your supervisor to be booked. You can
                                cancel your leave if you no longer want to. You
                                can nudge your supervisor if you want to remind
                                them again.
                            </Text>
                            {requestDetails && (
                                <RequestDetailsSection
                                    requestDetails={requestDetails}
                                />
                            )}
                            <Spacer />
                            <Divider />
                            <SelectionButton
                                buttonStyle={{ backgroundColor: colors.white }}
                                label='View More Details'
                                onPress={onPressViewMoreDetails}
                            />
                            <Divider />
                            <Spacer />
                            <ButtonDock
                                primaryButton={{
                                    label: 'Nudge Supervisor',
                                    icon: 'notification',
                                    mode: 'outlined',
                                    iconLibrary: 'svg',
                                    onPress: () => {
                                        onPressNudge(true);
                                    },
                                }}
                                secondaryButton={{
                                    label: 'Cancel Leave',
                                    mode: 'outlined-error',
                                    onPress: onCancellation,
                                }}
                            />
                            <Spacer height={10} />
                        </>
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
                        <>
                            <Spacer height={5} />
                            <LeaveInformationSection
                                leaveInfo={[
                                    {
                                        infoId: 1,
                                        label: 'Date Applied',
                                        element: '12th Jan',
                                    },
                                ]}
                            />
                            <Spacer height={2} />
                            <Input
                                placeholder={
                                    requestDetails?.leaveRequest?.requestDesc ??
                                    ''
                                }
                                label='Reason'
                                type='COMMENT'
                                containerStyle={{ margin: 0 }}
                                editable={false}
                                placeholderColor={colors.gray600}
                            />
                            <Spacer />
                        </>
                    }
                />
            )}
        </>
    );
};
export default LAEmployeeModals;
