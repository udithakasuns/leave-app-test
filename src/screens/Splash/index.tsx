/* eslint-disable prettier/prettier */
import { SplashScreenProps } from 'navigators/types';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { httpUserLoginApi } from 'src/services/http';
import { saveUserTokens } from 'src/services/local/tokens';
import { useUserStore } from 'store/index';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});

const Splash: React.FC<SplashScreenProps> = ({ navigation }) => {
    const userId = useUserStore(state => state.userId);

    // useEffect(() => {
    //     async function fetchData() {
    //         // You can await here
    //         const response = await httpUserLoginApi();
    //         // eslint-disable-next-line no-console
    //         console.log('s', response);
    //         // ...
    //     }
    //     fetchData();

    // saveUserTokens({
    //     accessToken,
    //     idToken: '',
    //     refreshToken: '',
    //     // });
    // }, []);

    return (
        <View style={styles.container}>
            <Text>Hello {userId}</Text>
        </View>
    );
};

export default Splash;
