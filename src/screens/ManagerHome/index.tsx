import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ManagerHomeScreensProps } from '../../navigators/types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const ManagerHome: React.FC<ManagerHomeScreensProps> = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Manager Home</Text>
        <Button title='Go back' onPress={() => navigation.goBack()} />
    </View>
);

export default ManagerHome;
