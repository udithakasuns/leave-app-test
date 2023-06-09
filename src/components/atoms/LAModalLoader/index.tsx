import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import theme from 'src/utils/theme';
import { PartialBy } from 'src/utils/types';
import { useStyles } from './styles';

const { colors } = theme;

interface Props {
    isVisible?: boolean;
    backdropOpacity: number;
    testID?: string;
}

const LAModalLoder = ({
    isVisible = true,
    backdropOpacity = 0.7,
    testID,
}: PartialBy<Props, 'backdropOpacity'>) => {
    if (!isVisible) {
        return null;
    }
    const styles = useStyles({ opacity: backdropOpacity });
    return (
        <View style={styles.container} testID={testID}>
            <ActivityIndicator size='large' color={colors.primaryColor} />
        </View>
    );
};

export default LAModalLoder;
