import React from 'react';
import { View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { scale, colors } = theme;

const Header = () => (
    <View>
        <Text testID={`${TID}TEXT_UNICODE_HAND`} style={styles.hand}>
            👋🏼
        </Text>
        <Spacer height={scale.vsc10} />
        <Text testID={`${TID}TEXT_WELCOME`} type='H1Bold'>
            Welcome to MyLeave
        </Text>
        <Spacer height={scale.vsc10} />
        <Text
            testID={`${TID}TEXT_DESCRIPTION`}
            type='SubH'
            color={colors.gray600}>
            Hello! We’re super excited to welcome you to MyLeave. Let’s get you
            logged into your organization!
        </Text>
    </View>
);

export default React.memo(Header);
