/* eslint-disable @typescript-eslint/no-use-before-define */
import { useIsFocused } from '@react-navigation/native';
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
    handleAlreadyNudgeError,
    handleApplyLeaveError,
} from 'components/organisms/Global/LAGlobalEmployee/helpers/errorHandlers';
import { EmployeeHomeScreensProps } from 'navigators/types';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Toast from 'react-native-toast-message';
import { Button, ModalLoader, Spacer, Text } from 'src/components/atoms';
import {
    LAAppBar,
    LAEmployeeModals,
    LAEmployeePopUp,
    LAEntitlementGrid,
    LALeaveRequestList,
} from 'src/components/organisms';
import { LAEmployeeModalProps } from 'src/components/organisms/EmployeeHome/LAEmployeeModals';
import { LAEmployeePopUpProps } from 'src/components/organisms/EmployeeHome/LAEmployeePopUp';
import {
    deleteHttpApplyLeave,
    getHttpLeaveRequestByID,
    postHttpApplyLeave,
    postHttpNudge,
} from 'src/services/http';
import { patchHttpApplyLeave } from 'src/services/http/patchRequest';
import {
    useEmployeeFilterStore,
    useEmployeeStore,
    useRecipientStore,
    useUserStore,
} from 'src/store';
import { showErrorToast, toastConfig } from 'src/utils/alerts';
import { getGreetingsByTime } from 'src/utils/helpers/dateHandler';
import {
    filterChipsEmployee,
    sortByButtonsEmployee,
} from 'src/utils/helpers/defaultData';
import { ErrorCodes } from 'src/utils/helpers/errorCodes';
import { useEntitlementData } from 'src/utils/hooks/useEntitlementData';
import { useFilterTypesData } from 'src/utils/hooks/useFilterTypesData';
import { useLeaveRequestData } from 'src/utils/hooks/useLeaveRequestData';
import {
    EmployeeModal,
    Entitlement,
    EntitlementSelection,
    FilterTypes,
    LeaveRequestByID,
    LeaveRequestType,
    LeaveUndoProp,
    Page,
} from 'src/utils/types';

import { handleDateModal } from 'components/organisms/Global/LAGlobalEmployee/helpers/modalHandlers';
import {
    handleApplyMutationSuccess,
    handleDeleteSuccess,
    handleFilterTypesSuccess,
    handleLeaveRequestSuccess,
    handleNudgeSuccess,
    handleUndoCancellationSuccess,
} from 'components/organisms/Global/LAGlobalEmployee/helpers/successHandlers';

import { useFormik } from '../../utils/hooks/useFormik';

import theme from '../../utils/theme';
import { useStyles } from './styles';
import { screenStyles } from '../../utils/styles';
import { employeeRequestDefault } from './helper';

const { deviceDimensions } = theme;
const EmployeeHome: React.FC<EmployeeHomeScreensProps> = () => {
    const [bottomLayoutHeigt, setBottomLayoutHeight] = useState<number>(0);

    const styles = useStyles({ bottomLayoutHeigt });

    const {
        user: { firstName },
    } = useUserStore();
    const {
        params,
        setSortByButtons,
        setFilterChips,
        filterChips,
        setEmptyFilterUtils,
        resetFilterUtils,
    } = useEmployeeFilterStore();

    const [employeeModal, setEmployeeModal] = useState<LAEmployeeModalProps>();
    const [employeePopup, setEmployeePopup] = useState<LAEmployeePopUpProps>();

    const [employeeRequest, setEmployeeRequest] = useState<LeaveRequestByID>(
        employeeRequestDefault,
    );

    const [latestLeaveRequestID, setLatestLeaveRequestID] = useState(0);

    const {
        getEmployeeModal,
        refreshEmployeeHomeState,
        setRefreshEmployeeHomeState,
    } = useEmployeeStore();

    const isFocused = useIsFocused();

    const { managers } = useRecipientStore();

    const managerAvailable = managers && managers.length > 0;

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
        isLoading,
    }: UseQueryResult<Page<LeaveRequestType[]>> = useLeaveRequestData(
        params,
        (data: Page<LeaveRequestType[]>) =>
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
            onSuccess: (data: any) => {
                leaveRequestByIdMutate(data[0].leaveRequestId);
                setEmployeeModal({ modalType: undefined });
            },

            onError: handleApplyLeaveError,
        },
    );

    const {
        isLoading: isLeaveRequestByIdLoading,
        mutate: leaveRequestByIdMutate,
    } = useMutation(
        ['leaveRequestById'],
        (requestID: number) => getHttpLeaveRequestByID(requestID),
        {
            onSuccess: (leaveRequest: LeaveRequestByID[]) =>
                handleApplyMutationSuccess(
                    leaveRequest[0],
                    setEmployeeRequest,
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
                    setEmployeeRequest,
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

    const handleEntitlementPress = (entitlement: EntitlementSelection) => {
        if (entitlement.balanceInDays === 0) {
            showErrorToast(
                ErrorCodes.UNAVAILABLE_LEAVE_ENTITLEMENTS,
                entitlement.leaveType.name,
            );
            return;
        }
        const entitlementsDeepClone: EntitlementSelection[] = JSON.parse(
            JSON.stringify(entitlements),
        );
        entitlementsDeepClone.map(item => {
            const tempEntitlement = item;
            if (item.entitlementId === entitlement.entitlementId) {
                tempEntitlement.isSelected = true;
            }
            return tempEntitlement;
        });
        formik.setFieldValue('entitlements', entitlementsDeepClone);
        formik.setFieldValue('typeId', entitlement.leaveType.typeId);
        setEmployeeModal({
            modalType: EmployeeModal.APPLY_LEAVE_MODAL,
        });
    };

    const handleRequestItemPress = (item: LeaveRequestType) => {
        getEmployeeModal(item.leaveRequestId);
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
        if (employeeModal?.isNudgeVisble) {
            if (employeeRequest.leaveRequestId) {
                nudgeMutate(employeeRequest.leaveRequestId);
            }
        } else {
            handleAlreadyNudgeError();
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

    useEffect(() => {
        if (latestLeaveRequestID) {
            setTimeout(() => {
                setLatestLeaveRequestID(0);
            }, 5000);
        }
    }, [latestLeaveRequestID]);

    useEffect(() => {
        if (isFocused || refreshEmployeeHomeState) {
            setSortByButtons(sortByButtonsEmployee);
            setFilterChips(filterChipsEmployee);
            refetchAllData();

            if (refreshEmployeeHomeState) {
                setRefreshEmployeeHomeState(false);
            }
        }
    }, [isFocused, refreshEmployeeHomeState]);

    return (
        <View style={styles.container}>
            <View style={screenStyles.containerScollable}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={[
                        screenStyles.scrollViewContainer,
                        styles.scrollView,
                    ]}>
                    <LAAppBar currentScreen='employee' />
                    <Spacer />
                    <Text type='H1Bold'>
                        Hey {firstName} {'\n'}
                        {getGreetingsByTime()}
                    </Text>
                    <Spacer height={5} />
                    {entitlements && (
                        <LAEntitlementGrid
                            entitlements={
                                entitlements as EntitlementSelection[]
                            }
                            onEntitlementPress={handleEntitlementPress}
                            isError={false}
                        />
                    )}
                    <Spacer />
                    <Text type='SubHBold'>Leave Requests</Text>
                    {isLoading ? (
                        [...Array(6)].map(() => (
                            <SkeletonPlaceholder borderRadius={4}>
                                <SkeletonPlaceholder.Item
                                    flexDirection='row'
                                    alignItems='center'
                                    height={deviceDimensions.height / 16}
                                    width='100%'
                                    marginBottom={20}
                                />
                            </SkeletonPlaceholder>
                        ))
                    ) : (
                        <LALeaveRequestList
                            leaveRequests={leaveRequests?.items ?? []}
                            latestLeaveRequestID={latestLeaveRequestID}
                            onPressRequestItem={handleRequestItemPress}
                            isViewAllPage={false}
                            totalItems={leaveRequests?.totalItems ?? 0}
                        />
                    )}
                </ScrollView>
                {managerAvailable && entitlements && (
                    <View
                        onLayout={e =>
                            setBottomLayoutHeight(e.nativeEvent.layout.height)
                        }
                        style={styles.buttonContainer}>
                        <Button
                            label='Apply Leave'
                            icon='arrow-forward'
                            iconPosition='left'
                            onPress={() =>
                                setEmployeeModal({
                                    ...employeeModal,
                                    modalType: EmployeeModal.APPLY_LEAVE_MODAL,
                                })
                            }
                        />
                    </View>
                )}

                <LAEmployeeModals
                    isNudgeVisble={employeeModal?.isNudgeVisble}
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
                    employeeRequest={employeeRequest}
                    modalType={employeePopup?.modalType}
                    onClose={() => setEmployeePopup(undefined)}
                    requestDetails={employeePopup?.requestDetails}
                    onConfirmationUndoPress={() => {
                        setEmployeePopup(undefined);
                        deleteMutate(employeeRequest.leaveRequestId);
                    }}
                    onConfirmationHomePress={() => {
                        setLatestLeaveRequestID(employeeRequest.leaveRequestId);
                        setEmployeePopup(undefined);
                        setEmployeeRequest(employeeRequestDefault);
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
            <ModalLoader
                isVisible={isLeaveRequestByIdLoading}
                backdropOpacity={0.7}
            />
        </View>
    );
};

export default EmployeeHome;
