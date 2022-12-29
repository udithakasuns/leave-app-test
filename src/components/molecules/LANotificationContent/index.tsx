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
        }
        if (type === 'NEW_LEAVE_REQUEST') {
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
        if (
            type === 'LEAVE_REQUEST_APPROVED_DENIED' ||
            type === 'LEAVE_REQUEST_CANCELLED'
        ) {
            if (
                i === 0 ||
                i === 1 ||
                i === n - 3 || // 3rd last index
                i === n - 2 || // 2nd last index
                i === n - 1 // last index
            ) {
                return 'ParaLGBold';
            }
        }
        if (type === 'MULTI_DAY_LEAVE_REQUEST_NUDGE') {
            if (
                i === 0 ||
                i === 1 ||
                i === 6 ||
                i === 7 ||
                i === 10 ||
                i === 11 ||
                i === n - 3 || // 3rd last index
                i === n - 2 || // 2nd last index
                i === n - 1 // last index
            ) {
                return 'ParaLGBold';
            }
        }
        if (type === 'NEW_MULTI_DAY_LEAVE_REQUEST') {
            if (
                i === 0 ||
                i === 1 ||
                i === 4 ||
                i === 5 ||
                i === 7 ||
                i === 8 ||
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
        if (message) {
            const words = message.split(' ');
            return (
                <View style={styles.messageContainer}>
                    {words.map((word, index) => (
                        <Text
                            type={getTextTypeByLeaveType(index, words.length)}>
                            {word}{' '}
                        </Text>
                    ))}
                </View>
            );
        }
        return null;
    };

    if (body && date) {
        return (
            <TouchableOpacity onPress={onPress} style={styles.container}>
                <View style={styles.content}>
                    <Avatar size={scale.sc36} source={{ uri: body.image }} />
                    <View style={styles.rightContainer}>
                        <View style={styles.rightContent}>
                            {getMessage(body?.message)}
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

export default React.memo(LANotificationContent);
