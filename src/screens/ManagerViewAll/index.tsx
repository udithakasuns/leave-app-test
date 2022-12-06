import { useNavigation } from '@react-navigation/native';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
    DrawerScreenNavigationProp,
    ManagerViewAllScreensProps,
} from 'navigators/types';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import { MultiChipProps } from 'src/components/molecules';
import { LAManagerModals, LAManagerPopUp } from 'src/components/organisms';
import { LAManagerModalProps } from 'src/components/organisms/ManagerHome/LAManagerModals';
import { LAManagerPopUpProps } from 'src/components/organisms/ManagerHome/LAManagerPopUp';
import LAPendingRequestList from 'src/components/organisms/ManagerHome/LAPendingRequestList';
import { patchHttpManagerLeave } from 'src/services/http/patchRequest';
import { useManagerFilterStore, useManagerStore } from 'src/store';
import { useFilterTypesData } from 'src/utils/hooks/useFilterTypesData';
import { usePendingRequestData } from 'src/utils/hooks/usePendingRequestData';
import theme from 'src/utils/theme';
import {
    FilterTypes,
    ManagerModal,
    ManagerPopup,
    PendingRequestByID,
    PendingRequestType,
    Section,
    Status,
} from 'src/utils/types';

const { scale, pixel } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: scale.sc20,
        backgroundColor: 'white',
    },
});

const ManagerViewAll: React.FC<ManagerViewAllScreensProps> = () => {
    const navigation = useNavigation<DrawerScreenNavigationProp>();

    const [managerModal, setManagerModal] = useState<LAManagerModalProps>();
    const [managerPopup, setManagerPopup] = useState<LAManagerPopUpProps>();

    const { managerRequest, setPendingRequestByID, setPendingRequest } =
        useManagerStore();
    const {
        params,
        filterChips,
        resetFiltersParams,
        setFilterChips,
        setEmptyFilterUtils,
        resetFilterUtils,
    } = useManagerFilterStore();

    const {
        data: leaveRequests,
        refetch: refetchLeaveRequests,
        isLoading: loadingLeaveRequests,
    }: UseQueryResult<Section<PendingRequestType[]>[]> = usePendingRequestData(
        params,
        false,
        (data: Section<PendingRequestType[]>[]) => {
            if (data?.length === 0 || data === undefined) {
                setEmptyFilterUtils();
            } else {
                resetFilterUtils();
            }
        },
    );

    const {
        refetch: statusTypesRefetch,
    }: UseQueryResult<FilterTypes[], AxiosError> = useFilterTypesData(
        false,
        (data: FilterTypes[]) => {
            const chipProps: MultiChipProps[] = data.map(
                (item): MultiChipProps => ({
                    chipId: item.typeId,
                    content: item.name,
                }),
            );
            const tempFilterChips = filterChips.filter(item => item.id !== 2);
            if (chipProps.length > 0)
                setFilterChips([
                    ...tempFilterChips,
                    {
                        id: 2,
                        title: 'Leave Type',
                        chips: chipProps,
                    },
                ]);
        },
    );

    const { mutate: updateLeaveMutate } = useMutation(
        ['updateLeave'],
        patchHttpManagerLeave,
        {
            onSuccess: (data: any) => {
                const leaveData: PendingRequestByID = data[0];
                setPendingRequest(leaveData);
                refetchLeaveRequests();
                statusTypesRefetch();
                switch (leaveData.status) {
                    case Status.APPROVED:
                        setManagerPopup({
                            modalType: ManagerPopup.LEAVE_REQUEST_APPROVED,
                        });
                        break;
                    case Status.DENIED:
                        setManagerPopup({
                            modalType: ManagerPopup.LEAVE_REQUEST_DECLINE,
                        });
                        break;
                    case Status.PENDING:
                        setManagerPopup({
                            modalType: undefined,
                        });
                        setManagerModal({
                            modalType: ManagerModal.PENDING_LEAVE_MODAL,
                        });
                        break;
                    default:
                        break;
                }
            },
        },
    );

    const handleRequestItemPress = (item: PendingRequestType) => {
        let selectedModal: ManagerModal = ManagerModal.APPROVED_LEAVE_MODAL;
        switch (item.status) {
            case 'PENDING':
                selectedModal = ManagerModal.PENDING_LEAVE_MODAL;
                break;
            case 'APPROVED':
                selectedModal = ManagerModal.APPROVED_LEAVE_MODAL;
                break;
            case 'DENIED':
                selectedModal = ManagerModal.DENIED_LEAVE_MODAL;
                break;
            case 'CANCELLED':
                selectedModal = ManagerModal.CANCELLED_LEAVE_MODAL;
                break;
            default:
                break;
        }
        setManagerModal({ modalType: selectedModal });
        setPendingRequestByID(item.leaveRequestId);
    };

    const backAction = () => {
        resetFiltersParams();
        navigation.jumpTo('ManagerHome');
        return true;
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: pixel(8),
                }}>
                <Icon
                    name='arrow-back'
                    enableBackground
                    size={IconSize.medium}
                    increasePadding={1}
                    onPress={backAction}
                />
                <Spacer />
                <Text>Home</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Spacer />
                <Text type='H1Bold' style={{ marginHorizontal: scale.sc5 }}>
                    Leave Requests
                </Text>
                {!loadingLeaveRequests && (
                    <LAPendingRequestList
                        leaveRequests={leaveRequests}
                        onPressRequestItem={handleRequestItemPress}
                        isViewAllPage
                    />
                )}
            </ScrollView>
            <LAManagerModals
                onClose={() => setManagerModal({ modalType: undefined })}
                modalType={managerModal?.modalType}
                onBackPressType={managerModal?.onBackPressType}
                onPressApproveLeave={() => {
                    setManagerModal({ modalType: undefined });
                    updateLeaveMutate({
                        requestID: managerRequest.leaveRequestId,
                        status: Status.APPROVED,
                    });
                }}
                onPressDeclineLeave={() => {
                    setManagerModal({
                        modalType: ManagerModal.DECLINE_LEAVE_MODAL,
                    });
                }}
                onPressLeaveInformation={(onBackPressType: ManagerModal) => {
                    setManagerModal({
                        modalType: ManagerModal.LEAVE_INFORMATION,
                        onBackPressType,
                    });
                }}
                onBackPress={(modalType: ManagerModal) => {
                    setManagerModal(state => ({
                        ...state,
                        modalType,
                    }));
                }}
                onDeclineLeaveRequest={(reviewerComment: string) => {
                    setManagerModal({ modalType: undefined });
                    updateLeaveMutate({
                        requestID: managerRequest.leaveRequestId,
                        status: Status.DENIED,
                        reviewerComment,
                    });
                }}
            />
            <LAManagerPopUp
                modalType={managerPopup?.modalType}
                onClose={() => setManagerPopup({ modalType: undefined })}
                onUndoApprovalPress={() => {
                    updateLeaveMutate({
                        requestID: managerRequest.leaveRequestId,
                        status: Status.PENDING,
                    });
                }}
            />
        </View>
    );
};

export default ManagerViewAll;
