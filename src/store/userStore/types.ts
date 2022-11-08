export type State = {
    userId: number;
    username: string;
    email: string;
    active: boolean;
};

export type Actions = {
    saveUser: (user: State) => void;
    removeUser: () => void;
};
