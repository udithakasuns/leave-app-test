import React from 'react';
import { View } from 'react-native';
import {
    AvatarSize,
    Button,
    Divider,
    Input,
    Spacer,
    Text,
} from 'src/components/atoms';
import { AvatarChip, ManagerRequestDetails } from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PendingRequestByID, TestProps } from 'src/utils/types';
import { styles } from './styles';

const { colors } = theme;

interface Props extends Partial<TestProps> {
    requestDetails: PendingRequestByID;
    onPressBackToHome: () => void;
}

const CancelledSheetBody = ({ requestDetails, onPressBackToHome }: Props) => (
    <>
        <Spacer height={2} />
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
            isRecipientVisible
        />
        <Input
            placeholder={requestDetails.requestDesc ?? ''}
            label='Reason'
            type='COMMENT'
            containerStyle={styles.inputContainerStyle}
            inputContainerStyle={styles.inputTextStyle}
            editable={false}
            placeholderColor={colors.gray600}
        />
        <Spacer />
        <Divider />
        <Button
            iconPosition='left'
            label='Back to home'
            onPress={onPressBackToHome}
            icon='arrow-forward'
        />
        <Spacer />
    </>
);
export default CancelledSheetBody;
