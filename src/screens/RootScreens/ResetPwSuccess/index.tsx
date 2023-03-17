import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import { BackHeader, LARootHeader } from 'src/components/molecules';
import { ResetPwSuccessScreenProps } from 'src/navigators/types';
import { screenStyles } from 'src/utils/styles';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { scale } = theme;

const ResetPwSucces: React.FC<ResetPwSuccessScreenProps> = ({ navigation }) => {
    const onBackPress = () => navigation.goBack();
    const onNavigateToLoginGeneral = () => navigation.navigate('LoginGeneral');

    return (
        <View style={screenStyles.containerScollable}>
            <BackHeader title='' onBackPress={onBackPress} />
            <ScrollView
                contentContainerStyle={screenStyles.scrollViewCenterContainer}>
                <Text style={styles.unicode}>👌🏼</Text>
                <Spacer height={scale.sc10} />
                <LARootHeader
                    title='Password reset'
                    subTitle='A new password has been set for your account. Please proceed to login.'
                />
                <Button
                    iconPosition='left'
                    icon='arrow-forward'
                    label='Proceed to login'
                    buttonStyle={styles.button}
                    onPress={onNavigateToLoginGeneral}
                />
            </ScrollView>
        </View>
    );
};

export default ResetPwSucces;
