import React from 'react';
import { View } from 'react-native';
import { Icon, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';
import { styles } from './styles';

const { colors, scale } = theme;

interface Detail {
    label: string;
    value: string;
    valueFlexNumber: number;
    iconName: string;
    onPressIcon: () => void;
}

const DetailItem = ({
    label,
    value,
    iconName,
    onPressIcon,
}: AtLeast<Detail, 'label' | 'value'>) => (
    <View style={styles.detailRow}>
        <Text type='SubH'>{label} : </Text>
        <Text type='SubH'>{value}</Text>
        {iconName && (
            <Icon
                onPress={onPressIcon}
                style={styles.iconStyle}
                name={iconName}
                color={colors.secondaryOutline}
                size={scale.sc20}
            />
        )}
    </View>
);

export default DetailItem;
