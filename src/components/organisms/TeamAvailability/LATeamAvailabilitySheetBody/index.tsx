import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import { getFormattedDay } from 'src/utils/helpers/dateHandler';
import { TID } from 'src/utils/testIds';
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
            <Text
                testID={`${TID}TEXT_TEAM_AVAILABILITY_EXPANDED_MODAL_DESCRIPTION`}
                color={colors.gray700}>
                We encourage everyone to consider already booked leaves to take
                responsibility of their own day offs!
            </Text>
            <Spacer height={9} />
            <View style={styles.container}>
                <Text
                    testID={`${TID}TEXT_LEFT_SUB_TITLE`}
                    color={colors.gray700}
                    style={styles.subLeftTitleTextStyle}>
                    Date
                </Text>
                <Text
                    testID={`${TID}TEXT_RIGHT_SUB_TITLE`}
                    color={colors.gray700}
                    style={styles.subRightTitleTextStyle}>
                    Away team members
                </Text>
            </View>
            <Spacer height={0} />
            <View style={styles.listContentStyle}>
                {selectedMemberList?.slice(0, 5).map(item => (
                    <ListItem
                        key={item.date}
                        date={item.date}
                        awayMemberDetailsList={item.employeeResponseDtos}
                    />
                ))}
            </View>
            <Spacer height={-6} />
            {isVisible ? (
                <FlatList
                    data={[...Array(Math.ceil(awayTeamsByDate.length / 5))]}
                    keyExtractor={(_item, index) => index.toString()}
                    renderItem={({ index }) => {
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
                                <Text
                                    testID={`${TID}TEXT_DATE_RANGE_${index}`}
                                    color={
                                        index !== selectedItemId
                                            ? colors.gray600
                                            : colors.white
                                    }>
                                    {rangeText}
                                </Text>
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
