import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SplashScreenProps } from 'navigators/types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Splash: React.FC<SplashScreenProps> = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Splash</Text>
        <Button title='Login' onPress={() => navigation.navigate('Login')} />
    </View>
);

export default Splash;
