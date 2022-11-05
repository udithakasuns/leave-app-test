import React from 'react';
import { Chip, ChipProps, IconSize } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { AtLeast, StatusType, TestProps } from 'src/utils/types';
import { styles } from './styles';

const { colors, scale } = theme;

type StatusChipProps = Partial<TestProps> & {
    status: StatusType;
    onPress: () => void;
};

const LAStatusChip = ({
    status,
    onPress,
    testId,
    testIdContent,
    testIdLeftIcon,
}: StatusChipProps) => {
    let chipProps: AtLeast<
        ChipProps,
        'content' | 'leftIconName' | 'leftIconColor'
    >;

    switch (status) {
        case 'PENDING':
            chipProps = {
                content: 'Pending',
                leftIconName: 'checkbox-blank-circle-outline',
                leftIconColor: colors.pending,
            };
            break;
        case 'APPROVED':
            chipProps = {
                content: 'Approved',
                leftIconName: 'circle',
                leftIconColor: colors.approved,
            };
            break;
        case 'DENIED':
            chipProps = {
                content: 'Denied',
                leftIconName: 'circle',
                leftIconColor: colors.error,
            };
            break;
        default:
            chipProps = {
                content: 'Cancelled',
                leftIconName: 'circle',
                leftIconColor: colors.black,
            };
            break;
    }

    return (
        <Chip
            testIdChipPressable={testId}
            testIdContent={testIdContent}
            testIdLeftIcon={testIdLeftIcon}
            content={chipProps.content}
            leftIconName={chipProps.leftIconName}
            leftIconLibrary='community'
            contentColor={theme.colors.gray600}
            leftIconColor={chipProps.leftIconColor}
            leftIconSize={IconSize.xxSmall}
            onPressChip={onPress}
            contentTextType='ParaLG'
            contentStyle={styles.content}
            pressableContainerStyle={styles.pressableContainer}
            containerStyle={styles.container}
        />
    );
};

export default LAStatusChip;
