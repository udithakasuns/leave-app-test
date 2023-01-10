import React, { useState } from 'react';
import { Button, Input, Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { TestProps } from 'src/utils/types';

interface Props extends Partial<TestProps> {
    // requestDetails: RequestDetails;
    onRevokeLeaveRequest: (revokeComment: string) => void;
}

const { colors, scale } = theme;

const RevokeLeaveSheetBody = ({
    // requestDetails,
    onRevokeLeaveRequest,
}: Props) => {
    const [revokeComment, setRevokeComment] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const handleRevokeLeave = () => {
        if (revokeComment.trim().length === 0) {
            setShowError(true);
            return;
        }
        onRevokeLeaveRequest(revokeComment);
    };
    return (
        <>
            <Spacer height={5} />
            <Text color={colors.gray700}>
                Approved leave will be revoked and notification will be sent to
                the employee. Leave entitlements will be updated.
            </Text>
            {/* {requestDetails && (
                <RequestDetailsSection
                    requestDetails={requestDetails}
                    isStatusVisible
                    isDurationVisible
                />
            )} */}
            <Input
                error={showError}
                placeholder='Add message'
                label='Why do you want to revoke the leave?'
                type='COMMENT'
                value={revokeComment}
                containerStyle={{ margin: 0 }}
                inputContainerStyle={{ paddingVertical: scale.sc10 }}
                placeholderColor={colors.gray600}
                onChangeText={setRevokeComment}
            />
            <Spacer height={2} />
            {showError && (
                <Text color={colors.error}>
                    Why do you want to revoke the leave
                </Text>
            )}
            <Spacer />
            <Button
                mode='outlined-error'
                icon='close'
                label='Request to be revoked'
                onPress={handleRevokeLeave}
                labelStyle={{ paddingHorizontal: scale.sc4 }}
            />
            <Spacer />
        </>
    );
};
export default RevokeLeaveSheetBody;
