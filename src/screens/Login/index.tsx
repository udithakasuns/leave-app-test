import React from 'react';
import { View, Button } from 'react-native';
import { LoginScreenProps } from 'navigators/types';
import { Amplify } from 'aws-amplify';
import amplifiConfig from 'src/aws-exports';
import { awsOnGoogleSignIn } from 'src/services/aws';
import inAppUrlHandler from 'utils/helpers/inAppUrlHandler';

Amplify.configure({
    ...amplifiConfig,
    oauth: {
        ...amplifiConfig.oauth,
        urlOpener: inAppUrlHandler,
    },
});

const Login: React.FC<LoginScreenProps> = ({ navigation }) => (
    <View
        style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
        <Button title='Google Signin' onPress={awsOnGoogleSignIn} />
    </View>
);

export default Login;
