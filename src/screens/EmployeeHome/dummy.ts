/* The file is used only for testing before API integration should be removed afterwards */
import { Entitlement, Section } from 'src/utils/types';

export const entitlements: Entitlement[] = [
    {
        entitlementId: 24,
        totalHoursAllocated: 112,
        totalHoursUsed: 0,
        leaveType: {
            typeId: 1,
            name: 'Annual',
        },
        validFrom: 1640995200000,
        validTo: 1672444800000,
        active: true,
        totalDaysAllocated: 14.0,
        totalDaysUsed: 2.0,
        balanceInDays: 7.0,
    },
    {
        entitlementId: 25,
        totalHoursAllocated: 112,
        totalHoursUsed: 0,
        leaveType: {
            typeId: 2,
            name: 'Casual',
        },
        validFrom: 1640995200000,
        validTo: 1672444800000,
        active: true,
        totalDaysAllocated: 14.0,
        totalDaysUsed: 5.0,
        balanceInDays: 7.0,
    },
    {
        entitlementId: 26,
        totalHoursAllocated: 112,
        totalHoursUsed: 0,
        leaveType: {
            typeId: 3,
            name: 'Medical',
        },
        validFrom: 1640995200000,
        validTo: 1672444800000,
        active: true,
        totalDaysAllocated: 14.0,
        totalDaysUsed: 9.0,
        balanceInDays: 14.0,
    },
    {
        entitlementId: 26,
        totalHoursAllocated: 112,
        totalHoursUsed: 0,
        leaveType: {
            typeId: 4,
            name: 'Maternity',
        },
        validFrom: 1640995200000,
        validTo: 1672444800000,
        active: true,
        totalDaysAllocated: 14.0,
        totalDaysUsed: 9.0,
        balanceInDays: 14.0,
    },
    {
        entitlementId: 26,
        totalHoursAllocated: 112,
        totalHoursUsed: 0,
        leaveType: {
            typeId: 5,
            name: 'Acadmic',
        },
        validFrom: 1640995200000,
        validTo: 1672444800000,
        active: true,
        totalDaysAllocated: 14.0,
        totalDaysUsed: 9.0,
        balanceInDays: 14.0,
    },
    {
        entitlementId: 26,
        totalHoursAllocated: 112,
        totalHoursUsed: 0,
        leaveType: {
            typeId: 6,
            name: 'Custom',
        },
        validFrom: 1640995200000,
        validTo: 1672444800000,
        active: true,
        totalDaysAllocated: 14.0,
        totalDaysUsed: 9.0,
        balanceInDays: 14.0,
    },
];

export const leaveRequests: Section[] = [
    {
        title: 'February',
        data: [
            {
                startDate: 1641081600000,
                endDate: 1641168000000,
                leaveType: {
                    typeId: 1,
                    name: 'Annual',
                },
                reasonForLeave: null,
                leaveState: 'FULLDAY',
                status: 'CANCELLED',
                requestDesc: null,
                reviewerComment: null,
                employee: {
                    employeeId: '1',
                    name: null,
                    designation: null,
                    authPic: null,
                },
            },
            {
                startDate: 1641081600000,
                endDate: 1641081600000,
                leaveType: {
                    typeId: 2,
                    name: 'Causal',
                },
                reasonForLeave: null,
                leaveState: 'FULLDAY',
                status: 'APPROVED',
                requestDesc: null,
                reviewerComment: null,
                employee: {
                    employeeId: '1',
                    name: null,
                    designation: null,
                    authPic: null,
                },
            },
        ],
    },
    {
        title: 'January',
        data: [
            {
                startDate: 1641168000000,
                endDate: 1641081600000,
                leaveType: {
                    typeId: 4,
                    name: 'Maternity',
                },
                reasonForLeave: null,
                leaveState: 'FULLDAY',
                status: 'DENIED',
                requestDesc: null,
                reviewerComment: null,
                employee: {
                    employeeId: '1',
                    name: null,
                    designation: null,
                    authPic: null,
                },
            },
            {
                startDate: 1662508800000,
                endDate: 1662508800000,
                leaveType: {
                    typeId: 3,
                    name: 'Medical',
                },
                reasonForLeave: null,
                leaveState: 'FULLDAY',
                status: 'PENDING',
                requestDesc: null,
                reviewerComment: null,
                employee: {
                    employeeId: '1',
                    name: null,
                    designation: null,
                    authPic: null,
                },
            },
            {
                startDate: 1659657600000,
                endDate: 1656115200000,
                leaveType: {
                    typeId: 6,
                    name: 'Custom',
                },
                reasonForLeave: null,
                leaveState: 'FULLDAY',
                status: 'PENDING',
                requestDesc: null,
                reviewerComment: null,
                employee: {
                    employeeId: '1',
                    name: null,
                    designation: null,
                    authPic: null,
                },
            },
        ],
    },
];
