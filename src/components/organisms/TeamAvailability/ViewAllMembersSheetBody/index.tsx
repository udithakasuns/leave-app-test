import React from 'react';
import { View } from 'react-native';
import { Button, Divider, Spacer, Text } from 'src/components/atoms';
import { AvatarChip } from 'src/components/molecules';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { EmployeeType, PartialBy } from 'src/utils/types';
import styles from './styles';

interface Props {
    awayTeam: EmployeeType[];
    imageList: string[];
    nameList: string[];
    onClose: () => void;
}
const { colors, scale } = theme;
const ViewAllMembersSheetBody = ({
    awayTeam,
    imageList,
    nameList,
    onClose,
}: PartialBy<Props, 'imageList' | 'nameList'>) => {
    const getContentBodyWithDesignation = () =>
        awayTeam.map(item => (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: scale.sc20,
                }}>
                <AvatarChip
                    key={item?.employeeId}
                    label={item?.name ?? ''}
                    source={{
                        uri: item?.authPic ?? '',
                    }}
                    labelStyle={{ color: colors.black }}
                    containerStyle={{
                        padding: scale.sc1,
                        borderRadius: scale.sc64,
                    }}
                />

                <Text type='ParaXS' style={{ alignSelf: 'center' }}>
                    {item?.designation}
                </Text>
            </View>
        ));
    const getContentBody = () =>
        imageList?.map((item, index) => (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: scale.sc20,
                }}>
                <AvatarChip
                    key={item}
                    label={nameList?.[index] ?? ''}
                    source={{
                        uri: item ?? '',
                    }}
                    labelStyle={{ color: colors.black }}
                    containerStyle={{
                        padding: scale.sc1,
                        borderRadius: scale.sc64,
                    }}
                />
            </View>
        ));

    return (
        <View style={styles.container}>
            <Divider />
            <Spacer height={scale.sc15} />
            <View
                style={{
                    flexDirection: 'column',
                }}>
                {getContentBodyWithDesignation()}
                {getContentBody()}
            </View>
            <Spacer height={scale.sc1} />
            <Button
                testID={`${TID}BUTTON_CLOSE`}
                mode='contained-gray'
                iconPosition='left'
                icon='close'
                label='Close'
                onPress={onClose}
                labelStyle={{ paddingHorizontal: scale.sc4 }}
            />
            <Spacer />
        </View>
    );
};

export default ViewAllMembersSheetBody;
