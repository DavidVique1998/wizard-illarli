export interface Response<T> {
    status: boolean;
    message: string;
    errors: string;
    data: T;
}