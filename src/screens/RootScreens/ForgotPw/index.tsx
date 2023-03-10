import React from 'react';
import { View, ScrollView } from 'react-native';
import { ForgotPwScreenProps } from 'navigators/types';
import { screenStyles } from 'src/utils/styles';
import { Header } from 'src/components/organisms/ForgotPw';

const ForgotPw: React.FC<ForgotPwScreenProps> = () => (
    <View style={screenStyles.container}>
        <ScrollView contentContainerStyle={screenStyles.scrollViewContainer}>
            <Header />
        </ScrollView>
    </View>
);

export default ForgotPw;
