import React from 'react';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { LeaveCard } from 'src/components/atoms';
import { getLeaveUnicode } from 'src/utils/helpers/unicodeHandler';
import { Entitlement, TestProps } from 'src/utils/types';
import { styles } from './styles';

export type EntitlementSelection = Entitlement & {
    isSelected?: boolean;
};

interface Props extends Partial<TestProps> {
    entitlements: EntitlementSelection[];
    onEntitlementPress: (item: Entitlement) => void;
}

const LAEntitlementGrid = ({ entitlements, onEntitlementPress }: Props) => {
    const renderItem = ({ item }: { item: Entitlement }) => (
        <Pressable onPress={() => onEntitlementPress(item)}>
            <LeaveCard
                takenLeaves={item.totalDaysUsed.toString()}
                totalLeaves={item.balanceInDays.toString()}
                uniCodeIcon={getLeaveUnicode(item.leaveType)}
                leaveType={item.leaveType.name}
            />
        </Pressable>
    );
    return (
        <ScrollView
            horizontal
            contentContainerStyle={styles.scrollViewContainer}>
            <FlatList
                data={entitlements}
                renderItem={renderItem}
                keyExtractor={item => item.entitlementId.toString()}
                style={styles.flatListContainer}
                numColumns={3}
                scrollEnabled={false}
                columnWrapperStyle={styles.columnWrapperStyle}
            />
        </ScrollView>
    );
};

export default LAEntitlementGrid;
