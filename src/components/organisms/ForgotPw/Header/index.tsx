import React from 'react';
import { View } from 'react-native';
import { Text } from 'src/components/atoms';

const Header = () => (
    <View>
        <Text>Reset Password</Text>
        <Text>Please choose your new password</Text>
    </View>
);

export default React.memo(Header);
