import React from 'react';
import { View } from 'react-native';
import { BackHeader, LARootHeader } from 'src/components/molecules';
import { PasswordContent } from 'src/components/organisms/ResetPw';
import { ResetPwScreenProps } from 'src/navigators/types';
import { screenStyles } from 'src/utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ResetPw: React.FC<ResetPwScreenProps> = ({ route, navigation }) => {
    const onGoBack = () => navigation.goBack();
    const onNavigateToResetPwSuccess = () =>
        navigation.navigate('ResetPwSuccess');

    return (
        <View style={screenStyles.containerScollable}>
            <BackHeader title='' onBackPress={onGoBack} />
            <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={screenStyles.scrollViewCenterContainer}>
                <LARootHeader
                    title='Reset password'
                    subTitle='Please choose your new password'
                />
                <PasswordContent
                    route={route}
                    onNavigateToResetPwSuccess={onNavigateToResetPwSuccess}
                />
            </KeyboardAwareScrollView>
        </View>
    );
};

export default ResetPw;
