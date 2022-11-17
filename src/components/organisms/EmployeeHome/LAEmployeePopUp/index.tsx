import { FormikProps } from 'formik';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Chip, Spacer, Text } from 'src/components/atoms';
import { ButtonDock, PopUp } from 'src/components/molecules';
import { scale } from 'src/utils/helpers/scalingUtil';
import theme from 'src/utils/theme';
import {
    ApplyFormValues,
    EmployeeModal,
    EmployeePopup,
    TestProps,
} from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

export type PopUpProps = {
    modalType: EmployeePopup;
};

export type LAEmployeePopUpProps = Partial<PopUpProps>;

interface Props extends Partial<TestProps>, LAEmployeePopUpProps {
    onClose: () => void;
}

const LAEmployeePopUp = ({ modalType, onClose }: Props) => {
    const [isHalfSelected, setIsHalfSelected] = useState(false);
    return (
        <>
            {modalType === EmployeePopup.LEAVE_REQUEST_CONFIRMATION && (
                <PopUp
                    onClose={onClose}
                    modalVisible
                    defaultHeader={{
                        title: 'Leave Request Confirmed',
                        subTitle:
                            'Your leave request is submitted, when the request is approved by your supervisor you will get a notification.',
                    }}
                    bodyStyle={{
                        alignContent: 'center',
                        justifyContent: 'center',
                    }}
                    bodyChildren={
                        <>
                            <Spacer />
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <Text
                                    type='ParaLG'
                                    style={{ alignSelf: 'center' }}>
                                    Type :
                                </Text>
                                <Spacer />
                                <Chip
                                    content='📅 Annual'
                                    contentTextType='ParaLG'
                                />
                            </View>
                            <Spacer height={8} />
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <Text
                                    type='ParaLG'
                                    style={{
                                        paddingTop: theme.scale.vsc16,
                                        alignSelf: 'baseline',
                                    }}>
                                    Duration :
                                </Text>

                                <Spacer />
                                <View
                                    style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                    }}>
                                    <Chip
                                        content='1 Day'
                                        contentTextType='ParaLG'
                                        containerStyle={{ marginVertical: 3 }}
                                    />
                                    <Spacer width={2} height={3} />
                                    <Chip
                                        content='19th Jan - 19th Dec'
                                        contentTextType='ParaLG'
                                        containerStyle={{
                                            marginVertical: 3,
                                        }}
                                    />
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <Text
                                    type='ParaLG'
                                    style={{ alignSelf: 'center' }}>
                                    Reciepent :
                                </Text>
                                <Spacer />
                            </View>
                            <Spacer />
                            <ButtonDock
                                iconPosition='left'
                                primaryButton={{
                                    label: 'Back to home',
                                    icon: 'arrow-forward',
                                    onPress: () => {},
                                }}
                                secondaryButton={{
                                    label: 'Undo request',
                                    icon: 'undo',
                                    onPress: () => {},
                                }}
                            />
                        </>
                    }
                />
            )}
            {modalType === EmployeePopup.LEAVE_REQUEST_REVOKE && (
                <PopUp
                    onClose={onClose}
                    modalVisible
                    bodyChildren={
                        <View>
                            <Text>ss</Text>
                        </View>
                    }
                />
            )}
        </>
    );
};
export default LAEmployeePopUp;
