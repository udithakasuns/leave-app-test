import React from 'react';
import { View, ScrollView } from 'react-native';
import { BackHeader, LARootFooter } from 'src/components/molecules';
import { Header, Content } from 'src/components/organisms/ProviderCode';
import { ProviderCodeScreenProps } from 'src/navigators/types';
import { screenStyles } from 'src/utils/styles';
import { styles } from './styles';

const ProviderCode: React.FC<ProviderCodeScreenProps> = ({ navigation }) => {
    const onNavigateToGeneralLogin = () => navigation.navigate('LoginGeneral');
    const onNavigateToSocialLogin = () => navigation.navigate('LoginSocial');

    return (
        <View style={screenStyles.containerScollable}>
            <BackHeader title='' onBackPress={onNavigateToSocialLogin} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets
                keyboardShouldPersistTaps='handled'
                contentContainerStyle={[
                    screenStyles.scrollViewContainer,
                    styles.scrollView,
                ]}>
                <Header />
                <Content
                    onNavigateToSocialLogin={onNavigateToSocialLogin}
                    onNavigateToGeneralLogin={onNavigateToGeneralLogin}
                />
            </ScrollView>
            <LARootFooter />
        </View>
    );
};

export default ProviderCode;
