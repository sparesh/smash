import Joi from "@hapi/joi";
import { ValidatorBase } from ".";
export declare class ObjectIdValidator extends ValidatorBase<string> {
    getNewSchema(): Joi.Schema;
    getUpdateSchema(): Joi.Schema;
}
