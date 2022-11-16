import { FormikProps } from 'formik';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Input, Spacer, Text } from 'src/components/atoms';
import {
    ButtonDock,
    HalfButton,
    SelectionButton,
} from 'src/components/molecules';
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

const { scale } = theme;

const ApplyLeaveSheetBody = ({
    formik,
    onPressSelectDate,
    isHalfSelected,
    setIsHalfSelected,
    onCancellation,
}: Props) => {
    const handleOnEntitlementPress = (selected: EntitlementSelection) => {
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

    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps='handled'>
            <Spacer height={scale.vsc8} />
            <Text type='ParaLG'>Select leave type</Text>
            <Spacer height={scale.vsc4} />
            {formik.values.entitlements && (
                <LAEntitlementGrid
                    entitlements={formik.values.entitlements}
                    onEntitlementPress={handleOnEntitlementPress}
                />
            )}
            <Spacer height={scale.vsc10} />
            <SelectionButton
                label='Select the leave date'
                onPress={onPressSelectDate}
            />
            <Spacer height={scale.vsc10} />
            {formik.values.endDate === '' && (
                <>
                    <Text type='ParaLG'>Select leave type</Text>
                    <Spacer height={scale.vsc4} />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                        }}>
                        <SelectionButton
                            label='Full Day'
                            isSelected={getStateValidation(States.FULLDAY)}
                            onPress={onFullDayPress}
                            icon=''
                            buttonStyle={styles.fullButtonStyle}
                        />
                        <Spacer width={scale.sc4} />
                        <HalfButton
                            label='Half Day'
                            icon='arrow-forward'
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
                </>
            )}
            <Spacer height={scale.vsc10} />
            <Input
                type='COMMENT'
                label='Comment'
                placeholder='Add message'
                inputContainerStyle={styles.commentInputContainerStyle}
                value={formik.values.requestDesc}
                onChangeText={formik.handleChange('requestDesc')}
                containerStyle={styles.commentContainerStyle}
            />
            <Spacer height={scale.vsc12} />
            <SelectionButton
                label='Add Attachment (Optional)'
                onPress={() => {}}
            />
            <Spacer height={scale.vsc10} />
            <ButtonDock
                primaryButton={{
                    label: 'Confirm and Apply',
                    onPress: () => formik.handleSubmit(),
                }}
                secondaryButton={{
                    label: 'Cancel',
                    onPress: onCancellation,
                }}
            />
            <Spacer height={scale.vsc10} />
        </ScrollView>
    );
};
export default ApplyLeaveSheetBody;
