import { StyleSheet } from 'react-native';
import { Theme } from 'react-native-calendars/src/types';
import theme from 'src/utils/theme';

const { scale, pixel, radius, fontFamily, colors } = theme;

export const styles = StyleSheet.create({
    fullButtonStyle: {
        paddingVertical: pixel(12),
        flex: 1,
    },
    calendarStyle: {
        borderRadius: radius.rd8,
        borderWidth: 1,
        borderColor: colors.secondaryOutline,
        backgroundColor: colors.secondaryBackground,
    },
    calendarHeaderStyle: {
        borderBottomColor: colors.gray400,
        borderBottomWidth: 0.2,
        marginHorizontal: scale.sc8,
        marginBottom: scale.sc8,
    },
    halfButtonsStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export const calendarTheme: Theme = {
    backgroundColor: colors.secondaryBackground,
    calendarBackground: colors.secondaryBackground,
    textSectionTitleColor: colors.black,
    selectedDayBackgroundColor: colors.primaryColor,
    selectedDayTextColor: colors.white,
    dayTextColor: colors.black,
    todayTextColor: colors.black,
    textDisabledColor: colors.gray400,
    arrowColor: colors.black,
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
};
