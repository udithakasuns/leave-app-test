import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { EmployeeHomeScreensProps } from '../../navigators/types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const EmployeeHome: React.FC<EmployeeHomeScreensProps> = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Employee Home</Text>
        <Button
            title='Manager Home'
            onPress={() => navigation.navigate('ManagerHome')}
        />
        <Button
            title='Apply Leave'
            // onPress={() =>
            //     navigation.navigate('Modal', { screen: 'ApplyLeave' })
            // }
        />
        <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
);

export default EmployeeHome;
