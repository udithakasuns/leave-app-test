import { ManagerHomeScreensProps } from 'navigators/types';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Spacer } from 'src/components/atoms';
import { LAAppBar } from 'src/components/organisms';
import theme from 'src/utils/theme';

const { scale, colors, radius, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale.sc20,
        backgroundColor: 'white',
    },
});

const ManagerHome: React.FC<ManagerHomeScreensProps> = () => {
    const initDate = '2022-12-01';
    const [selected, setSelected] = useState(initDate);
    const marked = useMemo(
        () => ({
            [selected]: {
                selected: true,
                selectedColor: colors.primaryColor,
                selectedTextColor: 'yellow',
            },
        }),
        [selected],
    );
    return (
        <View style={styles.container}>
            <LAAppBar currentScreen='manager' onPressNotification={() => {}} />
            <Spacer height={30} />
            <Calendar
                enableSwipeMonths
                markedDates={marked}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                style={{
                    borderRadius: radius.rd8,
                    borderWidth: 1,
                    borderColor: colors.secondaryOutline,
                    backgroundColor: colors.secondaryBackground,
                }}
                headerStyle={{
                    borderBottomColor: '#A1A1AA',
                    borderBottomWidth: 0.2,
                    marginHorizontal: scale.sc8,
                    marginBottom: scale.sc8,
                }}
                onDayLongPress={day => {
                    setSelected(day.dateString);
                }}
                // renderArrow={direaction => {
                //     if (direaction === 'right') {
                //         return <Icon name='arrow-forward' />;
                //     }
                // }}
                theme={{
                    backgroundColor: colors.secondaryBackground,
                    calendarBackground: colors.secondaryBackground,
                    textSectionTitleColor: '#000000',
                    textSectionTitleDisabledColor: '#d9e1e8',
                    selectedDayBackgroundColor: colors.primaryColor,
                    selectedDayTextColor: '#ffffff',
                    dayTextColor: colors.black,
                    textDisabledColor: '#A1A1AA',
                    dotColor: '#00adf5',
                    selectedDotColor: '#ffffff',
                    arrowColor: colors.black,
                    disabledArrowColor: '#d9e1e8',
                    monthTextColor: colors.black,
                    indicatorColor: colors.black,
                    textDayFontSize: 14,
                    textMonthFontSize: 16,
                    textDayHeaderFontSize: 12,
                    textDayFontFamily: fontFamily.poppins400,
                    textMonthFontFamily: fontFamily.poppins600,
                    textDayHeaderFontFamily: fontFamily.poppins600,
                    textDayFontWeight: '400',
                    textMonthFontWeight: '700',
                    textDayHeaderFontWeight: '600',
                }}
            />
        </View>
    );
};

export default ManagerHome;
