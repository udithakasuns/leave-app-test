import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import { getFormattedDay } from 'src/utils/helpers/dateHandler';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import {
    AwayTeamByDate,
    CompanyHolidays,
    EmployeeType,
    PartialBy,
} from 'src/utils/types';
import DateRangeItem from './DateRangeItem';
import { styles } from './styles';
import AwayTeamListItem from './AwayTeamListItem';

const { colors, scale } = theme;
export interface Range {
    dateRange: string;
    startIndex: number;
    endIndex: number;
}
interface Props {
    awayTeamsByDate: AwayTeamByDate[];
    onPressGoBack: () => void;
    onPressTeamDetailItem: (awayTeam: EmployeeType[]) => void;
    companyHolidays: CompanyHolidays[];
}

const LATeamAvailabilitySheetBody = ({
    awayTeamsByDate,
    onPressGoBack,
    onPressTeamDetailItem,
    companyHolidays,
}: PartialBy<Props, 'companyHolidays'>) => {
    const [isRangeVisible, setIsRangeVisible] = useState<boolean>(false);
    const [selectedDateRangeId, setSelectedDateRangeId] = useState<number>(0);
    const [selectedTeam, setSelectedTeam] = useState<AwayTeamByDate[]>([]);

    useEffect(() => {
        setSelectedTeam(awayTeamsByDate);
        if (awayTeamsByDate.length > 5) {
            setIsRangeVisible(state => !state);
        }
    }, []);

    const getRange = (
        awayTeamByDateList: AwayTeamByDate[],
        index: number,
    ): Range => {
        let dateRange = '';
        const rangeSize = 5;
        const startIndex = index * rangeSize;
        const endIndex = Math.min(
            startIndex + rangeSize - 1,
            awayTeamByDateList.length - 1,
        );

        const firstDate = awayTeamByDateList[startIndex].date;
        const secondDate = awayTeamByDateList[endIndex].date;

        if (firstDate === secondDate) {
            dateRange = `${getFormattedDay(firstDate, true).toString()}`;
            return { dateRange, startIndex, endIndex };
        }

        dateRange = `${getFormattedDay(
            firstDate,
            true,
        ).toString()} - ${getFormattedDay(secondDate, true).toString()}`;
        return { dateRange, startIndex, endIndex };
    };

    const onPressRangeItem = (startIndex: number, endIndex: number) => {
        setSelectedTeam(awayTeamsByDate.slice(startIndex, endIndex + 1));
    };

    const renderItem = ({ index }: { index: number }) => {
        const { dateRange, startIndex, endIndex } = getRange(
            awayTeamsByDate,
            index,
        );
        return (
            <DateRangeItem
                testID={`${TID}TEXT_DATE_RANGE_${index}`}
                selected={index === selectedDateRangeId}
                dateRange={dateRange}
                onPress={() => {
                    setSelectedDateRangeId(index);
                    onPressRangeItem(startIndex, endIndex);
                }}
            />
        );
    };

    return (
        <View>
            <Spacer height={scale.sc10} />
            <Text
                testID={`${TID}TEXT_TEAM_AVAILABILITY_EXPANDED_MODAL_DESCRIPTION`}
                color={colors.gray700}>
                We encourage everyone to consider already booked leaves to take
                responsibility of their own day offs!
            </Text>
            <Spacer height={scale.sc10} />
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
                {selectedTeam?.slice(0, 5).map((item, index) => (
                    <AwayTeamListItem
                        testID={`${TID}TEXT_SELECTED_DATE_${index}`}
                        key={item.date}
                        date={item.date}
                        awayTeam={item.employeeResponseDtos || []}
                        onPressTeamDetailItem={() =>
                            onPressTeamDetailItem(item.employeeResponseDtos)
                        }
                        companyHolidays={companyHolidays || []}
                    />
                ))}
            </View>
            <Spacer height={scale.sc4} />
            {isRangeVisible ? (
                <FlatList
                    data={[...Array(Math.ceil(awayTeamsByDate.length / 5))]}
                    keyExtractor={item => item}
                    renderItem={renderItem}
                    horizontal
                />
            ) : (
                <View />
            )}
            <Spacer height={scale.sc10} />
            <Button
                testID={`${TID}BUTTON_GO_BACK`}
                iconPosition='left'
                icon='arrow-back'
                label='Go back'
                onPress={onPressGoBack}
                labelStyle={{ paddingHorizontal: scale.sc4 }}
            />
            <Spacer />
        </View>
    );
};
export default LATeamAvailabilitySheetBody;
