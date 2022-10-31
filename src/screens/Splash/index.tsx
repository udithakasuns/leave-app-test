import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { SplashScreenProps } from 'navigators/types';
import LAInput from 'src/components/atoms/LAInput';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});

const Splash: React.FC<SplashScreenProps> = ({ navigation }) => {
    const [value, setValue] = React.useState<string>('');

    return (
        <View style={styles.container}>
            <LAInput
                label='One'
                placeholder='input one'
                value={value}
                leftIconName='home'
                rightIconName='home'
                caption='my caption'
                error
            />
            <LAInput
                type='LARGE'
                label='Large'
                placeholder='input large'
                value={value}
                leftIconName='home'
                rightIconName='home'
            />
            <LAInput
                type='SMALL'
                label='Small'
                placeholder='input small'
                value={value}
                leftIconName='home'
                rightIconName='home'
            />
            <LAInput
                inputContainerStyle={{ backgroundColor: '#FFFBEB' }}
                type='COMMENT'
                label='Comment'
                placeholder='input Comment'
                value={value}
            />
            {/* <Text>Splash</Text>
        <Button title='Login' onPress={() => navigation.navigate('Login')} /> */}
        </View>
    );
};

export default Splash;
