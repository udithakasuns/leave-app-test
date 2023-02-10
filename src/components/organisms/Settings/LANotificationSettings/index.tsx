import React from 'react';
import { View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { Toggles, Key } from 'src/screens/Settings/types';
import {
    TID_TOGGLE_LEAVE_REQUEST,
    TID_TOGGLE_NUDGE_NOTIFICATION,
    TID_TOGGLE_UPCOMMING_EVENTS,
} from 'src/utils/testIds';
import ToggleItem from './ToggleItem';

const { scale, deviceDimensions } = theme;

interface Props {
    isLoading: boolean;
    toggles: Toggles;
    isManager: boolean;
    onChangeToggle: (key: Key) => void;
}

const LANotificationSetting = ({
    isLoading,
    toggles,
    isManager,
    onChangeToggle,
}: Props) => (
    <View>
        <Text type='H2Bold'>Notification Settings</Text>
        <Spacer height={scale.sc10} />
        {isLoading ? (
            <SkeletonPlaceholder borderRadius={4}>
                <SkeletonPlaceholder.Item
                    height={deviceDimensions.height / 2}
                />
            </SkeletonPlaceholder>
        ) : (
            <>
                <Text type='SubH'>
                    Select the notifications you want to enable and which ones
                    you want to disable
                </Text>
                <Spacer height={scale.sc10} />
                <ToggleItem
                    testId={TID_TOGGLE_LEAVE_REQUEST}
                    label='Leave requests'
                    value={toggles.isLeaveRequestNotificationsEnabled}
                    onChangeValue={() => {
                        onChangeToggle('isLeaveRequestNotificationsEnabled');
                    }}
                />
                <Spacer height={scale.sc10} />
                <ToggleItem
                    testId={TID_TOGGLE_UPCOMMING_EVENTS}
                    label='Upcoming events'
                    value={toggles.isUpcomingEventsNotificationsEnabled}
                    onChangeValue={() =>
                        onChangeToggle('isUpcomingEventsNotificationsEnabled')
                    }
                />
                {/* Only Manager can see the nudge notification setting */}
                {isManager && (
                    <>
                        <Spacer height={scale.sc10} />
                        <ToggleItem
                            testId={TID_TOGGLE_NUDGE_NOTIFICATION}
                            label='Nudge notifications'
                            value={toggles.isNudgeNotificationsEnabled}
                            onChangeValue={() =>
                                onChangeToggle('isNudgeNotificationsEnabled')
                            }
                        />
                    </>
                )}
            </>
        )}
    </View>
);

export default LANotificationSetting;
