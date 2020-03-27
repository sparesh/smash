"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
class ValidatorBase {
    objectId() {
        return joi_1.default.string()
            .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, { name: "object id" })
            .trim();
    }
    validateNew(object) {
        return this.validate(this.getNewSchema(), object);
    }
    validateUpdate(object) {
        return this.validate(this.getUpdateSchema(), object);
    }
    async validate(schema, object) {
        try {
            return await schema.validateAsync(object, {
                abortEarly: false
            });
        }
        catch (error) {
            const message = `${error.message}`;
            error.message = message.split(". ");
            throw error;
        }
    }
}
exports.ValidatorBase = ValidatorBase;
//# sourceMappingURL=validator.js.map