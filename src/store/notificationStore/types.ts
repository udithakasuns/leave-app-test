type UserRole = 'MANAGER' | 'EMPLOYEE';

export interface State {
    count: number | '';
    isPopupVisible: boolean;
    notifyUserRole: UserRole;
}

export type Actions = {
    getCount: (userRole: UserRole) => void;
    setIsPopupVisible: (isPopupVisible: boolean) => void;
};
