import { StyleSheet } from 'react-native';

export default (size: number) =>
    StyleSheet.create({
        container: {
            width: size,
            height: size,
            borderRadius: size / 2,
        },
        imageContainer: {
            width: size,
            height: size,
            borderRadius: size / 2,
        },
    });
