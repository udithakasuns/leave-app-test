import React from 'react';
import { View } from 'react-native';
import { Avatar, AvatarSize, Chip, Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { AtLeast } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props {
    showAvailableTeamCount: boolean;
    availableTeamCount: number;
    awayTeamImages: string[];
}

const LATeamAvContent = ({
    showAvailableTeamCount = false,
    availableTeamCount,
    awayTeamImages,
}: AtLeast<Props, 'availableTeamCount' | 'awayTeamImages'>) => {
    const displayTeamCountContent = () => {
        if (awayTeamImages.length === 0) {
            return null;
        }
        return (
            <View style={styles.availableContainer}>
                <Text testID={`${TID}TEXT_AVAILABLE_COUNT`} type='H1Bold'>
                    {availableTeamCount}
                </Text>
                <Chip
                    testIdContent={`${TID}CHIP_ONLINE`}
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
            <Text
                testID={`${TID}TEXT_NO_DATA`}
                numberOfLines={2}
                type='ParaLGBold'>
                🧐 No data for this team
            </Text>
            <Text
                testID={`${TID}TEXT_SUB_NO_DATA`}
                numberOfLines={2}
                type='ParaSM'
                color={colors.gray700}>
                There is no availability data for this team yet.
            </Text>
        </View>
    );

    const displayImagContent = () => {
        if (awayTeamImages.length === 0) {
            return null;
        }
        return (
            <View style={styles.container}>
                {awayTeamImages.slice(0, 5).map((image, index) => (
                    <Avatar
                        testId={`${TID}IMAGE_AVATAR_${index}`}
                        key={image}
                        size={AvatarSize.small}
                        source={{
                            uri: image,
                        }}
                        style={
                            index === 0
                                ? styles.avatar
                                : styles.avatarWithLeftSpace
                        }
                    />
                ))}
                {awayTeamImages.length > 5 && (
                    <View style={styles.plusIcon}>
                        <Text
                            testID={`${TID}TEXT_AWAY_COUNT`}
                            color={colors.iconLabel}>
                            +{awayTeamImages.length - 5}
                        </Text>
                    </View>
                )}
                <Chip
                    testIdContent={`${TID}CHIP_AWAY`}
                    content='Away'
                    contentColor={colors.red800}
                    contentTextType='ParaSM'
                    backgroundColor={colors.errorBackground}
                    containerStyle={styles.awayChip}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {showAvailableTeamCount && displayTeamCountContent()}
            {availableTeamCount === 0 && awayTeamImages.length === 0
                ? displayEmptyDataContent()
                : displayImagContent()}
        </View>
    );
};

export default LATeamAvContent;
