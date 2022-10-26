import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { LoginScreenProps } from '../../navigators/types';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

const Login: React.FC<LoginScreenProps> = ({ navigation }) => (
    <View style={styles.container}>
        <Text>Login</Text>
        <Button
            title='Home'
            onPress={() =>
                navigation.navigate('Auth', { screen: 'EmployeeHome' })
            }
        />
    </View>
);

export default Login;
