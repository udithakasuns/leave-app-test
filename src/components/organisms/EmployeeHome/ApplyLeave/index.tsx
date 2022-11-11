/* eslint-disable import/no-cycle */
import React, { useState } from 'react';
import { View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import { Modal } from 'src/components/molecules';
import { entitlements } from 'src/screens/EmployeeHome/dummy';
import theme from 'src/utils/theme';
import LAEntitlementGrid from '../LAEntitlementGrid';

const ApplyLeave = () => {
    const [isSortModalVisible, setIsSortModalVisible] = useState<boolean>(true);

    return (
        <Modal
            onClose={() => setIsSortModalVisible(state => !state)}
            isVisible={isSortModalVisible}
            header='Apply Leave'
            style={{ paddingBottom: theme.scale.sc24 }}
            sheetBody={
                <View>
                    <Spacer height={theme.scale.vsc8} />
                    <Text type='ParaLG'>Select leave type</Text>
                    <Spacer height={theme.scale.sc4} />
                    <LAEntitlementGrid
                        entitlements={entitlements}
                        onEntitlementPress={() => {}}
                    />
                </View>
            }
        />
    );
};

export default ApplyLeave;
