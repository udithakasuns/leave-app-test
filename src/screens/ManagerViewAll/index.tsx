import { useNavigation } from '@react-navigation/native';
import { UseQueryResult } from '@tanstack/react-query';
import {
    DrawerScreenNavigationProp,
    ManagerViewAllScreensProps,
} from 'navigators/types';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, IconSize, Spacer, Text } from 'src/components/atoms';
import LAPendingRequestList from 'src/components/organisms/ManagerHome/LAPendingRequestList';
import { useManagerFilterStore, useManagerStore } from 'src/store';
import { usePendingRequestData } from 'src/utils/hooks/usePendingRequestData';
import theme from 'src/utils/theme';
import { PendingRequestType, Section } from 'src/utils/types';

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
        </View>
    );
};

export default ManagerViewAll;
