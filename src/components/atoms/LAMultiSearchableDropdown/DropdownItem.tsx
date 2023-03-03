import React from 'react';
import { View, Pressable } from 'react-native';
import { Icon, Text } from 'components/atoms';
import theme from 'src/utils/theme';
import { PartialBy } from 'src/utils/types';
import { styles } from './style';

const { colors } = theme;

interface Props {
    testIdItem: string;
    testIdContent: string;
    label: string;
    isSelected: boolean;
    index: number;
    onPress: () => void;
}

const DropDownItem = ({
    testIdItem,
    testIdContent,
    label,
    isSelected,
    index,
    onPress,
}: PartialBy<Props, 'testIdItem' | 'testIdContent'>) => (
    <Pressable
        testID={testIdItem}
        onPress={onPress}
        style={[
            isSelected ? styles.listRowSelected : styles.listRow,
            index === 0 && { borderTopLeftRadius: 0 },
        ]}>
        <Text
            testID={testIdContent}
            color={isSelected ? colors.secondaryOutline : colors.black}>
            {label}
        </Text>
        {isSelected ? (
            <Icon name='check-circle' color={colors.secondaryOutline} />
        ) : (
            <View />
        )}
    </Pressable>
);

export default React.memo(DropDownItem);
