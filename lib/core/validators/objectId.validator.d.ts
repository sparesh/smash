import Joi from "@hapi/joi";
import { ValidatorBase } from ".";
export declare class ObjectIdValidator extends ValidatorBase {
    getNewSchema(): Joi.Schema;
    getUpdateSchema(): Joi.Schema;
}
