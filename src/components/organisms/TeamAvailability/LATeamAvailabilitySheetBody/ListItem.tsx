import React from 'react';
import { View } from 'react-native';
import { Avatar, AvatarSize, Text } from 'components/atoms';
import { AvatarChip } from 'src/components/molecules';
import { getFormattedDay } from 'src/utils/helpers/dateHandler';
import { EmployeeType } from 'src/utils/types';
import theme from 'src/utils/theme';
import { TID } from 'src/utils/testIds';
import { styles } from './styles';

interface Props {
    testID: string;
    date: string;
    awayTeam: EmployeeType[];
}
const { colors } = theme;
const ListItem = ({ testID, date, awayTeam }: Props) => {
    const getListItemContent = () => {
        if (awayTeam.length === 0) {
            return (
                <View style={styles.listItemRightContainerText}>
                    <Text testID={`${TID}TEXT_FULL_TEAM_AVAILABLE`}>
                        🥳 Full team available
                    </Text>
                </View>
            );
        }
        if (awayTeam.length <= 2) {
            return awayTeam?.map((item, index) => (
                <AvatarChip
                    testIdContent={`${TID}CHIP_IMAGE_AVATAR_${index}`}
                    size={AvatarSize.small}
                    label={item.name?.split(' ')[0] ?? ''}
                    source={{
                        uri: item.authPic ?? '',
                    }}
                    labelStyle={{ color: colors.black }}
                    containerStyle={styles.listItemExpandAvatarStyle}
                />
            ));
        }
        return awayTeam?.map((item, index) => (
            <Avatar
                testId={`${TID}IMAGE_AVATAR_AWAY_MEMBER_${index}`}
                size={AvatarSize.small}
                source={{
                    uri: item.authPic ?? '',
                }}
                style={index === 0 ? styles.avatar : styles.avatarWithLeftSpace}
            />
        ));
    };

    return (
        <View style={styles.listItemContainer}>
            <View style={styles.listItemLeftContainer}>
                <View style={styles.listItemDateContainer}>
                    <Text testID={testID} style={styles.listItemDateStyle}>
                        {getFormattedDay(date, true)}
                    </Text>
                </View>
            </View>
            <View style={styles.listItemRightContainer}>
                {getListItemContent()}
            </View>
        </View>
    );
};

export default React.memo(ListItem);
