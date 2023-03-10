import React from 'react';
import { View } from 'react-native';
import { BackHeader } from 'src/components/molecules';
import { Header, PasswordContent } from 'src/components/organisms/ResetPw';
import { ResetPwScreenProps } from 'src/navigators/types';
import { screenStyles } from 'src/utils/styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ResetPw: React.FC<ResetPwScreenProps> = ({ route, navigation }) => {
    const onGoBack = () => navigation.goBack();

    const { user } = route.params;

    return (
        <View style={screenStyles.containerScollable}>
            <BackHeader title='' onBackPress={onGoBack} />
            <KeyboardAwareScrollView
                contentContainerStyle={screenStyles.scrollViewCenterContainer}>
                <Header />
                <PasswordContent pwResetType='initial' user={user} />
            </KeyboardAwareScrollView>
        </View>
    );
};

export default ResetPw;
