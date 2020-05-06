"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
exports.errorController = (error, req, res, next) => {
    if (error) {
        if (error instanceof types_1.ApiError) {
            res.status(error.code).send({ error: error.errorInfo });
        }
        else if (error.isJoi) {
            res.status(400).send({ error: error.message });
        }
        else {
            res.status(500).send(process.env.NODE_ENV === "production" ? { error: "internal server error" } : error.message);
        }
    }
};
//# sourceMappingURL=error.controller.js.map