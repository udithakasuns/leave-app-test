import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'src/components/atoms';
import { Modal } from 'src/components/molecules';
import {
    LATeamAvAvailableText,
    LATeamAvContent,
    LATeamAvNoDataContent,
} from 'src/components/molecules/LATeamAvailability';
import ViewAllMembersSheetBody from 'src/components/organisms/TeamAvailability/ViewAllMembersSheetBody';
import { getHttpTeamAvailability } from 'src/services/http';
import { getformatDateToYyyyMmDd } from 'src/utils/helpers/dateHandler';
import { TID } from 'src/utils/testIds';
import { AvailableTeam, SelectedTeam } from 'src/utils/types';
import { SkelitonLoaderContent } from '../SkelitonLoaders';
import { styles } from './styles';

interface Props {
    selectedTeams: SelectedTeam[];
    isManagerTeamsRefetching: boolean;
}

interface OpenViewAllModal {
    isOpen: boolean;
    awayTeamImages: string[];
    awayTeamNames: string[];
}
const defaultViewAllModalData: OpenViewAllModal = {
    isOpen: false,
    awayTeamImages: [],
    awayTeamNames: [],
};

const AvailabilityContent = ({
    selectedTeams,
    isManagerTeamsRefetching,
}: Props) => {
    const [openViewAllModal, setOpenViewAllModal] = useState<OpenViewAllModal>(
        defaultViewAllModalData,
    );

    const onOpeniewAllModal = (
        awayTeamImages: string[],
        awayTeamNames: string[],
    ) => {
        setOpenViewAllModal({
            isOpen: true,
            awayTeamImages,
            awayTeamNames,
        });
    };

    const onCloseViewAllModal = () =>
        setOpenViewAllModal(defaultViewAllModalData);

    const {
        isLoading: availableTeamLoading,
        isRefetching: availableTeamRefetching,
        data: availableTeam,
    } = useQuery<AvailableTeam | null, AxiosError>(
        [selectedTeams, isManagerTeamsRefetching],
        () => {
            if (!isManagerTeamsRefetching) {
                return getHttpTeamAvailability({
                    date: getformatDateToYyyyMmDd(new Date().toString()),
                    teamIds: [
                        selectedTeams.find(team => team.recentlySelected)
                            ?.teamId || -1,
                    ],
                });
            }
            return null;
        },
        {
            keepPreviousData: true,
        },
    );

    if (availableTeamLoading || availableTeamRefetching || !availableTeam) {
        return <SkelitonLoaderContent />;
    }
    const { imageList, onLeaveCount, onlineCount, nameList } = availableTeam;
    if (onlineCount === 0 && onLeaveCount === 0) {
        return <LATeamAvNoDataContent />;
    }
    if (onLeaveCount === 0) {
        return <LATeamAvAvailableText awayTeamList={[]} leaveDuration='' />;
    }
    return (
        <>
            <LATeamAvContent
                showAvailableTeamCount
                availableTeamCount={onlineCount}
                awayTeamImages={imageList}
                onPressAwayTeamImages={() =>
                    onOpeniewAllModal(imageList, nameList)
                }
            />
            <Modal
                onClose={onCloseViewAllModal}
                isVisible={openViewAllModal.isOpen}
                header='All members'
                sheetBody={
                    <ViewAllMembersSheetBody
                        isAvatarOnly
                        imageList={imageList}
                        nameList={nameList}
                        onClose={onCloseViewAllModal}
                    />
                }
                headerRightContent={
                    <View style={styles.modalheaderRightContentBody}>
                        <Text testID={`${TID}TEXT_LIST_COUNT`}>
                            {nameList.length.toString()}
                        </Text>
                    </View>
                }
            />
        </>
    );
};

export default AvailabilityContent;
