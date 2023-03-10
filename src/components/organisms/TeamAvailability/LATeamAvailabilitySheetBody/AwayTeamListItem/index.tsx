import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Avatar, AvatarSize, Text } from 'components/atoms';
import { AvatarChip } from 'src/components/molecules';
import {
    getFormattedDay,
    getformatDateToYyyyMmDd,
} from 'src/utils/helpers/dateHandler';
import { EmployeeType, PartialBy } from 'src/utils/types';
import theme from 'src/utils/theme';
import { TID } from 'src/utils/testIds';
import { useStyles } from './styles';

interface Props {
    testID: string;
    date: string;
    awayTeam: EmployeeType[];
    onPressTeamDetailItem: (awayTeam: EmployeeType[]) => void;
    companyHolidays: { dateString: string }[];
}
const { colors } = theme;
const AwayTeamListItem = ({
    testID,
    date,
    awayTeam,
    onPressTeamDetailItem,
    companyHolidays,
}: PartialBy<Props, 'companyHolidays'>) => {
    const styles = useStyles({
        isHoliday:
            companyHolidays?.find(
                holiday => holiday.dateString === getformatDateToYyyyMmDd(date),
            ) !== undefined,
    });
    const getListItemContent = () => {
        if (awayTeam.length === 0 && companyHolidays?.length !== 0) {
            if (
                companyHolidays?.find(
                    holiday =>
                        holiday.dateString === getformatDateToYyyyMmDd(date),
                )
            ) {
                return (
                    <View style={styles.listItemRightContainerText}>
                        <Text testID={`${TID}TEXT_HOLIDAY`}>
                            🥳 Full Woo hoo, holiday!
                        </Text>
                    </View>
                );
            }
        }
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
        return (
            <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => {
                    onPressTeamDetailItem(awayTeam);
                }}>
                {awayTeam?.slice(0, 5).map((item, index) => (
                    <Avatar
                        testId={`${TID}IMAGE_AVATAR_AWAY_MEMBER_${index}`}
                        size={AvatarSize.small}
                        source={{
                            uri: item.authPic ?? '',
                        }}
                        style={
                            index === 0
                                ? styles.avatar
                                : styles.avatarWithLeftSpace
                        }
                    />
                ))}
                {awayTeam.length > 5 && (
                    <View style={styles.listItemPlusIcon}>
                        <Text
                            testID={`${TID}TEXT_AWAY_COUNT`}
                            color={colors.iconLabel}>
                            +{awayTeam.length - 5}
                        </Text>
                    </View>
                )}
            </TouchableOpacity>
        );
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

export default React.memo(AwayTeamListItem);
