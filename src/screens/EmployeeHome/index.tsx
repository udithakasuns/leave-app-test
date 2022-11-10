import { EmployeeHomeScreensProps } from 'navigators/types';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Spacer, Text } from 'src/components/atoms';
import {
    LAAppBar,
    LAEntitlementGrid,
    LALeaveRequestList,
} from 'src/components/organisms';
import { httpLeaveRequestApi, httpUserLoginApi } from 'src/services/http';
import {
    getFormattedMonth,
    getGreetingsByTime,
} from 'src/utils/helpers/dateHandler';
import theme from 'src/utils/theme';
import { Entitlement, LeaveRequestType, Section } from 'src/utils/types';
import { leaveRequests } from './dummy';
// import { leaveRequests } from './dummy';
import { styles } from './styles';

const { scale } = theme;
const accessToken =
    'eyJraWQiOiJPZUZxMW82NHBEMWo1ZDI2RVwvTmlEcDBIOHZHOFlLckd1S002VFVYak9HOD0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIwZjBlMTBlMC03ODcwLTRmM2UtYTAzYS0zNTM5MDQ3MWIxNzMiLCJjb2duaXRvOmdyb3VwcyI6WyJ1cy1lYXN0LTFfUGJDOExybTBXX0dvb2dsZSIsImVtcGxveWVlcyJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9QYkM4THJtMFciLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiI3ZHMxdjRjZXJvbGo5MnNsanZrcm44dm1rbSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoicGhvbmUgb3BlbmlkIHByb2ZpbGUgZW1haWwiLCJhdXRoX3RpbWUiOjE2NjgwMTk4ODAsImV4cCI6MTY2ODAzMDY4MCwiaWF0IjoxNjY4MDE5ODgxLCJqdGkiOiJiNDRiMGQ3NS1mZjAyLTQ1ODgtOTBhNC1iNmQ1MmI1ZmZlOTIiLCJ1c2VybmFtZSI6Imdvb2dsZV8xMTE3OTYzOTQ1MTUxMDIzODM3NDcifQ.XRtUtgsNEVyDcNoqkpGYS64er0ksBH4JsUlt2CF_0uxj39NQN45amMd2pcOngzZpD6M0wozVv8KuwKc3H7YY1m0MrXMGgVVsj5_EDU_epRr-yR5CyIXH_hTcoRZZaKdkUjHZH3-unG0gp1bIbUPn_8Va2pbPchEx8JTRHKKEwhSUM-rSm1q5SsgEqIKqmvmVs3ja6cs4UYyf2cABNClfcQdEwtDwf1O8c4H-MC-qITcKOU0iM7mcyJEvQlkGO-K_iHblyRwag3oGeWcWDy0iWRnfqG56l_GD-TmvG_wXUAv_8Qyy6IQs7Mds9QxE5bsub-DATrWGWNzTkqwAU6XBVg';
const EmployeeHome: React.FC<EmployeeHomeScreensProps> = () => {
    const [entitlements, setEntitlements] = useState<Entitlement[]>();
    // const [leaveRequests, setLeaveRequests] = useState<Section[]>([]);

    useEffect(() => {
        async function fetchData() {
            const response = await httpUserLoginApi();
            setEntitlements(response.results);
            const requestJson = await httpLeaveRequestApi();
            const requestItems: LeaveRequestType[] = requestJson[0].items;
            const monthTitles: string[] = requestItems.map(item =>
                getFormattedMonth(item.startDate),
            );
            const leaveRequestsData: Section[] = monthTitles.map(
                (item: string): Section => ({
                    title: item,
                    data: requestItems.filter(
                        state => getFormattedMonth(state.startDate) === item,
                    ),
                }),
            );
            // setLeaveRequests(leaveRequestsData);
        }
        fetchData();
        // saveUserTokens({
        //     accessToken,
        //     idToken: '',
        //     refreshToken: '',
        // });
    }, []);
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
                        onEntitlementPress={() => {}}
                    />
                )}
                <Spacer />
                <Text type='SubHBold'>Leave Requests</Text>
                {leaveRequests && (
                    <>
                        <LALeaveRequestList leaveRequests={leaveRequests} />
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
                    onPress={() => {}}
                />
            </View>
        </View>
    );
};

export default EmployeeHome;
