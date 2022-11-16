import React from 'react';
import { FlatList, Pressable, ScrollView } from 'react-native';
import { LeaveCard } from 'src/components/atoms';
import { getLeaveUnicode } from 'src/utils/helpers/unicodeHandler';
import { EntitlementSelection, TestProps } from 'src/utils/types';
import { styles } from './styles';

interface Props extends Partial<TestProps> {
    entitlements: EntitlementSelection[];
    onEntitlementPress: (item: EntitlementSelection) => void;
}

const LAEntitlementGrid = ({ entitlements, onEntitlementPress }: Props) => {
    const renderItem = ({ item }: { item: EntitlementSelection }) => (
        <Pressable onPress={() => onEntitlementPress(item)}>
            <LeaveCard
                isSelected={item.isSelected}
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
