export interface State {
    count: number | '';
}

export type Actions = {
    getCount: () => void;
};
