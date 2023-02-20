import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Chip, Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import LAText from 'src/components/atoms/LAText';
import {
    Modal,
    MultiChipProps,
    TeamAvailabilityDetails,
    TeamChipGroup,
} from 'src/components/molecules';
import theme from 'src/utils/theme';
import { PartialBy } from 'src/utils/types';
import AddTeamSheetBody from '../../ManagerHome/LAManagerModals/AddTeamSheetBody';
import { styles } from './styles';

const { colors } = theme;

interface Props {
    onExpandTeamAvailability: () => void;
    isTAforApproveLeave: boolean;
    teamChipsList: MultiChipProps[];
    awayTeamMembersDetails: object[];
    startDate: string;
    endDate: string;
}

const LATeamAvailabilityFilterHeader = ({
    onExpandTeamAvailability,
    isTAforApproveLeave,
    teamChipsList,
    awayTeamMembersDetails,
    startDate,
    endDate,
}: PartialBy<Props, 'startDate' | 'endDate'>) => {
    const [availableMemberCount, setAvailableMemberCount] =
        useState<number>(15);
    const [visibleAddTeamModal, setVisibleAddTeamModal] =
        useState<boolean>(false);

    return (
        <>
            <TouchableOpacity
                style={
                    isTAforApproveLeave
                        ? styles.containerForLeave
                        : styles.container
                }
                activeOpacity={1}
                onPress={
                    isTAforApproveLeave ? onExpandTeamAvailability : () => {}
                }>
                <View style={styles.titleContainer}>
                    <Text type='SubHBold'>Team availability</Text>
                    {isTAforApproveLeave === false ? (
                        <TouchableOpacity
                            onPress={() => {
                                setVisibleAddTeamModal(state => !state);
                            }}>
                            <Icon
                                name='dots-horizontal'
                                library='community'
                                color={colors.gray600}
                                enableBackground={false}
                                size={IconSize.medium}
                            />
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => {
                                setVisibleAddTeamModal(state => !state);
                            }}>
                            <Chip
                                content={teamChipsList[0].content}
                                rightIconName='arrow-drop-down'
                                rightIconColor={colors.black}
                                contentColor={colors.black}
                                outline
                                outlineColor={colors.gray300}
                                contentTextType='ParaSM'
                                backgroundColor={colors.gray200}
                                containerStyle={styles.chipContainerStyle}
                            />
                        </TouchableOpacity>
                    )}
                </View>
                {teamChipsList && !isTAforApproveLeave ? (
                    <TeamChipGroup
                        chips={teamChipsList}
                        singleSelection
                        onPress={() => {}}
                    />
                ) : (
                    <View>
                        <Spacer height={5} />
                        {startDate && endDate ? (
                            <LAText>
                                {startDate} to {endDate} - Dinushi, Gaveen and
                                more are away
                            </LAText>
                        ) : (
                            <LAText>
                                {startDate !== '' ? startDate : null} - Dinushi,
                                Gaveen and more are away
                            </LAText>
                        )}
                    </View>
                )}
                {isTAforApproveLeave === false ? (
                    <View>
                        <Spacer height={5} />
                        <Text>TODAY</Text>
                    </View>
                ) : null}
                <TeamAvailabilityDetails
                    availableCount={availableMemberCount}
                    hasDateRange={
                        isTAforApproveLeave &&
                        startDate !== '' &&
                        endDate !== ''
                    }
                    awayTeamMembersDetails={awayTeamMembersDetails}
                />
            </TouchableOpacity>
            {isTAforApproveLeave === false ? (
                <Modal
                    onClose={() => {
                        setVisibleAddTeamModal(state => !state);
                    }}
                    isVisible={visibleAddTeamModal}
                    header='Add team'
                    sheetBody={
                        <AddTeamSheetBody teamChipsList={teamChipsList} />
                    }
                />
            ) : null}
        </>
    );
};

export default LATeamAvailabilityFilterHeader;
