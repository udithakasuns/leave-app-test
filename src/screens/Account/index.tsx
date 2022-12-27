import React from 'react';
import { View, ScrollView } from 'react-native';
import { AccountScreensProps } from 'navigators/types';
import { screenStyles } from 'src/utils/styles';
import { useUserStore } from 'src/store';
import { BackHeader } from 'src/components/molecules';
import { Avatar, Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import useBackAction from 'src/utils/hooks/useBackAction';
import { styles } from './styles';
import DetailItem from './DetailItem';

const { colors, scale } = theme;

const Account: React.FC<AccountScreensProps> = () => {
    const backAction = useBackAction();

    const {
        user: { profilePic, firstName, lastName, designation, userId, email },
    } = useUserStore();

    return (
        <View style={screenStyles.containerScollable}>
            <ScrollView
                contentContainerStyle={screenStyles.scrollViewContainer}>
                <BackHeader title='Home' onBackPress={backAction} />
                <View style={styles.content}>
                    <Avatar source={{ uri: profilePic }} size={scale.sc96} />
                    <Spacer height={scale.sc6} />
                    <Text numberOfLines={1} type='H1Bold'>
                        {firstName} {lastName}
                    </Text>
                    <Text
                        numberOfLines={2}
                        type='ParaLG'
                        color={colors.gray600}>
                        {designation}
                    </Text>
                    <Spacer height={scale.sc10} />
                    <View style={styles.divider} />
                    <Spacer height={scale.sc10} />
                    <Text numberOfLines={1} type='H2Bold'>
                        Personal Details
                    </Text>
                    <DetailItem
                        label='Full name'
                        value={`${firstName} ${lastName}`}
                    />
                    <DetailItem label='Employee ID' value={userId} />
                    <DetailItem label='Email' value={email} />
                </View>
            </ScrollView>
        </View>
    );
};

export default Account;
