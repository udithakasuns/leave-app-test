import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { SUPPORT_URL, PRIVACY_POLICY_URL } from 'src/configs';
import { inAppNormalUrlHandler } from 'src/utils/helpers/inAppUrlHandler';
import { styles } from './styles';

const { colors } = theme;

const Footer = () => (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => inAppNormalUrlHandler(SUPPORT_URL)}>
            <Text
                type='SubH'
                style={styles.text}
                color={colors.primaryGrayLabel}>
                Get support
            </Text>
        </TouchableOpacity>
        <Text type='SubH' style={styles.pipe} color={colors.primaryGrayLabel}>
            |
        </Text>
        <TouchableOpacity
            onPress={() => inAppNormalUrlHandler(PRIVACY_POLICY_URL)}>
            <Text
                type='SubH'
                style={styles.text}
                color={colors.primaryGrayLabel}>
                Privacy policy
            </Text>
        </TouchableOpacity>
    </View>
);

export default Footer;
