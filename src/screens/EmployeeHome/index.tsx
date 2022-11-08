import { EmployeeHomeScreensProps } from 'navigators/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import { AppBar, LeaveRequestList } from 'src/components/organisms';
import EntitlementGrid from 'src/components/organisms/EmployeeHome/EntitlementGrid/EntitlementGrid';
import { getGreetingsByTime } from 'src/utils/helpers/dateHandler';
import theme from 'src/utils/theme';
import { entitlements, leaveRequests } from './dummy';
import { styles } from './styles';

const { scale } = theme;

const EmployeeHome: React.FC<EmployeeHomeScreensProps> = () => (
    <View style={styles.innerContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <AppBar currentScreen='employee' onPressNotification={() => {}} />
            <Spacer />
            <Text type='H1Bold'>
                Hey Thiran {'\n'}
                {getGreetingsByTime()}
            </Text>
            <Spacer height={8} />
            <EntitlementGrid
                entitlements={entitlements}
                onEntitlementPress={() => {}}
            />
            <Spacer />
            <Text type='SubHBold'>Leave Requests</Text>
            <LeaveRequestList leaveRequests={leaveRequests} />
            <View
                style={{ marginBottom: scale.vsc40 * leaveRequests.length }}
            />
        </ScrollView>
        <View style={styles.buttonContainer}>
            <Button
                label='Apply Leave'
                icon='arrow-forward'
                iconPosition='left'
                onPress={() => {}}
            />
        </View>
    </View>
);

export default EmployeeHome;
