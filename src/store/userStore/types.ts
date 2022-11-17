export type State = {
    userId: number;
    username: string;
    email: string;
    active: boolean;
    loading: boolean;
};

export type Actions = {
    saveUser: (user: State) => void;
    removeUser: () => void;
    setLoading: (state: boolean) => void;
};
