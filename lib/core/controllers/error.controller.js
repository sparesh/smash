"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.errorController = (error, req, res, next) => {
    if (error) {
        if (error instanceof types_1.ApiError) {
            const isJoi = error.isJoi;
            res.status(isJoi ? 400 : error.code).send({ error: error.errorInfo });
        }
        else {
            res.status(500).send(process.env.NODE_ENV === "production" ? { error: "internal server error" } : error.message);
        }
    }
};
//# sourceMappingURL=error.controller.js.map