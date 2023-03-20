import React from 'react';
import { TextStyle, StyleProp } from 'react-native';
import { Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { PartialBy } from 'src/utils/types';

const { colors } = theme;

interface Props {
    style: StyleProp<TextStyle>;
    awayTeamList: string[];
    leaveDuration: string; // eg: 8th Mar || 19th - 22nd Jan
}

const LATeamAvAvailabileText = ({
    awayTeamList,
    leaveDuration,
    style,
}: PartialBy<Props, 'style'>) => {
    const getDisplayText = (): string => {
        const awayMembersCount = awayTeamList.length;
        if (awayMembersCount === 0) {
            return 'All team members are available! 🥳';
        }
        if (awayMembersCount === 1) {
            const firstName = awayTeamList[0].split(' ')[0];
            return `${leaveDuration} - ${firstName} is away`;
        }
        if (awayMembersCount === 2) {
            const firstName = awayTeamList[0].split(' ')[0];
            const secondName = awayTeamList[1].split(' ')[0];

            return `${leaveDuration} - ${firstName} and ${secondName} are away`;
        }

        const firstName = awayTeamList[0].split(' ')[0];
        const secondName = awayTeamList[1].split(' ')[0];

        return `${leaveDuration} - ${firstName}, ${secondName} and more are away`;
    };

    return (
        <Text
            testID={`${TID}TEXT_TEAM_AVAILABILITY`}
            style={style}
            color={colors.tertiaryLabel}>
            {getDisplayText()}
        </Text>
    );
};

export default LATeamAvAvailabileText;
