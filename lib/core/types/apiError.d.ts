export declare class ApiError extends Error {
    errorInfo: any;
    code: number;
    userError: boolean;
    constructor(errorInfo: any, code: number);
}
