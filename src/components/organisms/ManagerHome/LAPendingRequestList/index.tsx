/* eslint-disable react/no-unstable-nested-components */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Chip, Divider, Spacer, Text } from 'src/components/atoms';
import { PendingListItem } from 'src/components/molecules';
import { DrawerScreenNavigationProp } from 'src/navigators/types';
import { useManagerFilterStore } from 'src/store';
import { getStartEndDate } from 'src/utils/helpers/dateHandler';
import { getErrorMessage } from 'src/utils/helpers/errorCodes';
import { getEntitlementChipText } from 'src/utils/helpers/unicodeHandler';
import theme from 'src/utils/theme';
import { AtLeast, PendingRequestType, TestProps } from 'src/utils/types';
import LAManagerFilters from '../LAManagerFilters';
import styles from './styles';

const { colors, scale, fontSize } = theme;

interface Props extends Partial<TestProps> {
    leaveRequests: PendingRequestType[];
    onPressRequestItem: (item: PendingRequestType) => void;
    isViewAllPage: boolean;
    totalItems?: number;
    callNextPage?: () => void;
}

const LAPendingRequestList = ({
    leaveRequests,
    onPressRequestItem,
    isViewAllPage = false,
    totalItems = 0,
    callNextPage,
}: AtLeast<Props, 'isViewAllPage' | 'onPressRequestItem'>) => {
    const { filterUtils, resetFiltersParams } = useManagerFilterStore();
    const navigation = useNavigation<DrawerScreenNavigationProp>();

    const {
        container,
        footerContainer,
        viewAllContainer,
        viewAllContent,
        viewAllPress,
    } = styles(isViewAllPage);
    const Item = ({ item }: { item: PendingRequestType }) => (
        <PendingListItem
            date={getStartEndDate(item.startDate, item.endDate)}
            employee={item.employee}
            // entitlement={getEntitlementChipText(
            //     item.leaveType,
            //     item.leaveType.name,
            // )}
            onPress={() => onPressRequestItem(item)}
            // entitlementChipColor={
            //     isViewAllPage ? colors.tertiaryColor : colors.white
            // }
            status={item.status}
            chipsColor={isViewAllPage ? colors.tertiaryColor : colors.white}
        />
    );

    return (
        <View style={container}>
            <LAManagerFilters />
            <FlatList
                data={leaveRequests ?? []}
                ListEmptyComponent={
                    <View
                        style={{
                            paddingVertical: scale.vsc80,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{ fontSize: fontSize.fs24 }}>🧐</Text>
                        <Spacer height={2} />
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text type='SubHBold'>
                                {
                                    getErrorMessage(
                                        filterUtils.isFiltersSelected
                                            ? 'EMPTY_FILTERS_PENDING_LEAVE'
                                            : 'EMPTY_PENDING_LEAVE',
                                    ).title
                                }
                            </Text>
                            <Spacer height={2} />
                            <Text
                                type='ParaSM'
                                style={{
                                    color: colors.primaryGrayLabel,
                                    textAlign: 'center',
                                    paddingHorizontal: scale.sc32,
                                }}>
                                {
                                    getErrorMessage(
                                        filterUtils.isFiltersSelected
                                            ? 'EMPTY_FILTERS_PENDING_LEAVE'
                                            : 'EMPTY_PENDING_LEAVE',
                                    ).message
                                }
                            </Text>
                            {filterUtils.isFiltersSelected && (
                                <>
                                    <Spacer />
                                    <Button
                                        mode='outlined'
                                        label='Reset Filters'
                                        icon='restore'
                                        iconPosition='left'
                                        buttonStyle={{
                                            paddingVertical: scale.sc12,
                                        }}
                                        onPress={resetFiltersParams}
                                    />
                                </>
                            )}
                        </View>
                    </View>
                }
                keyExtractor={(item, index) => item.status + index}
                onEndReachedThreshold={0.3}
                showsVerticalScrollIndicator={false}
                onEndReached={() => {
                    if (callNextPage) {
                        callNextPage();
                    }
                }}
                renderItem={({ item }) => <Item item={item} />}
                ListFooterComponent={() =>
                    !isViewAllPage ? (
                        <View style={footerContainer}>
                            <Spacer height={6} />
                            <Divider />
                            <Spacer height={6} />
                            <Chip
                                content='View All'
                                rightIconName='arrow-forward'
                                disabled={totalItems <= 6}
                                outline
                                contentColor={colors.black}
                                onPressChip={() =>
                                    navigation.navigate('ManagerViewAll')
                                }
                                contentTextType='ParaLG'
                                outlineColor={colors.gray300}
                                contentStyle={viewAllContent}
                                pressableContainerStyle={viewAllPress}
                                containerStyle={viewAllContainer}
                            />
                        </View>
                    ) : null
                }
            />
        </View>
    );
};

export default LAPendingRequestList;
