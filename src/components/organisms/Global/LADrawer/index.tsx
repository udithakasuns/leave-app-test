import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Spacer, Text } from 'src/components/atoms';
import { useUserStore } from 'src/store';
import useLogout from 'src/utils/hooks/useLogout';
import { IconLibrary } from 'src/utils/types';
import theme from 'utils/theme';
import { NavigationProp } from '@react-navigation/native';
import { AuthScreensParamList } from 'src/navigators/types';
import { styles } from './styles';

const { scale, colors } = theme;

interface Props {
    navigation: NavigationProp<AuthScreensParamList>;
}

interface ButtonProps {
    icon: string;
    label: string;
    onPress: () => void;
    iconLibrary?: IconLibrary;
}
const LADrawer: React.FC<Props> = ({ navigation }) => {
    const {
        user: { firstName, lastName, profilePic, designation },
    } = useUserStore();

    const logout = useLogout();

    const [buttons] = useState<ButtonProps[]>([
        {
            label: 'Account',
            icon: 'account-circle',
            onPress: () => navigation.navigate('Account'),
            iconLibrary: 'svg',
        },
        {
            label: 'Settings',
            icon: 'settings',
            onPress: () => navigation.navigate('Settings'),
            iconLibrary: 'svg',
        },
        {
            label: 'Support',
            icon: 'help-outline',
            onPress: () => navigation.navigate('Support'),
        },
    ]);

    return (
        <View style={styles.container}>
            <Avatar source={{ uri: profilePic }} size={scale.sc96} />
            <Spacer height={scale.sc6} />
            <Text numberOfLines={1} type='H1Bold'>
                {firstName} {lastName}
            </Text>
            <Text numberOfLines={2} type='ParaLG' color={colors.gray600}>
                {designation}
            </Text>
            <Spacer height={scale.sc4} />
            <View style={styles.divider} />
            <View style={styles.buttonContainer}>
                <View>
                    {buttons.map(b => (
                        <Button
                            key={b.label}
                            buttonStyle={styles.buttonStyle}
                            label={b.label}
                            icon={b.icon}
                            mode='contained-gray'
                            iconPosition='right'
                            iconLibrary={b.iconLibrary}
                            labelStyle={styles.buttonLabelStyle}
                            onPress={b.onPress}
                        />
                    ))}
                </View>
                <Button
                    buttonStyle={styles.buttonStyle}
                    label='Logout'
                    icon='login'
                    mode='contained-gray'
                    iconPosition='right'
                    labelStyle={styles.buttonLabelStyle}
                    onPress={logout}
                />
            </View>
        </View>
    );
};
export default LADrawer;
