import React, { useState } from 'react';
import { View } from 'react-native';
import { awsOnGoogleSignOut } from 'services/aws';
import { Avatar, Button, Divider, Spacer, Text } from 'src/components/atoms';
import { useUserStore } from 'src/store';
import theme from 'utils/theme';
import { styles } from './styles';

const { scale, colors } = theme;

interface ButtonProps {
    icon: string;
    label: string;
    onPress: () => void;
}

const Drawer: React.FC = () => {
    const {
        user: { firstName, lastName, profilePic, designation },
    } = useUserStore();

    const [buttons] = useState<ButtonProps[]>([
        { label: 'Account', icon: 'account-circle', onPress: () => {} },
        { label: 'Settings', icon: 'settings', onPress: () => {} },
        { label: 'Support', icon: 'help', onPress: () => {} },
        { label: 'Logout', icon: 'login', onPress: awsOnGoogleSignOut },
    ]);

    return (
        <View style={styles.container}>
            <Avatar source={{ uri: profilePic }} size={scale.sc96} />
            <Spacer height={scale.sc6} />
            <Text numberOfLines={1} type='H1Bold'>
                {firstName} {lastName}
            </Text>
            <Text numberOfLines={1} type='H2' color={colors.gray600}>
                {designation}
            </Text>
            <Spacer height={scale.sc4} />
            <View style={styles.divider} />
            <View>
                {buttons.map(b => (
                    <Button
                        key={b.label}
                        buttonStyle={styles.buttonStyle}
                        label={b.label}
                        icon={b.icon}
                        mode='contained-gray'
                        iconPosition='right'
                        labelStyle={styles.buttonLabelStyle}
                        onPress={b.onPress}
                    />
                ))}
            </View>
        </View>
    );
};

export default Drawer;
