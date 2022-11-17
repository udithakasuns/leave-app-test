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

const accessToken =
    'eyJraWQiOiJPZUZxMW82NHBEMWo1ZDI2RVwvTmlEcDBIOHZHOFlLckd1S002VFVYak9HOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwZjBlMTBlMC03ODcwLTRmM2UtYTAzYS0zNTM5MDQ3MWIxNzMiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfUGJDOExybTBXX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9QYkM4THJtMFciLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI3ZHMxdjRjZXJvbGo5MnNsanZrcm44dm1rbSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2Njc2NzEwNzcsImV4cCI6MTY2NzY3NDY3NywiaWF0IjoxNjY3NjcxMDc3LCJqdGkiOiI3MTQyYTM5Ni0wN2JlLTQ5YTItODhhYy0zYTgxODY3YmM3YWUiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTE3OTYzOTQ1MTUxMDIzODM3NDcifQ.qe0TLo97jEOuYPk_kwe2X3X7sAGUfIaqeOJyzJMyriI_16EVEzzLhx7Ezn-Ko8h2Au1hP3qfxAMERwqKskIHHXqABA9-kUkUlW2Z3Y6GOkpXogIE9YZm0ZrKFDgoG3-Pvgk3-f6_ZX_U92wMXYqFUqVnc9HI-il2htXwRqUtp2BOV8uRGnOyreRIy3KOkgmfUdzFcAZh7mlLpBq_ynfb7bwO3uF0RFlz_AqFpgg75unoHW6DqkxqDhHRqBRZFlJ44BIwxHRd94jiC3Wd-SgQKFVheYdTOcmM1eOIFzxcnGLRTM5NtgxEomQKGJPnaEW6CHGqLlRVm07xal-hZ0RJdg';

const Splash: React.FC<SplashScreenProps> = ({ navigation }) => {
    const userId = useUserStore(state => state.userId);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await httpUserLoginApi();
            // eslint-disable-next-line no-console
            console.log('s', response);
            // ...
        }
        fetchData();

        // saveUserTokens({
        //     accessToken,
        //     idToken: '',
        //     refreshToken: '',
        // });
    }, []);

    return (
        <View style={styles.container}>
            <Text>Hello {userId}</Text>
        </View>
    );
};

export default Splash;
