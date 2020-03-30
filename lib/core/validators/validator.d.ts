import Joi from "@hapi/joi";
export interface IValidator<T> {
    objectId(): Joi.Schema;
    validateNew(object: T): Promise<T>;
    validateUpdate(object: T): Promise<T>;
}
export declare abstract class ValidatorBase<T> implements IValidator<T> {
    objectId(): Joi.StringSchema;
    validateNew(object: T): Promise<T>;
    validateUpdate(object: T): Promise<T>;
    private validate;
    protected abstract getNewSchema(): Joi.Schema;
    protected abstract getUpdateSchema(): Joi.Schema;
}
