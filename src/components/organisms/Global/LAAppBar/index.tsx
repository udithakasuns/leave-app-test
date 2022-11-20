/* eslint-disable import/no-cycle */
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable, View } from 'react-native';
import {
    Avatar,
    AvatarSize,
    ButtonMode,
    Chip,
    Icon,
    IconSize,
    Spacer,
} from 'src/components/atoms';
import { Modal } from 'src/components/molecules';
import { DrawerScreenNavigationProp } from 'src/navigators/types';
import { useUserStore } from 'src/store';
import theme from 'src/utils/theme';
import { RoleSheetBody } from './RoleSheetBody';
import { styles } from './styles';

const { colors } = theme;

export type CurrentScreen = 'employee' | 'manager';

type AppBarProps = {
    currentScreen: CurrentScreen;
    onPressNotification: () => void;
};

export type SelectedProperties = {
    label: string;
    managerMode: ButtonMode;
    employeeMode: ButtonMode;
};

const LAAppBar = ({ currentScreen, onPressNotification }: AppBarProps) => {
    const navigation = useNavigation<DrawerScreenNavigationProp>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { employee } = useUserStore();

    const appBarProperties = (): SelectedProperties => {
        if (currentScreen === 'employee') {
            return {
                label: 'Employee View',
                managerMode: 'contained-gray',
                employeeMode: 'outlined',
            };
        }
        return {
            label: 'Manager View',
            managerMode: 'outlined',
            employeeMode: 'contained-gray',
        };
    };

    return (
        <View style={styles.appBarContainer}>
            <View style={styles.avatarChipContainer}>
                <Pressable
                    onPress={() => {
                        navigation.dispatch(DrawerActions.openDrawer());
                    }}>
                    <Avatar
                        size={AvatarSize.large}
                        source={{ uri: employee.authPic }}
                    />
                </Pressable>
                <Spacer width={5} />
                <Chip
                    content={appBarProperties().label}
                    rightIconName='arrow-drop-down'
                    outline
                    contentColor={colors.black}
                    onPressChip={() => setModalVisible(state => !state)}
                    contentTextType='ParaLG'
                    outlineColor={colors.gray300}
                    contentStyle={styles.chipContent}
                    pressableContainerStyle={styles.chipPressContainer}
                    containerStyle={styles.chipContainer}
                />
            </View>
            <Icon
                name='notifications'
                onPress={onPressNotification}
                size={IconSize.xLarge}
            />
            <Modal
                onClose={() => setModalVisible(state => !state)}
                isVisible={modalVisible}
                header='Change your role'
                sheetBody={
                    <RoleSheetBody
                        appBarProperties={appBarProperties()}
                        onPress={selected => {
                            if (
                                selected === 'employee' &&
                                selected !== currentScreen
                            ) {
                                navigation.navigate('EmployeeHome');
                            } else if (
                                selected === 'manager' &&
                                selected !== currentScreen
                            ) {
                                navigation.navigate('ManagerHome');
                            }
                            setModalVisible(state => !state);
                        }}
                    />
                }
            />
        </View>
    );
};

export default LAAppBar;
