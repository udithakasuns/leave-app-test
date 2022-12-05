import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Button, Icon, Text } from 'src/components/atoms';
import { WIDTH } from 'src/utils/helpers/scalingUtil';
import theme from 'src/utils/theme';
import { styles } from './styles';
import { VisibleType } from './types';

const { colors } = theme;

interface Props {
    visibleType: VisibleType;
    onChangeVisibleType: (visibleType: VisibleType) => void;
    onClose: () => void;
}

const Header = ({
    visibleType = 'all',
    onChangeVisibleType,
    onClose,
}: Props) => (
    <View>
        <View style={styles.titleContainer}>
            <Text type='H1Bold'>Notifications</Text>
            <TouchableOpacity onPress={onClose}>
                <Icon
                    size={WIDTH(8)}
                    name='close-circle-outline'
                    library='community'
                    color={colors.gray600}
                />
            </TouchableOpacity>
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

export default Header;
