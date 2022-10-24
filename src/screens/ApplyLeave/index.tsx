import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { ApplyLeaveScreensProps } from '../../navigators/types';

const styles = StyleSheet.create({
    container: {
        paddingTop: 150,
        backgroundColor: 'transparent',
    },
    content: {},
});

const ApplyLeave: React.FC<ApplyLeaveScreensProps> = ({ navigation }) => (
    <View style={styles.container}>
        <View style={styles.content}>
            <Text>Apply Leave Modal</Text>
            <Button title='Close' onPress={() => navigation.goBack()} />
        </View>
    </View>
);

export default ApplyLeave;
