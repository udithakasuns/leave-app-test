import { StyleSheet } from 'react-native';

interface Props {
    marginTop: number;
    marginBottom: number;
}

export const useStyles = ({ marginTop, marginBottom }: Props) =>
    StyleSheet.create({
        container: {
            marginTop,
            marginBottom,
        },
    });
