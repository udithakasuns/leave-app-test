import React from 'react';
import { View } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import crashlytics from '@react-native-firebase/crashlytics';
import { styles } from './styles';

const { scale } = theme;

const CrashCheck = () => (
    <View>
        <Spacer height={scale.sc20} />
        <View style={styles.divider} />
        <Spacer height={scale.sc20} />
        <Text type='H2Bold'>Crash Check</Text>
        <Spacer height={scale.sc5} />
        <Text type='SubH'>
            Note that, this feature is only showing in the STG environment to
            ensure that crashlytics are working perfectly.
        </Text>
        <Spacer height={scale.sc2} />
        <Text type='ParaSM'>
            Dev Note: Crashlytics are not working when you are in debuging mode
            since it is disabled in firebase.json file.
        </Text>
        <Spacer height={scale.sc5} />
        <Button
            mode='outlined'
            label='Crash the App'
            onPress={() => crashlytics().crash()}
        />
    </View>
);

export default CrashCheck;
