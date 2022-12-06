import React from 'react';
import { View } from 'react-native';
import { Chip } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { TestProps } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props extends Partial<TestProps> {
    sortBy: string;
    onPressSortBy: () => void;
    onPressFilter: () => void;
    disabled: boolean;
}

const LAFilterButtons = ({
    sortBy,
    onPressSortBy,
    onPressFilter,
    disabled,
}: Props) => (
    <View style={styles.container}>
        <Chip
            content={`Sort by : ${sortBy}`}
            rightIconName='arrow-drop-down'
            outline
            disabled={disabled}
            contentColor={colors.black}
            onPressChip={onPressSortBy}
            contentTextType='ParaLG'
            outlineColor={colors.gray300}
            contentStyle={styles.contentStyle}
            pressableContainerStyle={styles.pressableContainerStyle}
            containerStyle={styles.containerStyle}
        />
        <Chip
            content='Filter'
            rightIconName='tune'
            outline
            disabled={disabled}
            contentColor={colors.black}
            onPressChip={onPressFilter}
            contentTextType='ParaLG'
            outlineColor={colors.gray300}
            contentStyle={styles.contentStyle}
            pressableContainerStyle={styles.pressableContainerStyle}
            containerStyle={styles.containerStyle}
        />
    </View>
);

export default LAFilterButtons;
