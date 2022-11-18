import { ManagerHomeScreensProps } from 'navigators/types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spacer } from 'src/components/atoms';
import { LAAppBar } from 'src/components/organisms';
import theme from 'src/utils/theme';

const { scale } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale.sc20,
        backgroundColor: 'white',
    },
});

const ManagerHome: React.FC<ManagerHomeScreensProps> = () => (
    <View style={styles.container}>
        <LAAppBar currentScreen='manager' onPressNotification={() => {}} />
        <Spacer height={30} />
    </View>
);

export default ManagerHome;
