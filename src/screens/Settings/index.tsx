import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { BackHeader, ButtonDock } from 'src/components/molecules';
import { screenStyles } from 'src/utils/styles';
import { SettingsScreensProps } from 'navigators/types';
import { Button, Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import useBackAction from 'src/utils/hooks/useBackAction';
import LANotificationSetting from 'src/components/organisms/Settings/LANotificationSettings';
import notificationStore from 'src/store/notificationStore';
import { getHttpMe } from 'src/services/http';
import {
    EmployeeNotificationSettings,
    ManagerNotificationSettings,
    Me,
} from 'src/utils/types';
import { AxiosError } from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    patchHttpEmployeeSettings,
    patchHttpManagerSettings,
} from 'src/services/http/patchRequest';
// import { showSuccessToast } from 'src/utils/alerts';
// import { SuccessCodes } from 'src/utils/helpers/successCodes';
import { styles } from './styles';
import { Key, Toggles } from './types';

const { scale } = theme;

const Settings: React.FC<SettingsScreensProps> = () => {
    const backAction = useBackAction();
    const [visibleSaveChanges, setVisibleSaveChanges] =
        useState<boolean>(false);

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

    const onSuccessChangeNotificationSetting = () => {
        setVisibleSaveChanges(false);
        onRefetchSettings();
        // Show the alert
    };

    const { mutate: updateManagerNotificationSettings } = useMutation(
        ['updateManagerNotificationSettings'],
        (updatedToggles: ManagerNotificationSettings) =>
            patchHttpManagerSettings({
                ...updatedToggles,
            }),
        {
            onSuccess: () => onSuccessChangeNotificationSetting(),
        },
    );

    const { mutate: updateEmployeeNotificationSettings } = useMutation(
        ['updateEmployeeNotificationSettings'],
        (updatedToggles: EmployeeNotificationSettings) =>
            patchHttpEmployeeSettings({
                ...updatedToggles,
            }),
        {
            onSuccess: () => onSuccessChangeNotificationSetting(),
        },
    );

    const onChangeToggle = (key: Key) => {
        const updatedToggles = {
            ...toggles,
            [key]: !toggles[key], // The property is updated by key.
        };
        setToggles(updatedToggles);
        setVisibleSaveChanges(true);
    };

    const onPressRestoreDefault = () => {
        if (isManager) {
            updateManagerNotificationSettings({
                isLeaveRequestNotificationsEnabled: true,
                isUpcomingEventsNotificationsEnabled: true,
                isNudgeNotificationsEnabled: true,
            });
        } else {
            updateEmployeeNotificationSettings({
                isLeaveRequestNotificationsEnabled: true,
                isUpcomingEventsNotificationsEnabled: true,
            });
        }
    };

    const onPressSaveChanges = () => {
        if (isManager) {
            updateManagerNotificationSettings(toggles);
        } else {
            /* Since Employee Notification Setting API accept only two setting options, only pass those two as parameters */
            updateEmployeeNotificationSettings({
                isLeaveRequestNotificationsEnabled:
                    toggles.isLeaveRequestNotificationsEnabled,
                isUpcomingEventsNotificationsEnabled:
                    toggles.isUpcomingEventsNotificationsEnabled,
            });
        }
        // showSuccessToast(SuccessCodes.NOTIFICATION_SETTINGS_SAVE); //In employee view this toast is not showing
    };

    const onCancel = () => {
        onRefetchSettings();
        setVisibleSaveChanges(false);
    };

    const onPressBack = () => {
        onCancel();
        backAction();
    };

    return (
        <View style={screenStyles.containerScollable}>
            <ScrollView
                contentContainerStyle={screenStyles.scrollViewContainer}>
                <BackHeader title='Home' onBackPress={onPressBack} />
                <Spacer height={scale.sc10} />
                <Text type='H1Bold'>Settings</Text>
                <Spacer height={scale.sc10} />
                <View style={styles.divider} />
                <Spacer height={scale.sc20} />
                <LANotificationSetting
                    isLoading={isSettingsLoading}
                    onChangeToggle={onChangeToggle}
                    isManager={isManager}
                    toggles={toggles}
                />
                <Spacer height={scale.sc20} />
                {/* <View style={styles.divider} /> */}
            </ScrollView>
            {visibleSaveChanges ? (
                <ButtonDock
                    primaryButton={{
                        label: 'Save changes',
                        onPress: onPressSaveChanges,
                        iconLibrary: 'community',
                        icon: 'content-save-outline',
                    }}
                    secondaryButton={{
                        label: 'Cancel',
                        onPress: onCancel,
                    }}
                />
            ) : (
                <Button
                    label='Restore Default'
                    onPress={onPressRestoreDefault}
                    mode='contained-gray'
                    iconPosition='right'
                    icon='restore'
                    labelStyle={styles.bottomButtonLabel}
                />
            )}
        </View>
    );
};

export default Settings;
