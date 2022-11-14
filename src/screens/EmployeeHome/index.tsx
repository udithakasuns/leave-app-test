import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { EmployeeHomeScreensProps } from 'navigators/types';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import { MultiButtonProps, MultiChipProps } from 'src/components/molecules';
import {
    LAAppBar,
    LAEmployeeModals,
    LAEntitlementGrid,
    LALeaveRequestList,
} from 'src/components/organisms';
import { LAEmployeeModalProps } from 'src/components/organisms/EmployeeHome/LAEmployeeModals';
import { EntitlementSelection } from 'src/components/organisms/EmployeeHome/LAEntitlementGrid';
import { FilterChipsProps } from 'src/components/organisms/Global/LAFilters';
import { getGreetingsByTime } from 'src/utils/helpers/dateHandler';
import { filterChips } from 'src/utils/helpers/defaultData';
import { useEntitlementData } from 'src/utils/hooks/useEntitlementData';
import { useFilterTypesData } from 'src/utils/hooks/useFilterTypesData';
import { useLeaveRequestData } from 'src/utils/hooks/useLeaveRequest';
import theme from 'src/utils/theme';
import {
    EmployeeModal,
    Entitlement,
    FilterTypes,
    LeaveRequestParams,
    Section,
} from 'src/utils/types';
import { styles } from './styles';

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
    const [requestsParams, setRequestsParams] = useState<LeaveRequestParams>({
        sortKey: 'creationDate',
        size: 5,
    });
    const [filterChipsLocal, setFilterChipsLocal] =
        useState<FilterChipsProps[]>(filterChips);
    const [employeeModal, setEmployeeModal] = useState<LAEmployeeModalProps>();

    const {
        data: statusTypes,
        isError: isStatusError,
    }: UseQueryResult<FilterTypes[], AxiosError> = useFilterTypesData();
    const { data: entitlements }: UseQueryResult<Entitlement[]> =
        useEntitlementData();
    const { data: leaveRequests }: UseQueryResult<Section[]> =
        useLeaveRequestData(requestsParams);

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
        setEmployeeModal({
            entitlements: entitlementsDeepClone,
            modalType: EmployeeModal.APPLY_LEAVE_MODAL,
        });
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
                    Hey Thiran {'\n'}
                    {getGreetingsByTime()}
                </Text>
                <Spacer height={8} />
                {entitlements && (
                    <LAEntitlementGrid
                        entitlements={entitlements}
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
                entitlements={employeeModal?.entitlements ?? entitlements}
                onClose={() => setEmployeeModal(undefined)}
            />
        </View>
    );
};

export default EmployeeHome;
