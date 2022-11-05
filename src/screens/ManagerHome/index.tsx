import { ManagerHomeScreensProps } from 'navigators/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { AppBar } from 'src/components/organisms';
import theme from 'src/utils/theme';

const { scale } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale.sc20,
        backgroundColor: 'white',
    },
});

const ManagerHome: React.FC<ManagerHomeScreensProps> = ({ navigation }) => (
    <View style={styles.container}>
        <AppBar currentScreen='manager' onPressNotification={() => {}} />
    </View>
);

export default ManagerHome;
