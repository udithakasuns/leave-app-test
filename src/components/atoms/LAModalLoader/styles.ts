import { StyleSheet } from 'react-native';

interface Props {
    opacity: number;
}

export const useStyles = ({ opacity }: Props) =>
    StyleSheet.create({
        container: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: `rgba(0,0,0,${opacity})`,
        },
    });
