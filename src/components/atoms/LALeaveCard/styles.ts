/* eslint-disable no-nested-ternary */
import { StyleSheet } from 'react-native';
import theme from 'src/utils/theme';

const { scale, radius, colors, fontSize, lineHeight } = theme;

export default (
    isSelected: boolean,
    width: number,
    isError: boolean,
    isDisable: boolean,
) =>
    StyleSheet.create({
        container: {
            justifyContent: 'space-around',
            backgroundColor: isSelected
                ? colors.secondaryBackground
                : isError
                ? colors.red50
                : colors.tertiaryColor,
            paddingHorizontal: scale.sc10,
            paddingTop: scale.sc15,
            paddingBottom: scale.sc10,
            borderRadius: radius.rd12,
            borderColor: isSelected
                ? colors.secondaryOutline
                : isError
                ? colors.error
                : colors.gray300,
            borderWidth: isSelected || isError || isDisable ? 1 : 0,
            margin: scale.sc1,
            width,
        },
        leaveContainer: {
            position: 'relative',
            marginBottom: -scale.sc12,
            flexDirection: 'row',
        },
        takenLeavesContainer: {
            fontSize: fontSize.fs40,
            lineHeight: lineHeight.lh50,
            textAlign: 'justify',
            paddingRight: scale.sc4,
            color: isError
                ? colors.error
                : isDisable
                ? colors.grey600
                : colors.black,
        },
        totalLeavesContainer: {
            fontSize: fontSize.fs14,
            textAlign: 'justify',
            lineHeight: lineHeight.lh58,
            color: isError
                ? colors.error
                : isDisable
                ? colors.grey600
                : colors.black,
        },
        entitlementTextContainer: {
            color: isError
                ? colors.error
                : isDisable
                ? colors.grey600
                : colors.black,
        },
        footerContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    });
