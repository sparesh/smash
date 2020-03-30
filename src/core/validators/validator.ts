import Joi from "@hapi/joi";

export interface IValidator<T> {
  objectId(): Joi.Schema;
  validateNew(object: T): Promise<T>;
  validateUpdate(object: T): Promise<T>;
}

export abstract class ValidatorBase<T> implements IValidator<T> {
  public objectId() {
    return Joi.string()
      .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, { name: "object id" })
      .trim();
  }

  public validateNew(object: T) {
    return this.validate(this.getNewSchema(), object);
  }

  public validateUpdate(object: T) {
    return this.validate(this.getUpdateSchema(), object);
  }

  private async validate(schema: Joi.Schema, object: T): Promise<T> {
    try {
      return await schema.validateAsync(object, {
        abortEarly: false
      });
    } catch (error) {
      const message = `${error.message}`;
      error.message = message.split(". ");
      throw error;
    }
  }

  protected abstract getNewSchema(): Joi.Schema;
  protected abstract getUpdateSchema(): Joi.Schema;
}
