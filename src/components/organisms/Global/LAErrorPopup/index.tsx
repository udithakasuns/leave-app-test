import React from 'react';
import { View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import { PopUp, ButtonDock } from 'src/components/molecules';
import { AtLeast } from 'src/utils/types';
import theme from 'utils/theme';
import { styles } from './styles';

const { scale } = theme;

type Type = 'network' | 'api';

interface Props {
    visible: boolean;
    type: Type;
    onClose: () => void;
    title: string;
    subTitle: string;
    iconPosition: 'left' | 'right';
    primaryIcon: string;
    secondaryIcon: string;
    primaryLabel: string;
    secondaryLabel: string;
    primaryOnPress: () => void;
    secondaryOnPress: () => void;
}

const LAErrorPopup = ({
    visible,
    type = 'api',
    title = type === 'network' ? 'Network Error' : 'Error 404',
    subTitle = type === 'network'
        ? 'The system could not be connected to the network. Please check your network and reload.'
        : 'The page/data you requested could not be found. Please go back to home page, or contact support',
    iconPosition = 'left',
    primaryIcon = type === 'network' ? 'refresh' : 'arrow-forward',
    secondaryIcon = 'arrow-forward',
    primaryLabel = type === 'network' ? 'Try again' : 'Back to home',
    secondaryLabel = 'Get help',
    primaryOnPress = () => {},
    secondaryOnPress = () => {},
    onClose,
}: AtLeast<Props, 'visible' | 'onClose'>) => (
    <PopUp
        modalVisible={visible}
        onClose={onClose}
        bodyChildren={
            <>
                <Text style={styles.emoji}>🧐</Text>
                <Spacer height={scale.vsc6} />
                <View style={styles.headerContainer}>
                    <Text type='H1Bold' style={styles.headerText}>
                        {title}
                    </Text>
                    {subTitle && (
                        <>
                            <Spacer height={scale.vsc6} />
                            <Text
                                type='ParaLG'
                                color={theme.colors.primaryGrayLabel}
                                style={styles.headerText}>
                                {subTitle}
                            </Text>
                        </>
                    )}
                </View>
                <Spacer height={scale.vsc10} />
                <ButtonDock
                    iconPosition={iconPosition}
                    primaryButton={{
                        label: primaryLabel,
                        onPress: primaryOnPress,
                        icon: primaryIcon,
                    }}
                    secondaryButton={{
                        label: secondaryLabel,
                        onPress: secondaryOnPress,
                        icon: secondaryIcon,
                    }}
                />
            </>
        }
    />
);

export default LAErrorPopup;
