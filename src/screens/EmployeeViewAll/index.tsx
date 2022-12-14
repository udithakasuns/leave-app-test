/* eslint-disable @typescript-eslint/no-use-before-define */
import { useNavigation } from '@react-navigation/native';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
    DrawerScreenNavigationProp,
    EmployeeViewAllScreensProps,
} from 'navigators/types';
import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import {
    LAEmployeeModals,
    LAEmployeePopUp,
    LALeaveRequestList,
} from 'src/components/organisms';
import { LAEmployeeModalProps } from 'src/components/organisms/EmployeeHome/LAEmployeeModals';
import { LAEmployeePopUpProps } from 'src/components/organisms/EmployeeHome/LAEmployeePopUp';
import {
    deleteHttpApplyLeave,
    postHttpApplyLeave,
    postHttpNudge,
} from 'src/services/http';
import { patchHttpApplyLeave } from 'src/services/http/patchRequest';
import {
    useEmployeeFilterStore,
    useEmployeeStore,
    useRecipientStore,
} from 'src/store';
import { showErrorToast, toastConfig } from 'src/utils/alerts';
import { ErrorCodes } from 'src/utils/helpers/errorCodes';
import { useEntitlementData } from 'src/utils/hooks/useEntitlementData';
import { useFilterTypesData } from 'src/utils/hooks/useFilterTypesData';
import { useLeaveRequestData } from 'src/utils/hooks/useLeaveRequestData';
import theme from 'src/utils/theme';
import {
    EmployeeModal,
    Entitlement,
    EntitlementSelection,
    FilterTypes,
    LeaveRequestType,
    LeaveRequestWithPageType,
    LeaveUndoProp,
} from 'src/utils/types';
import { useFormik } from '../../utils/hooks/useFormik';
import { handleApplyLeaveError } from '../EmployeeHome/helpers/errorHandlers';
import {
    handleDateModal,
    handleRequestSelectedModal,
} from '../EmployeeHome/helpers/modalHandlers';
import {
    handleApplyMutationSuccess,
    handleDeleteSuccess,
    handleFilterTypesSuccess,
    handleLeaveRequestSuccess,
    handleNudgeSuccess,
    handleUndoCancellationSuccess,
} from '../EmployeeHome/helpers/successHandlers';

import { styles } from './styles';

const { scale, pixel } = theme;

const EmployeeHomeViewAll: React.FC<EmployeeViewAllScreensProps> = () => {
    const navigation = useNavigation<DrawerScreenNavigationProp>();

    const {
        params,
        resetFiltersParams,
        setFilterChips,
        filterChips,
        setEmptyFilterUtils,
        resetFilterUtils,
        setParams,
    } = useEmployeeFilterStore();

    const [employeeModal, setEmployeeModal] = useState<LAEmployeeModalProps>();
    const [employeePopup, setEmployeePopup] = useState<LAEmployeePopUpProps>();

    const { employeeRequest, setLeaveRequest, setLeaveRequestByID } =
        useEmployeeStore();

    const { managers } = useRecipientStore();

    const {
        refetch: filterRefetch,
    }: UseQueryResult<FilterTypes[], AxiosError> = useFilterTypesData(
        true,
        (data: FilterTypes[]) =>
            handleFilterTypesSuccess(data, filterChips, setFilterChips),
    );

    const {
        data: leaveRequests,
        refetch,
        isLoading: loadingLeaveRequests,
    }: UseQueryResult<LeaveRequestWithPageType> = useLeaveRequestData(
        { ...params, size: 200 },
        false,
        (data: LeaveRequestWithPageType) =>
            handleLeaveRequestSuccess(
                data,
                setEmptyFilterUtils,
                resetFilterUtils,
            ),
    );

    const { mutate: applyLeaveMutate } = useMutation(
        ['applyLeave'],
        postHttpApplyLeave,
        {
            onSuccess: (data: any) =>
                handleApplyMutationSuccess(
                    data,
                    setEmployeeModal,
                    setLeaveRequestByID,
                    setEmployeePopup,
                    refetchAllData,
                ),
            onError: handleApplyLeaveError,
        },
    );

    const { mutate: undoCancellationMutate } = useMutation(
        ['undoCancellation'],
        patchHttpApplyLeave,
        {
            onSuccess: () => handleUndoCancellationSuccess(refetchAllData),
            onError: () => {
                showErrorToast(ErrorCodes.ERROR_OCCURRED);
            },
        },
    );

    const { mutate: deleteMutate } = useMutation(
        ['applyLeaveDelete'],
        deleteHttpApplyLeave,
        {
            onSuccess: () =>
                handleDeleteSuccess(
                    employeeModal?.modalType,
                    employeeRequest,
                    employeeModal,
                    setLeaveRequest,
                    setEmployeeModal,
                    setEmployeePopup,
                    refetchAllData,
                ),
        },
    );

    const { mutate: nudgeMutate } = useMutation(
        ['nudgeManger'],
        postHttpNudge,
        {
            onSuccess: () =>
                handleNudgeSuccess(setEmployeeModal, managers[0].name ?? ''),
        },
    );

    const [formik] = useFormik(applyLeaveMutate);

    const {
        data: entitlements,
        refetch: entitlementsRetch,
    }: UseQueryResult<Entitlement[]> = useEntitlementData(
        (data: Entitlement[]) => {
            const entitlementsDeepClone: EntitlementSelection[] = JSON.parse(
                JSON.stringify(data),
            );
            formik.setFieldValue('entitlements', entitlementsDeepClone);
        },
    );

    const handleRequestItemPress = (item: LeaveRequestType) => {
        setLeaveRequestByID(item.leaveRequestId);
        setEmployeeModal({
            modalType: handleRequestSelectedModal(item),
        });
    };

    const handleDateModalPress = () =>
        setEmployeeModal({
            ...employeeModal,
            modalType: EmployeeModal.CHOSE_DATE_MODAL,
        });

    const handleDateModalBackPress = (modalType: EmployeeModal) => {
        setEmployeeModal({
            ...employeeModal,
            modalType: handleDateModal(modalType),
        });
    };

    const handleNudgeManager = () => {
        if (employeeRequest.leaveRequestId) {
            nudgeMutate(employeeRequest.leaveRequestId);
        }
    };
    const handleViewMoreDetails = (onBackPressModal: EmployeeModal) => {
        setEmployeeModal({
            ...employeeModal,
            onBackPressType: onBackPressModal,
            modalType: EmployeeModal.LEAVE_INFORMATION,
        });
    };

    const refetchAllData = () => {
        refetch();
        entitlementsRetch();
        filterRefetch();
    };

    const backAction = () => {
        resetFiltersParams();
        navigation.jumpTo('EmployeeHome');
        return true;
    };

    const callNextPage = () => {
        if (
            params.page !== undefined &&
            leaveRequests &&
            params.page < leaveRequests.pageNumbers - 1
        ) {
            setParams({
                ...params,
                page: params.page || params.page === 0 ? params.page + 1 : 0,
            });
        }
    };
    return (
        <View style={styles.innerContainer}>
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
                <Text type='SubHBold' style={{ marginHorizontal: scale.sc5 }}>
                    Leave Requests
                </Text>
                {!loadingLeaveRequests && (
                    <LALeaveRequestList
                        leaveRequests={leaveRequests?.leaveRequestData}
                        callNextPage={callNextPage}
                        onPressRequestItem={handleRequestItemPress}
                        isViewAllPage
                    />
                )}
            </ScrollView>
            <LAEmployeeModals
                modalType={employeeModal?.modalType}
                onBackPressType={employeeModal?.onBackPressType}
                onClose={() => setEmployeeModal(undefined)}
                formik={formik}
                onPressSelectDate={handleDateModalPress}
                onBackPress={handleDateModalBackPress}
                onPressNudge={handleNudgeManager}
                onPressLeaveInformation={handleViewMoreDetails}
                onPressCancelLeave={() => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: undefined,
                    });
                    deleteMutate(employeeRequest.leaveRequestId);
                }}
                onNavigateToCancelLeave={() => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: EmployeeModal.CANCEL_REQUEST_MODAL,
                    });
                }}
                onPressRevokeLeave={() => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: EmployeeModal.REVOKE_REQUEST_MODAL,
                    });
                }}
                onRevokeLeaveRequest={(revokeComment: string) => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: undefined,
                    });
                    // TODO:  Make API Call for Revoke Request
                }}
            />
            <LAEmployeePopUp
                modalType={employeePopup?.modalType}
                onClose={() => setEmployeePopup(undefined)}
                requestDetails={employeePopup?.requestDetails}
                onConfirmationUndoPress={() => {
                    setEmployeePopup(undefined);
                    deleteMutate(employeeRequest.leaveRequestId);
                }}
                onConfirmationHomePress={() => {
                    setEmployeePopup(undefined);
                    formik.resetForm();
                    formik.setFieldValue('entitlements', entitlements);
                    refetch();
                }}
                onCancellationUndoPress={() => {
                    const values: Partial<LeaveUndoProp> = {
                        requestID: employeeRequest.leaveRequestId,
                        startDate: employeeRequest?.startDate,
                        endDate: employeeRequest?.endDate,
                        leaveRequestStatus: 'PENDING',
                    };
                    setEmployeePopup({ modalType: undefined });
                    undoCancellationMutate(values);
                }}
            />
            {employeeModal?.modalType === undefined && (
                <Toast
                    config={toastConfig}
                    position='bottom'
                    bottomOffset={30}
                    autoHide
                />
            )}
        </View>
    );
};

export default EmployeeHomeViewAll;
