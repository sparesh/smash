"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorController = (error, req, res, next) => {
    if (error) {
        if (error.isJoi) {
            res.status(400).send({ error: error.message });
        }
        else if (error.userError) {
            res.status(error.code).send({ error: error.message });
        }
        else {
            res.status(500).send(process.env.NODE_ENV === "production" ? { error: "Internal Server Error" } : { error: error.message });
        }
    }
};
//# sourceMappingURL=error.controller.js.map