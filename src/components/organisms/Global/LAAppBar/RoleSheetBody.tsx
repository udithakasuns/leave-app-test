/* eslint-disable import/no-cycle */
import React from 'react';
import { View } from 'react-native';
import { Button, Spacer } from 'src/components/atoms';
import { CurrentScreen, SelectedProperties } from '.';
import { styles } from './styles';

export const RoleSheetBody = ({
    appBarProperties,
    onPress,
}: {
    appBarProperties: SelectedProperties;
    onPress: (currentScreen: CurrentScreen) => void;
}) => (
    <View style={styles.roleSheetContainer}>
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
            icon='manager'
            iconLibrary='svg'
            labelStyle={styles.labelStyle}
            onPress={() => onPress('manager')}
        />
    </View>
);
