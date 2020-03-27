import Joi from "@hapi/joi";
import { ValidatorBase } from ".";
import { Validator } from "..";

@Validator()
export class ObjectIdValidator extends ValidatorBase {
  public getNewSchema(): Joi.Schema {
    return this.objectId();
  }

  public getUpdateSchema(): Joi.Schema {
    throw new Error("Method not implemented.");
  }
}
