/* eslint-disable no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import { Avatar, AvatarSize, Text } from 'components/atoms';
import theme from 'src/utils/theme';
import { AvatarChip } from 'src/components/molecules';
import { getFormattedDay } from 'src/utils/helpers/dateHandler';
import LAText from 'src/components/atoms/LAText';
import { EmployeeType } from 'src/utils/types';
import { styles } from './styles';

interface Props {
    date: string;
    awayMemberDetailsList: EmployeeType[];
}

const ListItem = ({ date, awayMemberDetailsList }: Props) => (
    <View style={styles.listItemContainer}>
        <View style={styles.listItemLeftContainer}>
            <Text style={styles.textStyle}>{getFormattedDay(date, true)}</Text>
        </View>
        <View style={styles.listItemRightContainer}>
            {awayMemberDetailsList.length === 0 ? (
                <View style={styles.listItemRightContainerText}>
                    <LAText>🥳 Full team available</LAText>
                </View>
            ) : awayMemberDetailsList.length <= 2 ? (
                awayMemberDetailsList?.map((item, index) => (
                    <AvatarChip
                        label={item.name?.split(' ')[0] ?? ''}
                        source={{
                            uri: item.authPic ?? '',
                        }}
                        containerStyle={styles.expandAvatarStyle}
                        labelStyle={{
                            flex: 1,
                        }}
                    />
                ))
            ) : (
                awayMemberDetailsList?.map((item, index) => (
                    <Avatar
                        size={AvatarSize.small}
                        source={{
                            uri: item.authPic ?? '',
                        }}
                        style={styles.avatarStyle}
                    />
                ))
            )}
        </View>
    </View>
);

export default React.memo(ListItem);
