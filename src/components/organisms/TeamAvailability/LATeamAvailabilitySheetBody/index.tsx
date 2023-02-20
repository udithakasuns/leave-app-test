import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Button, Spacer } from 'src/components/atoms';
import LAText from 'src/components/atoms/LAText';
import theme from 'src/utils/theme';
import ListItem from './ListItem';
import { styles } from './styles';

const { colors } = theme;
interface Props {
    awayMemberList: object[];
    onPressGoBack: () => void;
}

const LATeamAvailabilitySheetBody = ({
    awayMemberList,
    onPressGoBack,
}: Props) => (
    <View>
        <Spacer height={9} />
        <LAText color={colors.gray700}>
            We encourage everyone to consider already booked leaves to take
            responsibility of their own day offs!
        </LAText>
        <Spacer height={9} />
        <View style={styles.container}>
            <LAText
                color={colors.gray700}
                style={{ flex: 1, textAlign: 'center' }}>
                Date
            </LAText>
            <LAText color={colors.gray700} style={{ flex: 4 }}>
                Away team members
            </LAText>
        </View>
        <Spacer height={0} />
        <View>
            {awayMemberList?.map(item => (
                <ListItem
                    key={item.id}
                    date={item.id}
                    awayMemberDetailsList={item.employee}
                />
            ))}
        </View>
        <Button
            iconPosition='left'
            icon='arrow-back'
            label='Go back'
            onPress={onPressGoBack}
            labelStyle={{ paddingHorizontal: 4 }}
        />
        <Spacer />
    </View>
);
export default LATeamAvailabilitySheetBody;
