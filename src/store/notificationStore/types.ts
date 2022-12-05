export interface State {
    count: number | '';
    isPopupVisible: boolean;
}

export type Actions = {
    getCount: () => void;
    setIsPopupVisible: (isPopupVisible: boolean) => void;
};
