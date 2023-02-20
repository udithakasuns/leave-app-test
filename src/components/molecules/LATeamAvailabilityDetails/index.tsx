import React from 'react';
import { FlatList, View } from 'react-native';
import {
    Avatar,
    AvatarSize,
    Chip,
    Icon,
    IconSize,
    Text,
} from 'src/components/atoms';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors, scale } = theme;

type ItemProps = { uri: string };

const Item = ({ uri }: ItemProps) => (
    <Avatar
        size={AvatarSize.small}
        source={{
            uri,
        }}
        style={styles.avatarStyle}
    />
);

interface Detail {
    availableCount: number;
    hasDateRange: boolean;
    awayTeamMembersDetails: object[];
}

const LATeamAvailabilityDetails = ({
    availableCount,
    hasDateRange,
    awayTeamMembersDetails,
}: Detail) => (
    <View style={styles.detailRow}>
        {hasDateRange === false ? (
            <View style={styles.detailRowLeft}>
                <Text style={styles.availableCountStyle}>{availableCount}</Text>
                <Chip
                    content='Online'
                    contentColor={colors.green800}
                    contentTextType='ParaLG'
                    backgroundColor={colors.lime200}
                    containerStyle={styles.statusChip}
                />
            </View>
        ) : null}
        <View style={styles.detailRowRight}>
            <View style={styles.awayTeamMembersDetails}>
                {awayTeamMembersDetails.map(
                    (item, index) =>
                        index < 5 && ( // <= only 5 items
                            <Item uri={item.uri} />
                        ),
                )}

                {awayTeamMembersDetails.length > 5 ? (
                    <View style={styles.plusIconStyle}>
                        <Icon
                            name='plus'
                            library='community'
                            color={colors.iconLabel}
                            enableBackground
                            size={scale.sc12}
                            backgroundColor={colors.white}
                        />
                        <Text style={styles.plusIconValue}>
                            {awayTeamMembersDetails.length - 5}
                        </Text>
                    </View>
                ) : null}
            </View>
            {awayTeamMembersDetails.length > 0 ? (
                <View style={styles.awayStatusChip}>
                    <Chip
                        content='Away'
                        contentColor={colors.red800}
                        contentTextType='ParaLG'
                        backgroundColor={colors.errorBackground}
                        containerStyle={styles.statusChip}
                    />
                </View>
            ) : null}
        </View>
    </View>
);

export default LATeamAvailabilityDetails;
