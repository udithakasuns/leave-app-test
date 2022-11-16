import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { awsOnGoogleSignOut } from 'services/aws';

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
        <Button title='Signout' onPress={awsOnGoogleSignOut} />
    </View>
);

export default Drawer;
