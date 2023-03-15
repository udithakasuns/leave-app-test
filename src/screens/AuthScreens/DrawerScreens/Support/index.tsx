import React from 'react';
import { View, ScrollView } from 'react-native';
import { BackHeader } from 'src/components/molecules';
import { screenStyles } from 'src/utils/styles';
import { SupportScreensProps } from 'navigators/types';
import { Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import useBackAction from 'src/utils/hooks/useBackAction';
import getAppVersion from 'src/utils/helpers/getAppVersion';
import { inAppNormalUrlHandler } from 'src/utils/helpers/inAppUrlHandler';
import { DEPLOYMENT_ENV, SUPPORT_URL } from 'src/configs';
import { styles } from './styles';
import DetailItem from './DetailItem';
import CrashCheck from './CrashCheck';

const { scale } = theme;

const Support: React.FC<SupportScreensProps> = () => {
    const backAction = useBackAction();

    return (
        <View style={screenStyles.containerScollable}>
            <ScrollView
                contentContainerStyle={screenStyles.scrollViewContainer}>
                <BackHeader title='Home' onBackPress={backAction} />
                <Spacer height={scale.sc10} />
                <Text type='H1Bold'>Support</Text>
                <Spacer height={scale.sc10} />
                <View style={styles.divider} />
                <Spacer height={scale.sc20} />
                <Text type='H2Bold'>Contact us</Text>
                <DetailItem label='Contact number' value='0112 574 572' />
                <DetailItem label='Email' value='support@myleave.io' />
                <DetailItem
                    label='Help url'
                    value={SUPPORT_URL}
                    iconName='open-in-new'
                    onPressIcon={() => inAppNormalUrlHandler(SUPPORT_URL)}
                />
                <Spacer height={scale.sc10} />
                <View style={styles.divider} />
                <Spacer height={scale.sc20} />
                <Text type='H2Bold'>About</Text>
                <DetailItem label='Developed by' value='Rootcode pvt ltd' />
                <DetailItem label='App version' value={getAppVersion()} />

                {/* Crash check functionality is only showing for STG environment */}
                {DEPLOYMENT_ENV === 'STG' && <CrashCheck />}
                <Spacer height={scale.sc20} />
            </ScrollView>
        </View>
    );
};

export default Support;
