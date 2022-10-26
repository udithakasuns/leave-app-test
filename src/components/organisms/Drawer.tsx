import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// import { LoginScreenProps } from '../../navigators/types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Drawer: React.FC = () => (
    <View style={styles.container}>
        <Text>Drawer</Text>
    </View>
);

export default Drawer;
