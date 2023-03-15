import React from 'react';
import { View } from 'react-native';
import { Text } from 'src/components/atoms';
import { styles } from './styles';

interface Detail {
    label: string;
    value: string;
}

const DetailItem = ({ label, value }: Detail) => (
    <View style={styles.detailRow}>
        <Text type='SubH'>{label} : </Text>
        <Text style={{ flex: 1 }} type='SubH'>
            {value}
        </Text>
    </View>
);

export default DetailItem;
