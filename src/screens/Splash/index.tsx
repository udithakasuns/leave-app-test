import React from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { SplashScreenProps } from 'navigators/types';
import LAInput from 'src/components/atoms/LAInput';
import LAChip from 'src/components/atoms/LAChip';
import { TextInput } from 'react-native-gesture-handler';

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

    const testRef: React.LegacyRef<TextInput> = React.createRef();

    return (
        <View style={styles.container}>
            <LAChip
                content='My Chip'
                outline
                // disabled
                // onPressChip={() => console.log('Chip')}
                // onPressLeft={() => console.log('Left')}
                // onPressRight={() => console.log('right')}
                // leftIconName='home'
                rightIconName='home'
            />
            <LAChip content='My Chip' contentColor='red' />
            <LAChip
                content='My Chip'
                contentColor='red'
                backgroundColor='blue'
                disabled
            />
            <LAChip
                content='My Chip'
                contentColor='red'
                contentTextType='H1Bold'
            />
            <LAChip content='My Chip' outline />
            <LAChip content='My Chip' outline outlineColor='red' />
            <LAChip content='My Chip' disabled outlineColor='red' />
            <LAChip content='My Chip' outline disabled outlineColor='red' />

            <LAChip leftIconName='home' content='My Chip' />
            <LAChip
                leftIconName='home'
                rightIconName='home'
                content='My Chip'
            />
            <LAChip
                disabled
                leftIconName='home'
                rightIconName='home'
                content='My Chip'
            />
            <LAChip content='🌴 My Chip' contentTextType='H1Bold' />
            <LAChip
                content='🌴 My Chip'
                leftIconName='home'
                rightIconName='home'
                // onPressLeft={() => console.log('presed')}
                // onPressRight={() => console.log('presed')}
            />
            {/* <LAInput
                label='One'
                placeholder='input one'
                value={value}
                leftIconName='home'
                rightIconName='home'
                caption='my caption'
                error
                onChangeText={val => setValue(val)}
                onSubmitEditing={() => {
                    if (testRef && testRef.current) {
                        testRef.current.focus();
                    }
                }}
            />
            <LAInput
                reference={testRef}
                type='LARGE'
                label='Large'
                placeholder='input large'
                value={value}
                leftIconName='home'
                rightIconName='home'
                onChangeText={val => setValue(val)}
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
                // disabled
                error
            /> */}
            {/* <Text>Splash</Text>
        <Button title='Login' onPress={() => navigation.navigate('Login')} /> */}
        </View>
    );
};

export default Splash;
