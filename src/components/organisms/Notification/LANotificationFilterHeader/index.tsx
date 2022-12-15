import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Icon, Text } from 'src/components/atoms';
import { WIDTH } from 'src/utils/helpers/scalingUtil';
import theme from 'src/utils/theme';
import { AtLeast, NotificationVisibleType } from 'utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props {
    visibleType: NotificationVisibleType;
    onChangeVisibleType: (visibleType: NotificationVisibleType) => void;
    onClose: () => void;
}

const LANotificationFilterHeader = ({
    visibleType = 'all',
    onChangeVisibleType,
    onClose,
}: AtLeast<Props, 'visibleType' | 'onChangeVisibleType'>) => (
    <View>
        <View style={styles.titleContainer}>
            <Text type='H1Bold'>Notifications</Text>
            {onClose && (
                <TouchableOpacity onPress={onClose}>
                    <Icon
                        size={WIDTH(8)}
                        name='close-circle-outline'
                        library='community'
                        color={colors.gray600}
                    />
                </TouchableOpacity>
            )}
        </View>
        <View style={styles.headerButtonContainer}>
            <Button
                size='small'
                buttonStyle={styles.headerButtonStyle}
                mode={visibleType === 'all' ? 'outlined' : 'contained-gray'}
                label='All'
                onPress={() => onChangeVisibleType('all')}
            />
            <Button
                size='small'
                buttonStyle={styles.headerButtonStyle}
                mode={visibleType === 'unread' ? 'outlined' : 'contained-gray'}
                label='Unread'
                onPress={() => onChangeVisibleType('unread')}
            />
        </View>
        <View style={styles.headerDevider} />
    </View>
);

export default LANotificationFilterHeader;
