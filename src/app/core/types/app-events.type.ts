export type AppEvents<T, R extends object = {}> = {
    type: T;
} & R;