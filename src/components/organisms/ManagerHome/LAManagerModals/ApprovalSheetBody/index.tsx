import React from 'react';
import { AvatarSize, Divider, Input, Spacer } from 'src/components/atoms';
import {
    AvatarChip,
    ButtonDock,
    ManagerRequestDetails,
    SelectionButton,
} from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PendingRequestByID, TestProps } from 'src/utils/types';
import { styles } from './styles';

interface Props extends Partial<TestProps> {
    requestDetails: PendingRequestByID;
    onPressApproveLeave: () => void;
    onPressDeclineLeave: () => void;
}

const { colors } = theme;

const ApprovalSheetBody = ({
    requestDetails,
    onPressApproveLeave,
    onPressDeclineLeave,
}: Props) => (
    <>
        <Spacer />
        <AvatarChip
            size={AvatarSize.large}
            label={requestDetails.employee.name ?? ''}
            source={{
                uri: requestDetails.employee.authPic ?? '',
            }}
            containerStyle={styles.containerStyle}
        />
        <Spacer height={2} />
        <Divider />
        <ManagerRequestDetails flexEnd requestDetails={requestDetails} />
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
        <SelectionButton
            label='Upload Attachment'
            icon='file'
            iconLibrary='svg'
            onPress={() => {}}
        />
        <Spacer />
        <ButtonDock
            iconPosition='left'
            primaryButton={{
                label: 'Approve Leave',
                icon: 'arrow-forward',
                onPress: onPressApproveLeave,
            }}
            secondaryButton={{
                label: 'Decline Leave',
                mode: 'outlined-error',
                onPress: onPressDeclineLeave,
            }}
        />
        <Spacer height={10} />
    </>
);
export default ApprovalSheetBody;
