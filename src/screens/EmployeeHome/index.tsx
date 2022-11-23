/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prefer-destructuring */
import { useMutation, UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EmployeeHomeScreensProps } from 'navigators/types';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import { MultiButtonProps, MultiChipProps } from 'src/components/molecules';
import {
    LAAppBar,
    LAEmployeeModals,
    LAEmployeePopUp,
    LAEntitlementGrid,
    LALeaveRequestList,
} from 'src/components/organisms';
import { LAEmployeeModalProps } from 'src/components/organisms/EmployeeHome/LAEmployeeModals';
import { FilterChipsProps } from 'src/components/organisms/Global/LAFilters';
import { getGreetingsByTime } from 'src/utils/helpers/dateHandler';
import { filterChips } from 'src/utils/helpers/defaultData';
import { useEntitlementData } from 'src/utils/hooks/useEntitlementData';
import { useFilterTypesData } from 'src/utils/hooks/useFilterTypesData';
import { useLeaveRequestData } from 'src/utils/hooks/useLeaveRequestData';
import theme from 'src/utils/theme';
import {
    EmployeeModal,
    EmployeePopup,
    Entitlement,
    EntitlementSelection,
    FilterTypes,
    LeaveRequestParams,
    LeaveRequestType,
    RequestDetails,
    Section,
} from 'src/utils/types';
import {
    deleteHttpApplyLeave,
    postHttpApplyLeave,
    postHttpNudge,
} from 'src/services/http';
import { LAEmployeePopUpProps } from 'src/components/organisms/EmployeeHome/LAEmployeePopUp';
import { useUserStore } from 'src/store';
import Toast from 'react-native-toast-message';
import { toastConfig } from 'src/utils/alerts';
import { styles } from './styles';
import { useFormik } from '../../utils/hooks/useFormik';

const { scale } = theme;

const sortByButtons: MultiButtonProps[] = [
    {
        buttonId: 1,
        label: 'Date Requested',
        selected: true,
    },
    {
        buttonId: 2,
        label: 'Leave Date',
    },
];

const EmployeeHome: React.FC<EmployeeHomeScreensProps> = () => {
    const {
        user: { firstName },
    } = useUserStore();
    const [requestsParams, setRequestsParams] = useState<LeaveRequestParams>({
        sortKey: 'creationDate',
    });
    const [filterChipsLocal, setFilterChipsLocal] =
        useState<FilterChipsProps[]>(filterChips);
    const [employeeModal, setEmployeeModal] = useState<LAEmployeeModalProps>();
    const [employeePopup, setEmployeePopup] = useState<LAEmployeePopUpProps>();

    const {
        data: statusTypes,
        isError: isStatusError,
        refetch: filterRefetch,
    }: UseQueryResult<FilterTypes[], AxiosError> = useFilterTypesData();

    const { data: leaveRequests, refetch }: UseQueryResult<Section[]> =
        useLeaveRequestData(requestsParams, true);

    const handleMutationOnSuccess = (data: any) => {
        setEmployeeModal({
            modalType: undefined,
        });
        fetchData();
        const tempDetails: RequestDetails = {
            durationDays: '1 Day',
            leaveRequest: undefined,
        };
        tempDetails.leaveRequest = data[0];
        tempDetails.recipient = [
            {
                employeeId: '',
                name: 'Kalana',
                designation: '',
                authPic:
                    'https://media-exp1.licdn.com/dms/image/C5603AQGxMAXX8F3o3Q/profile-displayphoto-shrink_800_800/0/1660713820771?e=2147483647&v=beta&t=VSvPFV6_n8DNd85moQHh2f1DaftBJ4XFxu6at9SUW7g',
            },
        ];
        setEmployeePopup({
            requestDetails: tempDetails,
            modalType: EmployeePopup.LEAVE_REQUEST_CONFIRMATION,
        });
    };

    const { mutate } = useMutation(['applyLeave'], postHttpApplyLeave, {
        onSuccess: handleMutationOnSuccess,
    });

    const handleDeleteOnSuccess = () => {
        fetchData();
        if (employeeModal?.modalType === EmployeeModal.CANCEL_REQUEST_MODAL) {
            setEmployeeModal({
                modalType: undefined,
            });
            return;
        }
        setEmployeeModal({
            ...employeeModal,
            modalType: EmployeeModal.APPLY_LEAVE_MODAL,
        });
    };

    const { mutate: deleteMutate } = useMutation(
        ['applyLeaveDelete'],
        deleteHttpApplyLeave,
        {
            onSuccess: handleDeleteOnSuccess,
        },
    );

    const handleNudgeOnSuccess = () => {
        setEmployeeModal({ modalType: undefined });
        Toast.show({
            type: 'successToast',
            props: {
                title: 'You have nudged your supervisor',
                content: 'Kalana was sent a reminder',
            },
        });
    };

    const { mutate: nudgeMutate } = useMutation(
        ['nudgeManger'],
        postHttpNudge,
        {
            onSuccess: handleNudgeOnSuccess,
        },
    );

    const [formik] = useFormik(mutate);

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

    const handleSortBy = (muiltButtons: MultiButtonProps[]) => {
        const selectedButton = muiltButtons.filter(
            btn => btn.selected === true,
        )[0];
        const sortKey =
            selectedButton.buttonId === 1 ? 'creationDate' : 'startDate';
        setRequestsParams({ ...requestsParams, sortKey });
    };

    const handleFilter = (chips: FilterChipsProps[]) => {
        const leaveStatusChipsData = chips.filter(item => item.id === 1);
        const leaveTypeChipsData = chips.filter(item => item.id === 2);
        const selectedLeaveStatus = leaveStatusChipsData[0].chips
            .filter(item => item.selected)
            .map(item => item.chipInfo);
        const selectedLeaveTypes = leaveTypeChipsData[0].chips
            .filter(item => item.selected)
            .map(item => item.chipId);
        setRequestsParams({
            ...requestsParams,
            status: selectedLeaveStatus.toString(),
            leaveType: selectedLeaveTypes.toString(),
        });
        setFilterChipsLocal(chips);
    };

    const handleEntitlementPress = (entitlement: EntitlementSelection) => {
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
        let selectedModal: EmployeeModal = EmployeeModal.CANCEL_REQUEST_MODAL;
        switch (item.status) {
            case 'PENDING':
                selectedModal = EmployeeModal.PENDING_LEAVE_MODAL;
                break;
            case 'APPROVED':
                selectedModal = EmployeeModal.APPROVED_LEAVE_MODAL;
                break;
            case 'DENIED':
                selectedModal = EmployeeModal.DENIED_LEAVE_MODAL;
                break;
            default:
                break;
        }
        const tempDetails: RequestDetails = {
            durationDays: '1 Day',
            leaveRequest: undefined,
        };
        tempDetails.leaveRequest = item;
        tempDetails.recipient = [
            {
                employeeId: '',
                name: 'Kalana',
                designation: '',
                authPic:
                    'https://media-exp1.licdn.com/dms/image/C5603AQGxMAXX8F3o3Q/profile-displayphoto-shrink_800_800/0/1660713820771?e=2147483647&v=beta&t=VSvPFV6_n8DNd85moQHh2f1DaftBJ4XFxu6at9SUW7g',
            },
        ];
        setEmployeeModal({
            leaveRequest: item,
            requestDetails: tempDetails,
            modalType: selectedModal,
        });
    };

    const handleDateModalPress = () =>
        setEmployeeModal({
            ...employeeModal,
            modalType: EmployeeModal.CHOSE_DATE_MODAL,
        });

    const handleDateModalBackPress = (modalType: EmployeeModal) => {
        switch (modalType) {
            case EmployeeModal.CHOSE_DATE_MODAL:
                setEmployeeModal({
                    ...employeeModal,
                    modalType: EmployeeModal.APPLY_LEAVE_MODAL,
                });
                break;
            case EmployeeModal.PENDING_LEAVE_MODAL:
                setEmployeeModal({
                    ...employeeModal,
                    modalType: EmployeeModal.PENDING_LEAVE_MODAL,
                });
                break;
            default:
                setEmployeeModal({
                    modalType: undefined,
                });
                break;
        }
    };

    const handleNudgeManager = (isDisable: boolean) => {
        if (employeeModal?.leaveRequest?.leaveRequestId) {
            nudgeMutate(employeeModal.leaveRequest.leaveRequestId);
        }
    };
    const handleViewMoreDetails = () => {
        setEmployeeModal({
            ...employeeModal,
            modalType: EmployeeModal.LEAVE_INFORMATION,
        });
    };

    const fetchData = () => {
        refetch();
        entitlementsRetch();
        filterRefetch();
    };

    useEffect(() => {
        if (
            statusTypes !== undefined &&
            filterChipsLocal.length < 2 &&
            !isStatusError
        ) {
            const chipProps: MultiChipProps[] = statusTypes?.map(
                (item): MultiChipProps => ({
                    chipId: item.typeId,
                    content: item.name,
                }),
            );
            setFilterChipsLocal(state => [
                ...state,
                {
                    id: 2,
                    title: 'Leave Type',
                    chips: chipProps,
                },
            ]);
        }
    }, [statusTypes]);

    return (
        <View style={styles.innerContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LAAppBar
                    currentScreen='employee'
                    onPressNotification={() => {}}
                />
                <Spacer />
                <Text type='H1Bold'>
                    Hey {firstName} {'\n'}
                    {getGreetingsByTime()}
                </Text>
                <Spacer height={8} />
                {entitlements && (
                    <LAEntitlementGrid
                        entitlements={entitlements as EntitlementSelection[]}
                        onEntitlementPress={handleEntitlementPress}
                    />
                )}
                <Spacer />
                <Text type='SubHBold'>Leave Requests</Text>
                {leaveRequests && (
                    <>
                        <LALeaveRequestList
                            leaveRequests={leaveRequests}
                            sortByButtons={sortByButtons}
                            onSortPress={handleSortBy}
                            onFilterPress={handleFilter}
                            onPressRequestItem={handleRequestItemPress}
                            filterChips={JSON.parse(
                                JSON.stringify(filterChipsLocal),
                            )}
                        />
                        <View
                            style={{
                                marginBottom:
                                    scale.vsc40 * leaveRequests.length,
                            }}
                        />
                    </>
                )}
            </ScrollView>
            <View style={styles.buttonContainer}>
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
            <LAEmployeeModals
                modalType={employeeModal?.modalType}
                leaveRequest={employeeModal?.leaveRequest}
                requestDetails={employeeModal?.requestDetails}
                onClose={() => setEmployeeModal(undefined)}
                formik={formik}
                onPressSelectDate={handleDateModalPress}
                onBackPress={handleDateModalBackPress}
                onPressNudge={handleNudgeManager}
                onPressViewMoreDetails={handleViewMoreDetails}
                onPressCancelLeave={() => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: undefined,
                    });
                    deleteMutate(
                        employeeModal?.requestDetails?.leaveRequest
                            ?.leaveRequestId ?? 0,
                    );
                }}
                onNavigateToCancelLeave={() => {
                    setEmployeeModal({
                        ...employeeModal,
                        modalType: EmployeeModal.CANCEL_REQUEST_MODAL,
                    });
                }}
            />
            <LAEmployeePopUp
                modalType={employeePopup?.modalType}
                onClose={() => setEmployeePopup(undefined)}
                requestDetails={employeePopup?.requestDetails}
                onConfirmationUndoPress={() => {
                    setEmployeePopup(undefined);
                    deleteMutate(
                        employeePopup?.requestDetails?.leaveRequest
                            ?.leaveRequestId ?? 0,
                    );
                }}
                onConfirmationHomePress={() => {
                    setEmployeePopup(undefined);
                    formik.resetForm();
                    formik.setFieldValue('entitlements', entitlements);
                    refetch();
                }}
            />
            <Toast
                config={toastConfig}
                position='bottom'
                bottomOffset={30}
                autoHide
            />
        </View>
    );
};

export default EmployeeHome;
