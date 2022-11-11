/* eslint-disable import/no-cycle */
import React from 'react';
import { View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import { Modal, SelectionButton } from 'src/components/molecules';
import theme from 'src/utils/theme';
import { AtLeast, EmployeeModal, TestProps } from 'src/utils/types';
import LAEntitlementGrid from '../LAEntitlementGrid';
import { EntitlementSelection } from '../LALeaveRequestList';

export type LAEmployeeModalProps = {
    modalType: EmployeeModal;
    entitlements?: EntitlementSelection[];
};

interface Props extends Partial<TestProps>, LAEmployeeModalProps {
    onClose: () => void;
}

const LAEmployeeModals = ({
    modalType,
    onClose,
    entitlements,
}: AtLeast<Props, 'onClose'>) => (
    <>
        <Modal
            onClose={onClose}
            isVisible={modalType === EmployeeModal.APPLY_LEAVE_MODAL}
            header='Apply Leave'
            style={{ paddingBottom: theme.scale.sc24 }}
            sheetBody={
                <View>
                    <Spacer height={theme.scale.vsc8} />
                    <Text type='ParaLG'>Select leave type</Text>
                    <Spacer height={theme.scale.vsc4} />
                    {entitlements && (
                        <LAEntitlementGrid
                            entitlements={entitlements}
                            onEntitlementPress={() => {}}
                        />
                    )}
                    <Spacer height={theme.scale.vsc10} />
                    <SelectionButton
                        label='Select the leave date'
                        onPress={() => {}}
                    />
                    <Spacer height={theme.scale.vsc10} />
                </View>
            }
        />
        <Modal
            onClose={onClose}
            isVisible={modalType === EmployeeModal.APPLY_LEAVE_MODAL}
            header='Choose Date'
            style={{ paddingBottom: theme.scale.sc24 }}
            sheetBody={
                <View>
                    <Spacer height={theme.scale.vsc8} />
                    <Text type='ParaLG'>Select leave type</Text>
                    <Spacer height={theme.scale.vsc12} />
                    {entitlements && (
                        <LAEntitlementGrid
                            entitlements={entitlements}
                            onEntitlementPress={() => {}}
                        />
                    )}
                </View>
            }
        />
    </>
);
export default LAEmployeeModals;
