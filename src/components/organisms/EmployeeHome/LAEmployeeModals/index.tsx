import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Spacer } from 'src/components/atoms';
import { Modal } from 'src/components/molecules';
import theme from 'src/utils/theme';
import { ApplyFormValues, EmployeeModal, TestProps } from 'src/utils/types';
import ApplyLeaveSheetBody from './ApplyLeaveSheetBody';

export type ModalProps = {
    modalType: EmployeeModal;
};

export type LAEmployeeModalProps = Partial<ModalProps>;

interface Props extends Partial<TestProps>, LAEmployeeModalProps {
    onClose: () => void;
    formik: FormikProps<ApplyFormValues>;
    onPressSelectDate: () => void;
    onBackPress: (modalType: EmployeeModal) => void;
}

const LAEmployeeModals = ({
    modalType,
    onClose,
    formik,
    onBackPress,
    onPressSelectDate,
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
                    style={{ paddingBottom: theme.scale.sc24 }}
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
                    style={{ paddingBottom: theme.scale.sc24 }}
                    sheetBody={
                        <View>
                            <Spacer height={theme.scale.vsc8} />
                            <Spacer height={theme.scale.vsc12} />
                        </View>
                    }
                />
            )}
        </>
    );
};
export default LAEmployeeModals;
