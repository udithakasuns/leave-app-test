import React, { useState } from 'react';
import { View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
    EmployeeNotificationSettings,
    ManagerNotificationSettings,
    Me,
} from 'src/utils/types';
import { getHttpMe } from 'src/services/http';
import { AxiosError } from 'axios';
import notificationStore from 'src/store/notificationStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    patchHttpEmployeeSettings,
    patchHttpManagerSettings,
} from 'src/services/http/patchRequest';
import ToggleItem from './ToggleItem';

const { scale, deviceDimensions } = theme;

interface Toggles {
    isNudgeNotificationsEnabled: boolean;
    isLeaveRequestNotificationsEnabled: boolean;
    isUpcomingEventsNotificationsEnabled: boolean;
}

type Key =
    | 'isNudgeNotificationsEnabled'
    | 'isLeaveRequestNotificationsEnabled'
    | 'isUpcomingEventsNotificationsEnabled';

const LANotificationSetting = () => {
    const [toggles, setToggles] = useState<Toggles>({
        isNudgeNotificationsEnabled: true,
        isLeaveRequestNotificationsEnabled: true,
        isUpcomingEventsNotificationsEnabled: true,
    });

    const { notifyUserRole } = notificationStore();

    const isManager = notifyUserRole === 'MANAGER';

    const { isLoading: isSettingsLoading, refetch: onRefetchSettings } =
        useQuery<Me, AxiosError>(['me', isManager], getHttpMe, {
            onSuccess: ({ settings: { notifications } }) => {
                if (isManager) {
                    setToggles({ ...toggles, ...notifications.manager });
                } else {
                    setToggles({ ...toggles, ...notifications.employee });
                }
            },
        });

    const { mutate: updateManagerNotificationSettings } = useMutation(
        ['updateManagerNotificationSettings'],
        (updatedToggles: ManagerNotificationSettings) =>
            patchHttpManagerSettings({
                ...updatedToggles,
            }),
        {
            onSuccess: () => onRefetchSettings(),
        },
    );

    const { mutate: updateEmployeeNotificationSettings } = useMutation(
        ['updateEmployeeNotificationSettings'],
        (updatedToggles: EmployeeNotificationSettings) =>
            patchHttpEmployeeSettings({
                ...updatedToggles,
            }),
        {
            onSuccess: () => onRefetchSettings(),
        },
    );

    const onToggleSettings = (key: Key) => {
        const updatedToggles = {
            ...toggles,
            [key]: !toggles[key], // The property is updated by key.
        };
        setToggles(updatedToggles);
        if (isManager) {
            updateManagerNotificationSettings(updatedToggles);
        } else {
            /* Since Employee Notification Setting API accept only two setting options, only pass those two as parameters */
            updateEmployeeNotificationSettings({
                isLeaveRequestNotificationsEnabled:
                    updatedToggles.isLeaveRequestNotificationsEnabled,
                isUpcomingEventsNotificationsEnabled:
                    updatedToggles.isUpcomingEventsNotificationsEnabled,
            });
        }
    };

    return (
        <View>
            <Text type='H2Bold'>Notification Settings</Text>
            <Spacer height={scale.sc10} />
            {isSettingsLoading ? (
                <SkeletonPlaceholder borderRadius={4}>
                    <SkeletonPlaceholder.Item
                        height={deviceDimensions.height / 2}
                    />
                </SkeletonPlaceholder>
            ) : (
                <>
                    <Text type='SubH'>
                        Select the notifications you want to enable and which
                        ones you want to disable
                    </Text>
                    <Spacer height={scale.sc10} />
                    <ToggleItem
                        disabled={isManager} // Manager cannot toggle the Leave request notifications
                        label='Leave requests'
                        value={toggles.isLeaveRequestNotificationsEnabled}
                        onChangeValue={() => {
                            if (!isManager) {
                                onToggleSettings(
                                    'isLeaveRequestNotificationsEnabled',
                                );
                            }
                        }}
                    />
                    <Spacer height={scale.sc10} />
                    <ToggleItem
                        label='Upcoming events'
                        value={toggles.isUpcomingEventsNotificationsEnabled}
                        onChangeValue={() =>
                            onToggleSettings(
                                'isUpcomingEventsNotificationsEnabled',
                            )
                        }
                    />
                    {/* Only Manager can see the nudge notification setting */}
                    {isManager && (
                        <>
                            <Spacer height={scale.sc10} />
                            <ToggleItem
                                label='Nudge notifications'
                                value={toggles.isNudgeNotificationsEnabled}
                                onChangeValue={() =>
                                    onToggleSettings(
                                        'isNudgeNotificationsEnabled',
                                    )
                                }
                            />
                        </>
                    )}
                </>
            )}
        </View>
    );
};

export default LANotificationSetting;
