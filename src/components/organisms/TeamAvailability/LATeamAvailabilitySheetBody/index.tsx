import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { CalendarUtils } from 'react-native-calendars';
import { Button, Spacer } from 'src/components/atoms';
import LAText from 'src/components/atoms/LAText';
import {
    getFormattedDate,
    getFormattedDay,
    getFormattedMonth,
} from 'src/utils/helpers/dateHandler';
import theme from 'src/utils/theme';
import ListItem from './ListItem';
import { styles } from './styles';

const { colors } = theme;
interface Props {
    awayMemberList: object[];
    onPressGoBack: () => void;
    startDate: string;
    endDate: string;
}

const LATeamAvailabilitySheetBody = ({
    awayMemberList,
    onPressGoBack,
    startDate,
    endDate,
}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [tempMarked, setTempMarked] = useState<string[]>([]);
    const getSelectedDates = () => {
        const start = new Date(startDate).getTime();
        const end = new Date(endDate || startDate).getTime();

        for (
            let currentDate = start;
            currentDate <= end;
            currentDate += 60 * 60 * 24000
        ) {
            const currentDateString = new Date(currentDate);
            const day = currentDateString.getDay();
            if (day === 1 || day === 2 || day === 3 || day === 4 || day === 5) {
                tempMarked.push(
                    CalendarUtils.getCalendarDateString(
                        currentDateString.toISOString().substring(0, 10),
                    ),
                );
            }
        }
        setTempMarked([...tempMarked]);
        return tempMarked;
    };

    const getRange = (selectedDates: string[], index: number) => {
        const value = index * 4;
        let firstValue = selectedDates[value];
        const secondValue = selectedDates[value + 4];
        if (index > 0) {
            firstValue = selectedDates[value + 1];
        }
        return `${getFormattedDay(
            firstValue,
            true,
        ).toString()}-${getFormattedDay(secondValue, true).toString()}`;
    };
    useEffect(() => {
        if (startDate && endDate) {
            getSelectedDates();
        }
        if (tempMarked.length > 5) {
            setIsVisible(state => !state);
        }
    }, []);

    return (
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
                {awayMemberList?.map(
                    (item, index) =>
                        index < 5 && (
                            <ListItem
                                key={item.id}
                                date={item.id}
                                awayMemberDetailsList={item.employee}
                            />
                        ),
                )}
            </View>
            {isVisible ? (
                <View>
                    {[...Array(Math.ceil(tempMarked.length / 5))].map(
                        (_, index) => (
                            <LAText>{getRange(tempMarked, index)}</LAText>
                        ),
                    )}
                </View>
            ) : null}
            {/* <View style={styles.div}>
                <FlatList
                    data={tempMarked}
                    renderItem={({ item, index }) => {
                        return <LAText>{item}</LAText>;
                    }}
                    keyExtractor={item => item.id}
                    horizontal
                />
            </View> */}

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
};
export default LATeamAvailabilitySheetBody;
