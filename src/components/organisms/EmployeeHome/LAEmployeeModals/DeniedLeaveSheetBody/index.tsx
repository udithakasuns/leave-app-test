import React from 'react';
import { View } from 'react-native';
import { Button, Divider, Input, Spacer, Text } from 'src/components/atoms';
import { AvatarChip, RequestDetailsSection } from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy, RequestDetails, TestProps } from 'src/utils/types';
import { styles } from './styles';

interface Props extends Partial<TestProps> {
    requestDetails: RequestDetails;
    onClose: () => void;
}

const { colors, scale } = theme;

const DeniedLeaveSheetBody = ({
    requestDetails,
    onClose,
}: PartialBy<Props, 'requestDetails'>) => (
    <>
        {requestDetails?.leaveRequest && (
            <RequestDetailsSection
                requestDetails={requestDetails}
                isRecipientVisible={false}
            />
        )}
        <Input
            placeholder={requestDetails?.leaveRequest?.requestDesc ?? ''}
            label='Reason'
            type='COMMENT'
            editable={false}
            placeholderColor={colors.gray600}
            containerStyle={styles.inputContainerStyle}
            inputContainerStyle={styles.inputTextStyle}
        />
        <Spacer />
        <Divider />
        <Spacer />
        <View style={styles.itemRow}>
            <Text type='ParaLG' style={{ alignSelf: 'center' }}>
                Denied by :
            </Text>
            <AvatarChip
                containerStyle={{ marginLeft: 10 }}
                label={requestDetails?.leaveRequest?.reviewer?.name ?? ''}
                source={{
                    uri: requestDetails?.leaveRequest?.reviewer?.authPic ?? '',
                }}
            />
        </View>
        <Spacer />
        <Input
            placeholder={requestDetails?.leaveRequest?.reviewerComment ?? ''}
            label='Reason to decline'
            type='COMMENT'
            editable={false}
            placeholderColor={colors.gray600}
            containerStyle={styles.inputContainerStyle}
            inputContainerStyle={styles.inputTextStyle}
        />
        <Spacer />
        <Button
            iconPosition='left'
            label='Proceed to home'
            onPress={onClose}
            icon='arrow-forward'
        />
        <Spacer height={10} />
    </>
);
export default DeniedLeaveSheetBody;
