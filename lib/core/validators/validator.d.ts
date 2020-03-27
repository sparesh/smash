import Joi from "@hapi/joi";
export interface IValidator {
    objectId(): Joi.Schema;
    validateNew<T>(object: T): Promise<T>;
    validateUpdate<T>(object: T): Promise<T>;
}
export declare abstract class ValidatorBase implements IValidator {
    objectId(): Joi.StringSchema;
    validateNew<T>(object: T): Promise<T>;
    validateUpdate<T>(object: T): Promise<T>;
    private validate;
    protected abstract getNewSchema(): Joi.Schema;
    protected abstract getUpdateSchema(): Joi.Schema;
}
