import React from 'react';
import { View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';

const { scale, colors } = theme;

const Header = () => (
    <View>
        <Spacer height={scale.sc1} />
        <Text testID={`${TID}RESET_PW`} type='H1Bold'>
            Reset password
        </Text>
        <Spacer height={scale.sc1} />
        <Text testID={`${TID}RESET_PW_DESC`} type='SubH' color={colors.gray600}>
            Please choose your new password
        </Text>
    </View>
);

export default React.memo(Header);
