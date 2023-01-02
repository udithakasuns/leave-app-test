import { FormikProps } from 'formik';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Input, Spacer, Text } from 'src/components/atoms';
import {
    ButtonDock,
    HalfButton,
    SelectionButton,
} from 'src/components/molecules';
import { showErrorToast } from 'src/utils/alerts';
import { getCalendarRangeDate } from 'src/utils/helpers/dateHandler';
import { ErrorCodes } from 'src/utils/helpers/errorCodes';
import theme from 'src/utils/theme';
import {
    ApplyFormValues,
    EntitlementSelection,
    States,
    TestProps,
} from 'src/utils/types';
import LAEntitlementGrid from '../../LAEntitlementGrid';
import { styles } from './styles';

interface Props extends Partial<TestProps> {
    formik: FormikProps<ApplyFormValues>;
    onPressSelectDate: () => void;
    isHalfSelected: boolean;
    setIsHalfSelected: React.Dispatch<React.SetStateAction<boolean>>;
    onCancellation: () => void;
}

const { scale, colors } = theme;

const ApplyLeaveSheetBody = ({
    formik,
    onPressSelectDate,
    isHalfSelected,
    setIsHalfSelected,
    onCancellation,
}: Props) => {
    const [fullDayLeaveDisabled, setFullDayLeaveDisabled] = useState(false);

    const handleOnEntitlementPress = (selected: EntitlementSelection) => {
        if (selected.balanceInDays === 0) {
            showErrorToast(
                ErrorCodes.UNAVAILABLE_LEAVE_ENTITLEMENTS,
                selected.leaveType.name,
            );
            return;
        }

        const entitlementsDeepClone = formik.values.entitlements.map(item => {
            const tempEntitlement = item;
            if (item.entitlementId === selected.entitlementId) {
                tempEntitlement.isSelected = true;
            } else {
                tempEntitlement.isSelected = false;
            }
            return tempEntitlement;
        });
        formik.setFieldValue('entitlements', entitlementsDeepClone);
        formik.setFieldValue('typeId', selected.leaveType.typeId);
        formik.setFieldValue('selectedLeaveBalance', selected.balanceInDays);
    };

    const handleOnInitialHalfDayPress = () => {
        setIsHalfSelected(true);
        formik.setFieldValue('leaveState', undefined);
    };

    const handleOnHalfDayPress = (title: string) => {
        setIsHalfSelected(true);
        if (title === 'Morning') {
            formik.setFieldValue('leaveState', States.HALFDAY_MORNING);
        } else {
            formik.setFieldValue('leaveState', States.HALFDAY_EVENING);
        }
    };

    const getStateValidation = (state: States): boolean => {
        switch (state) {
            case States.HALFDAY_MORNING:
                return formik.values.leaveState === States.HALFDAY_MORNING;
            case States.HALFDAY_EVENING:
                return formik.values.leaveState === States.HALFDAY_EVENING;
            default:
                return formik.values.leaveState === States.FULLDAY;
        }
    };

    const onFullDayPress = () => {
        setIsHalfSelected(false);
        formik.setFieldValue(
            'leaveState',
            getStateValidation(States.FULLDAY) ? undefined : States.FULLDAY,
        );
    };

    useEffect(() => {
        if (formik.values.startDate && !isHalfSelected) {
            if (
                formik.values.selectedLeaveBalance === undefined ||
                formik.values.selectedLeaveBalance > 0.9
            ) {
                formik.setFieldValue('leaveState', States.FULLDAY);
            } else {
                setIsHalfSelected(true);
            }
        }
    }, [formik.values.startDate]);

    useEffect(() => {
        setFullDayLeaveDisabled(
            formik.values.selectedLeaveBalance !== undefined &&
                formik.values.selectedLeaveBalance < 1,
        );
    }, [formik.values.selectedLeaveBalance]);

    useEffect(() => {
        const selectedEntitlement = formik.values.entitlements.find(
            ent => ent.isSelected,
        );
        if (selectedEntitlement) {
            setFullDayLeaveDisabled(selectedEntitlement.balanceInDays < 1);
            handleOnEntitlementPress(selectedEntitlement);
        }
    }, []);

    useEffect(() => {
        if (fullDayLeaveDisabled) {
            formik.setFieldValue('leaveState', '');
        }
    }, [fullDayLeaveDisabled]);

    return (
        <View>
            <Spacer height={5} />
            <Text type='ParaLG'>Select leave type</Text>
            <Spacer height={2} />
            {formik.values.entitlements && (
                <LAEntitlementGrid
                    entitlements={formik.values.entitlements}
                    onEntitlementPress={handleOnEntitlementPress}
                    isError={formik.errors.typeId !== undefined}
                />
            )}
            <Spacer height={scale.vsc8} />
            <SelectionButton
                isError={formik.errors.startDate !== undefined}
                label={
                    formik.values.startDate
                        ? getCalendarRangeDate(
                              formik.values.startDate,
                              formik.values.endDate,
                          )
                        : 'Select the leave date'
                }
                isSelected={!!formik.values.startDate}
                onPress={() => {
                    onPressSelectDate();
                }}
            />
            <Spacer height={scale.vsc8} />
            {formik.values.endDate === '' && (
                <>
                    <Text type='ParaLG'>Select duration</Text>
                    <Spacer height={scale.vsc4} />
                    <View style={styles.halfButtonsStyle}>
                        <SelectionButton
                            label='Full Day'
                            isSelected={getStateValidation(States.FULLDAY)}
                            isError={formik.errors.leaveState !== undefined}
                            onPress={onFullDayPress}
                            icon=''
                            buttonStyle={styles.fullButtonStyle}
                            isDisable={fullDayLeaveDisabled}
                        />
                        <Spacer width={scale.sc4} />
                        <HalfButton
                            label='Half Day'
                            icon='arrow-forward'
                            isError={formik.errors.leaveState !== undefined}
                            isHalfSelected={
                                getStateValidation(States.HALFDAY_EVENING) ||
                                getStateValidation(States.HALFDAY_MORNING) ||
                                isHalfSelected
                            }
                            onInitialPress={handleOnInitialHalfDayPress}
                            onPress={handleOnHalfDayPress}
                            halfDay={{
                                rightHalfTitle: 'Morning',
                                leftHalfTitle: 'Evening',
                            }}
                            selectedDay={{
                                isRightSelected: getStateValidation(
                                    States.HALFDAY_MORNING,
                                ),
                                isLeftSelected: getStateValidation(
                                    States.HALFDAY_EVENING,
                                ),
                            }}
                        />
                    </View>
                    <Spacer height={scale.vsc8} />
                </>
            )}
            <Input
                type='COMMENT'
                label='Comment'
                placeholder='Add message'
                inputContainerStyle={styles.commentInputContainerStyle}
                value={formik.values.requestDesc}
                onChangeText={formik.handleChange('requestDesc')}
                containerStyle={styles.commentContainerStyle}
            />
            <Spacer height={scale.vsc8} />
            {/* <SelectionButton
                label='Add Attachment (Optional)'
                onPress={() => {}}
            /> */}
            <Spacer height={scale.vsc6} />
            <ButtonDock
                primaryButton={{
                    label: 'Confirm and Apply',
                    onPress: () => {
                        formik.handleSubmit();
                        setIsHalfSelected(false);
                    },
                }}
                secondaryButton={{
                    label: 'Cancel',
                    onPress: onCancellation,
                }}
            />
            <Spacer height={scale.vsc2} />
        </View>
    );
};
export default ApplyLeaveSheetBody;
