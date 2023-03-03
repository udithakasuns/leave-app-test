import React, { ReactNode } from 'react';
import { TouchableOpacity } from 'react-native';
import { AtLeast } from 'src/utils/types';
import { useStyles } from './styles';

interface Props {
    outline: boolean;
    onPress: () => void;
    children: ReactNode;
}

const LATeamAvContainer = ({
    outline = false,
    onPress,
    children,
}: AtLeast<Props, 'children'>) => {
    const styles = useStyles({ outline });

    return (
        <TouchableOpacity
            disabled={onPress === undefined}
            onPress={onPress}
            style={styles.container}>
            {children}
        </TouchableOpacity>
    );
};

export default LATeamAvContainer;
