import { useNavigation } from '@react-navigation/native';
import { UseQueryResult } from '@tanstack/react-query';
import {
    DrawerScreenNavigationProp,
    ManagerViewAllScreensProps,
} from 'navigators/types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Spacer, Text } from 'src/components/atoms';
import { BackHeader } from 'src/components/molecules';
import LAPendingRequestList from 'src/components/organisms/ManagerHome/LAPendingRequestList';
import { useManagerFilterStore, useManagerStore } from 'src/store';
import { usePendingRequestData } from 'src/utils/hooks/usePendingRequestData';
import theme from 'src/utils/theme';
import { PendingRequestType, Section } from 'src/utils/types';
import { screenStyles } from 'utils/styles';

const { scale } = theme;

const ManagerViewAll: React.FC<ManagerViewAllScreensProps> = () => {
    const navigation = useNavigation<DrawerScreenNavigationProp>();
    const { getManagerModal } = useManagerStore();
    const {
        params,
        resetFiltersParams,
        setEmptyFilterUtils,
        resetFilterUtils,
    } = useManagerFilterStore();

    const {
        data: leaveRequests,
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

    const handleRequestItemPress = (item: PendingRequestType) => {
        getManagerModal(item.leaveRequestId);
    };

    const backAction = () => {
        resetFiltersParams();
        navigation.jumpTo('ManagerHome');
        return true;
    };

    return (
        <View style={screenStyles.container}>
            <BackHeader title='Home' onBackPress={backAction} />
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
        </View>
    );
};

export default ManagerViewAll;
