import React from 'react';
import { View } from 'react-native';
import { Text } from 'src/components/atoms';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { styles } from './styles';

const { colors } = theme;

const LATeamAvNoDataContent = () => (
    <View style={styles.container}>
        <Text testID={`${TID}TEXT_NO_DATA`} numberOfLines={2} type='ParaLGBold'>
            🧐 No data for this team
        </Text>
        <Text
            testID={`${TID}TEXT_SUB_NO_DATA`}
            numberOfLines={2}
            type='ParaSM'
            color={colors.gray700}>
            There is no availability data for this team yet.
        </Text>
    </View>
);

export default LATeamAvNoDataContent;
