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
    date: string;
    awayMemberDetailsList: EmployeeType[];
}
const { colors } = theme;
const ListItem = ({ date, awayMemberDetailsList }: Props) => {
    const getListItemContent = () => {
        if (awayMemberDetailsList.length === 0) {
            return (
                <View style={styles.listItemRightContainerText}>
                    <Text testID={`${TID}TEXT_FULL_TEAM_AVAILABLE`}>
                        🥳 Full team available
                    </Text>
                </View>
            );
        }
        if (awayMemberDetailsList.length <= 2) {
            return awayMemberDetailsList?.map((item, index) => (
                <AvatarChip
                    testId={`${TID}CHIP_IMAGE_AVATAR_${index}`}
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
        return awayMemberDetailsList?.map((item, index) => (
            <Avatar
                testId={`${TID}IMAGE_AVATAR_AWAY_MEMBER_${index}`}
                size={AvatarSize.small}
                source={{
                    uri: item.authPic ?? '',
                }}
                style={styles.listItemAvatarStyle}
            />
        ));
    };

    return (
        <View style={styles.listItemContainer}>
            <View style={styles.listItemLeftContainer}>
                <View style={styles.listItemDateContainer}>
                    <Text
                        testID={`${TID}TEXT_SELECTED_DATE`}
                        style={styles.listItemDateStyle}>
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
