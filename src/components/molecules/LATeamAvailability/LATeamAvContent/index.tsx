import React from 'react';
import { View } from 'react-native';
import { Avatar, AvatarSize, Chip, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props {
    availableTeamCount: number;
    awayTeamImages: string[];
}

const LATeamAvContent = ({
    availableTeamCount,
    awayTeamImages,
}: AtLeast<Props, 'awayTeamImages'>) => {
    const displayTeamCountContent = () => {
        if (awayTeamImages.length === 0) {
            return null;
        }
        return (
            <View style={styles.availableContainer}>
                <Text type='H1Bold'>{availableTeamCount}</Text>
                <Chip
                    content='Online'
                    contentColor={colors.green800}
                    contentTextType='ParaSM'
                    backgroundColor={colors.lime200}
                    containerStyle={styles.availableChip}
                />
            </View>
        );
    };

    const displayEmptyDataContent = () => (
        <View style={styles.emtyContainer}>
            <Text numberOfLines={2} type='ParaLGBold'>
                🧐 No data for this team
            </Text>
            <Text numberOfLines={2} type='ParaSM' color={colors.gray700}>
                There is no availability data for this team yet.
            </Text>
        </View>
    );

    const displayImagContent = () => (
        <View style={styles.container}>
            {awayTeamImages.slice(0, 5).map((image, index) => (
                <Avatar
                    key={image}
                    size={AvatarSize.small}
                    source={{
                        uri: image,
                    }}
                    style={
                        index === 0 ? styles.avatar : styles.avatarWithLeftSpace
                    }
                />
            ))}
            {awayTeamImages.length > 5 && (
                <View style={styles.plusIcon}>
                    <Text color={colors.iconLabel}>
                        +{awayTeamImages.length - 5}
                    </Text>
                </View>
            )}
            <Chip
                content='Away'
                contentColor={colors.red800}
                contentTextType='ParaSM'
                backgroundColor={colors.errorBackground}
                containerStyle={styles.awayChip}
            />
        </View>
    );

    return (
        <View style={styles.container}>
            {availableTeamCount !== undefined && displayTeamCountContent()}
            {awayTeamImages.length === 0
                ? displayEmptyDataContent()
                : displayImagContent()}
        </View>
    );
};

export default LATeamAvContent;
