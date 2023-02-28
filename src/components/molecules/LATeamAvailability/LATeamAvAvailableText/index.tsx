import React from 'react';
import { Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';

const { colors } = theme;

interface Props {
    awayTeamList: string[];
    leaveDuration: string; // eg: 8th Mar || 19th - 22nd Jan
}

const LATeamAvAvailabileText = ({ awayTeamList, leaveDuration }: Props) => {
    const getDisplayText = (): string => {
        const len = awayTeamList.length;
        if (len === 0) {
            return '🥳  All team members are available!';
        }
        if (len === 1) {
            const firstName = awayTeamList[0].split(' ')[0];
            return `${leaveDuration} - ${firstName} is away`;
        }
        if (len === 2) {
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
            color={colors.tertiaryLabel}>
            {getDisplayText()}
        </Text>
    );
};

export default LATeamAvAvailabileText;
