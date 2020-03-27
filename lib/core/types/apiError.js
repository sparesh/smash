"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
        this.userError = code >= 400 && code < 500;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=apiError.js.map