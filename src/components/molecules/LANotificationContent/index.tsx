import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Text } from 'src/components/atoms';
import { AtLeast, NotificationType, NotificationBody } from 'utils/types';
import theme from 'utils/theme';
import { getTimeAgo } from 'src/utils/helpers/dateHandler';
import { useStyles } from './styles';

const { scale } = theme;

interface Props {
    type: NotificationType;
    body: NotificationBody | null;
    date: string;
    isViewed: boolean;
    onPress: () => void;
}

const LANotificationContent = ({
    type,
    body,
    date,
    isViewed,
    onPress,
}: AtLeast<Props, 'type' | 'isViewed'>) => {
    const styles = useStyles({ isViewed });

    const getTextTypeByLeaveType = (
        i: number,
        n: number,
    ): 'ParaLGBold' | 'ParaLG' => {
        if (type === 'LEAVE_REQUEST_NUDGE') {
            if (
                i === 0 ||
                i === 1 ||
                i === 6 ||
                i === 7 ||
                i === n - 3 || // 3rd last index
                i === n - 2 || // 2nd last index
                i === n - 1 // last index
            ) {
                return 'ParaLGBold';
            }
        } else if (type === 'NEW_LEAVE_REQUEST') {
            if (
                i === 0 ||
                i === 1 ||
                i === 3 ||
                i === 4 ||
                i === n - 3 || // 3rd last index
                i === n - 2 || // 2nd last index
                i === n - 1 // last index
            ) {
                return 'ParaLGBold';
            }
        }
        return 'ParaLG';
    };

    const getMessage = (message: string) => {
        const words = message.split(' ');
        return (
            <View style={styles.messageContainer}>
                {words.map((word, index) => (
                    <Text type={getTextTypeByLeaveType(index, words.length)}>
                        {word}{' '}
                    </Text>
                ))}
            </View>
        );
    };

    if (body && date) {
        return (
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <View style={styles.content}>
                    <Avatar size={scale.sc36} source={{ uri: body.image }} />
                    <View style={styles.rightContainer}>
                        <View style={styles.rightContent}>
                            {getMessage(body.message)}
                            <View style={styles.indicator} />
                            {isViewed && <View style={styles.overlay} />}
                        </View>
                        <Text type='ParaSM' style={styles.date}>
                            {getTimeAgo(date)}
                        </Text>
                    </View>
                </View>
                <View style={styles.devider} />
            </TouchableOpacity>
        );
    }

    return null;
};

export default LANotificationContent;
