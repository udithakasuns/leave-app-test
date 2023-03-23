import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Input, Spacer, Text } from 'src/components/atoms';
import theme from 'src/utils/theme';
import { TestProps } from 'src/utils/types';
import {
    TID_DECLINE_LEAVE_SHEET_BODY_BUTTON_DECLINE_LEAVE,
    TID_DECLINE_LEAVE_SHEET_BODY_TXT_DECLINE_REASON,
} from 'src/utils/testIds';

interface Props extends Partial<TestProps> {
    onDeclineLeaveRequest: (reviewerComment: string) => void;
}

const { colors, scale } = theme;

const DeclineSheetBody = ({ onDeclineLeaveRequest }: Props) => {
    const [reviewerComment, setReviewerComment] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const handleDeclineLeave = () => {
        if (reviewerComment.trim().length === 0) {
            setShowError(true);
            return;
        }
        onDeclineLeaveRequest(reviewerComment);
    };
    return (
        <View style={{ flex: 1 }}>
            <Spacer height={2} />
            <Input
                testIdInput={TID_DECLINE_LEAVE_SHEET_BODY_TXT_DECLINE_REASON}
                error={showError}
                placeholder='Add your reason'
                label='Reason to decline'
                type='COMMENT'
                value={reviewerComment}
                containerStyle={{ margin: 0 }}
                inputContainerStyle={{ paddingVertical: scale.sc10 }}
                placeholderColor={colors.gray600}
                onChangeText={setReviewerComment}
            />
            <Spacer height={2} />
            {showError && (
                <Text color={colors.error}>
                    Please enter why you are declining this leave request.
                </Text>
            )}
            <Spacer />
            <Button
                testID={TID_DECLINE_LEAVE_SHEET_BODY_BUTTON_DECLINE_LEAVE}
                iconPosition='left'
                mode='outlined-error'
                icon='close'
                label='Decline Leave'
                onPress={handleDeclineLeave}
            />
            <Spacer />
        </View>
    );
};
export default DeclineSheetBody;
