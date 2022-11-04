import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { SplashScreenProps } from 'navigators/types';
import { useUserStore } from 'store/index';
import { httpUserLoginApi } from 'src/services/http';
import { saveUserTokens } from 'src/services/local';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});

const accessToken =
    'eyJraWQiOiJPZUZxMW82NHBEMWo1ZDI2RVwvTmlEcDBIOHZHOFlLckd1S002VFVYak9HOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwZjBlMTBlMC03ODcwLTRmM2UtYTAzYS0zNTM5MDQ3MWIxNzMiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfUGJDOExybTBXX0dvb2dsZSJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9QYkM4THJtMFciLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI3ZHMxdjRjZXJvbGo5MnNsanZrcm44dm1rbSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2Njc1NTI5ODEsImV4cCI6MTY2NzU1NjU4MSwiaWF0IjoxNjY3NTUyOTgxLCJqdGkiOiJkZmIzNWEzMi05NmQ3LTRjYmItOGY4Yi02NmE4ZWRhZjI1MDIiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTE3OTYzOTQ1MTUxMDIzODM3NDcifQ.CsMYgRe78l_NWRWPTDfZuKeqGNeNkh-K9slz68jVoLwfQsPTHWEzouIlr156omBYQ3pHEwmlWLFjd4IjpYP9CpfZtwwNpBrthiT-2-Y6BCDpE9z2kyW2J2qv7Zz-s9_tk65WFpUgYcF6ETGAPMNDFbjkwddyY5mRyBq2lQqRW-WgHI-svShAzBR0F-CVXi0gCu0CDuz2PhfCyDIuqFxGwy_Lx3o7asSPDPGXqAKP4ayRO8sh21OkGLlJuKZnttX-0HUyFlUqGrwAk5eO3WheyqEAuF7KajxE2pz_fIZj5J_99mFDRvZTh0BOAzWF5EkX_K58L6YZ_Ko_v77mHWvorg';

const Splash: React.FC<SplashScreenProps> = ({ navigation }) => {
    const userId = useUserStore(state => state.userId);

    useEffect(() => {
        async function fetchData() {
            // You can await here
            const response = await httpUserLoginApi();
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
