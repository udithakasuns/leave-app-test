import React from 'react';
import { View } from 'react-native';
import { Avatar, AvatarSize, Chip, Icon, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors, scale } = theme;

interface Detail {
    availableTeamCount: number;
    hasDateRange: boolean;
    awayTeamImages: string[];
}

const LATeamAvailabilityDetails = ({
    availableTeamCount,
    hasDateRange,
    awayTeamImages,
}: Detail) => (
    <View style={styles.detailRow}>
        {hasDateRange === false ? (
            <View style={styles.detailRowLeft}>
                <Text style={styles.availableCountStyle}>
                    {availableTeamCount}
                </Text>
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
                {awayTeamImages.map(
                    (item, index) =>
                        index < 5 && ( // <= only 5 items
                            <Avatar
                                key={item}
                                size={AvatarSize.small}
                                source={{
                                    uri: item,
                                }}
                                style={styles.avatarStyle}
                            />
                        ),
                )}

                {awayTeamImages.length > 5 ? (
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
                            {awayTeamImages.length - 5}
                        </Text>
                    </View>
                ) : null}
            </View>
            {awayTeamImages.length > 0 ? (
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
