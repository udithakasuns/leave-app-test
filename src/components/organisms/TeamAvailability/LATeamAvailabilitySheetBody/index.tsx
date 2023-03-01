import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Button, Spacer } from 'src/components/atoms';
import LAText from 'src/components/atoms/LAText';
import { getFormattedDay } from 'src/utils/helpers/dateHandler';
import theme from 'src/utils/theme';
import { AwayTeamByDate } from 'src/utils/types';
import ListItem from './ListItem';
import { styles } from './styles';

const { colors } = theme;
export interface Range {
    startIndex: number;
    endIndex: number;
}
interface Props {
    awayTeamsByDate: AwayTeamByDate[];
    onPressGoBack: () => void;
}

const LATeamAvailabilitySheetBody = ({
    awayTeamsByDate,
    onPressGoBack,
}: Props) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<number>(0);
    const [selectedMemberList, setSelectedMemberList] = useState<
        AwayTeamByDate[]
    >([]);

    useEffect(() => {
        setSelectedMemberList(awayTeamsByDate);
    }, []);

    useEffect(() => {
        if (awayTeamsByDate.length > 5) {
            setIsVisible(state => !state);
        }
    }, []);

    const getRange = (awayTeamByDateList: AwayTeamByDate[], index: number) => {
        let rangeText = '';
        const rangeSize = 5;
        const startIndex = index * rangeSize;
        const endIndex = Math.min(
            startIndex + rangeSize - 1,
            awayTeamByDateList.length - 1,
        );

        const firstValue = awayTeamByDateList[startIndex].date;
        const secondValue = awayTeamByDateList[endIndex].date;

        if (firstValue === secondValue) {
            rangeText = `${getFormattedDay(firstValue, true).toString()}`;
            return { rangeText, startIndex, endIndex };
        }

        rangeText = `${getFormattedDay(
            firstValue,
            true,
        ).toString()} - ${getFormattedDay(secondValue, true).toString()}`;
        return { rangeText, startIndex, endIndex };
    };

    const onPressrange = (startIndex: number, endIndex: number) => {
        setSelectedMemberList(awayTeamsByDate.slice(startIndex, endIndex + 1));
    };

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
                {selectedMemberList?.slice(0, 5).map((item, index) => (
                    <ListItem
                        key={item.date}
                        date={item.date}
                        awayMemberDetailsList={item.employeeResponseDtos}
                    />
                ))}
            </View>
            {isVisible ? (
                <FlatList
                    data={[...Array(Math.ceil(awayTeamsByDate.length / 5))]}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        const { rangeText, startIndex, endIndex } = getRange(
                            awayTeamsByDate,
                            index,
                        );
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedItemId(index);
                                    onPressrange(startIndex, endIndex);
                                }}
                                style={
                                    index !== selectedItemId
                                        ? styles.rangeListContainer
                                        : [
                                              styles.rangeListContainer,
                                              {
                                                  backgroundColor:
                                                      colors.secondaryOutline,
                                              },
                                          ]
                                }>
                                <LAText
                                    color={
                                        index !== selectedItemId
                                            ? colors.gray600
                                            : colors.white
                                    }>
                                    {rangeText}
                                </LAText>
                            </TouchableOpacity>
                        );
                    }}
                    horizontal
                />
            ) : (
                <View />
            )}
            <Spacer height={3} />
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
