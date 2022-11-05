/* eslint-disable import/no-cycle */
import React from 'react';
import { View } from 'react-native';
import { Button, Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import { CurrentScreen, SelectedProperties } from '.';
import { styles } from './styles';

export const RoleSheetBody = ({
    onClose,
    appBarProperties,
    onPress,
}: {
    onClose: () => void;
    appBarProperties: SelectedProperties;
    onPress: (currentScreen: CurrentScreen) => void;
}) => (
    <View style={styles.roleSheetContainer}>
        <Icon
            style={styles.closeIcon}
            name='close'
            enableBackground
            size={IconSize.medium}
            increasePadding={2}
            onPress={onClose}
        />
        <Spacer height={8} />
        <Text style={styles.roleTextContainer} type='H1Bold'>
            Change your role
        </Text>
        <Spacer height={10} />
        <Button
            label='Employee View'
            mode={appBarProperties.employeeMode}
            icon='person-outline'
            labelStyle={styles.labelStyle}
            onPress={() => onPress('employee')}
        />
        <Spacer height={8} />
        <Button
            label='Manager View'
            mode={appBarProperties.managerMode}
            icon='admin-panel-settings'
            labelStyle={styles.labelStyle}
            onPress={() => onPress('manager')}
        />
    </View>
);
