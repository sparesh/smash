export declare class ApiError extends Error {
    code: number;
    userError: boolean;
    constructor(message: string, code: number);
}
