import React from 'react';
import { View } from 'react-native';
import { Avatar, AvatarSize, Text } from 'components/atoms';
import theme from 'src/utils/theme';
import { AvatarChip } from 'src/components/molecules';
import { styles } from './styles';

const { colors, scale, pixel } = theme;

interface Props {
    date: string;
    awayMemberDetailsList: object[];
}

const ListItem = ({ date, awayMemberDetailsList }: Props) => (
    <View style={styles.listItemContainer}>
        <View style={styles.listItemLeftContainer}>
            <Text style={styles.textStyle}>{date}</Text>
        </View>
        <View style={styles.listItemRightContainer}>
            {awayMemberDetailsList.length <= 2
                ? awayMemberDetailsList?.map((item, index) => (
                      <AvatarChip
                          label={item.name?.split(' ')[0] ?? ''}
                          source={{
                              uri: item.authPic ?? '',
                          }}
                          containerStyle={{
                              paddingVertical: scale.sc1,
                              backgroundColor: colors.white,
                              marginRight: scale.sc6,
                              maxWidth: pixel(121),
                              minWidth: pixel(140),
                          }}
                          labelStyle={{
                              flex: 1,
                          }}
                      />
                  ))
                : awayMemberDetailsList?.map((item, index) => (
                      <Avatar
                          size={AvatarSize.small}
                          source={{
                              uri: item.authPic ?? '',
                          }}
                          style={styles.avatarStyle}
                      />
                  ))}
        </View>
    </View>
);

export default React.memo(ListItem);
