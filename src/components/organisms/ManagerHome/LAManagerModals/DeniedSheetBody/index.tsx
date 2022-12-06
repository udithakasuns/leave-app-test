import React from 'react';
import { View } from 'react-native';
import { AvatarSize, Button, Input, Spacer, Text } from 'src/components/atoms';
import {
    AvatarChip,
    ManagerRequestDetails,
    MoreDetailsButton,
} from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PendingRequestByID, TestProps } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props extends Partial<TestProps> {
    requestDetails: PendingRequestByID;
    onPressBackToHome: () => void;
    onPressLeaveInformation: () => void;
}

const DeniedSheetBody = ({
    requestDetails,
    onPressBackToHome,
    onPressLeaveInformation,
}: Props) => (
    <>
        <Spacer height={8} />
        <AvatarChip
            size={AvatarSize.large}
            label={requestDetails.employee.name ?? ''}
            source={{
                uri: requestDetails.employee.authPic ?? '',
            }}
            containerStyle={styles.containerStyle}
        />
        <ManagerRequestDetails
            requestDetails={requestDetails}
            isStatusVisible
        />
        <MoreDetailsButton onPress={onPressLeaveInformation} />
        <Spacer />
        <View style={styles.itemRow}>
            <Text type='ParaLG' style={{ alignSelf: 'center' }}>
                Denied by :
            </Text>
            <AvatarChip
                containerStyle={{ marginLeft: 10 }}
                label={requestDetails?.reviewer?.name ?? ''}
                source={{
                    uri: requestDetails?.reviewer?.authPic ?? '',
                }}
            />
        </View>
        <Spacer />
        <Input
            placeholder={requestDetails.reviewerComment ?? ''}
            label='Reason for denial'
            type='COMMENT'
            containerStyle={styles.inputContainerStyle}
            inputContainerStyle={styles.inputTextStyle}
            editable={false}
            placeholderColor={colors.gray600}
        />
        <Spacer />
        <Button
            iconPosition='left'
            label='Back to home'
            onPress={onPressBackToHome}
            icon='arrow-forward'
        />
        <Spacer />
    </>
);
export default DeniedSheetBody;
