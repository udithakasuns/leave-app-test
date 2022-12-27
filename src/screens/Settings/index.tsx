import React from 'react';
import { View, ScrollView } from 'react-native';
import { BackHeader } from 'src/components/molecules';
import { screenStyles } from 'src/utils/styles';
import { SettingsScreensProps } from 'navigators/types';
import { Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import useBackAction from 'src/utils/hooks/useBackAction';
import LANotificationSetting from 'src/components/organisms/Settings/LANotificationSettings';
import { styles } from './styles';

const { scale } = theme;

const Settings: React.FC<SettingsScreensProps> = () => {
    const backAction = useBackAction();

    return (
        <View style={screenStyles.containerScollable}>
            <ScrollView
                contentContainerStyle={screenStyles.scrollViewContainer}>
                <BackHeader title='Home' onBackPress={backAction} />
                <Spacer height={scale.sc10} />
                <Text type='H1Bold'>Settings</Text>
                <Spacer height={scale.sc10} />
                <View style={styles.divider} />
                <Spacer height={scale.sc20} />
                <LANotificationSetting />
                <Spacer height={scale.sc20} />
                <View style={styles.divider} />
            </ScrollView>
        </View>
    );
};

export default Settings;
