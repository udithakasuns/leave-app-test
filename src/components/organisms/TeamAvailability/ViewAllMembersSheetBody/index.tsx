/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { View } from 'react-native';
import { Button, Divider, Spacer, Text } from 'src/components/atoms';
import { AvatarChip } from 'src/components/molecules';
import { TID } from 'src/utils/testIds';
import theme from 'src/utils/theme';
import { EmployeeType } from 'src/utils/types';
import styles from './styles';

const { scale } = theme;

interface CommonProps {
    onClose: () => void;
}

interface AvatarOnlyProps extends CommonProps {
    isAvatarOnly: true;
    imageList: string[];
    nameList: string[];
}

interface AvatarAndDesignationProps extends CommonProps {
    isAvatarOnly: false | undefined;
    awayTeam: EmployeeType[];
}

type Props = AvatarOnlyProps | AvatarAndDesignationProps;

const ViewAllMembersSheetBody = (props: Props) => {
    const getAvatartsWithDesignation = (awayTeam: EmployeeType[]) =>
        awayTeam.map((team, index) => (
            <View style={styles.row}>
                <View style={styles.nameContainer}>
                    <AvatarChip
                        testIdContent={`${TID}AVATR_CHIP_AWAY_TEAM_MEMBER_${index}`}
                        key={team.employeeId}
                        label={team.name ?? ''}
                        source={{
                            uri: team.authPic ?? '',
                        }}
                        labelStyle={styles.avatarChipLabel}
                        containerStyle={styles.avatarChipContainer}
                    />
                </View>
                <View style={styles.designationContainer}>
                    <Text
                        testID={`${TID}TEXT_DESIGNATION_${index}`}
                        numberOfLines={2}
                        type='ParaXS'>
                        {team.designation}
                    </Text>
                </View>
            </View>
        ));

    const getAvatarList = (imageList: string[], nameList: string[]) =>
        imageList.map((item, index) => (
            <View style={styles.row}>
                <AvatarChip
                    testIdContent={`${TID}AVATAR_CHIP_AWAY_TEAM_MEMBER_${index}`}
                    key={item}
                    label={nameList[index] ?? ''}
                    source={{
                        uri: item ?? '',
                    }}
                    labelStyle={styles.avatarChipLabel}
                    containerStyle={styles.avatarChipContainer}
                />
            </View>
        ));

    return (
        <View style={styles.container}>
            <Divider />
            <Spacer height={scale.sc15} />
            <View>
                {props.isAvatarOnly
                    ? getAvatarList(props.imageList, props.nameList)
                    : getAvatartsWithDesignation(props.awayTeam)}
            </View>
            <Spacer height={scale.sc1} />
            <Button
                testID={`${TID}BUTTON_CLOSE`}
                mode='contained-gray'
                iconPosition='left'
                icon='close'
                label='Close'
                onPress={props.onClose}
                labelStyle={{ paddingHorizontal: scale.sc4 }}
            />
            <Spacer />
        </View>
    );
};

export default ViewAllMembersSheetBody;
