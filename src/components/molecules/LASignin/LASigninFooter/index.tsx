import React from 'react';
import { View } from 'react-native';
import { Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { SUPPORT_URL, PRIVACY_POLICY_URL } from 'src/configs';
import { inAppNormalUrlHandler } from 'src/utils/helpers/inAppUrlHandler';
import { LALinkText } from 'src/components/molecules';
import { TID } from 'src/utils/testIds';
import { styles } from './styles';

const { colors } = theme;

const LASigninFooter = () => (
    <View style={styles.container}>
        <LALinkText
            testIdText={`${TID}LINK_TEXT_SUPPORT`}
            text='Get support'
            onPress={() => inAppNormalUrlHandler(SUPPORT_URL)}
        />
        <Text
            testID={`${TID}TEXT_PIPE`}
            type='SubH'
            style={styles.pipe}
            color={colors.primaryGrayLabel}>
            |
        </Text>
        <LALinkText
            testIdText={`${TID}LINK_TEXT_PRIVACY`}
            text='Privacy policy'
            onPress={() => inAppNormalUrlHandler(PRIVACY_POLICY_URL)}
        />
    </View>
);

export default React.memo(LASigninFooter);
