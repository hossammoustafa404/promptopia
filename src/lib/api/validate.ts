import Joi from "joi";
import { BadRequest } from "./appErrors";

const validate = (target: object, schema: Joi.ObjectSchema<any>) => {
  const { error, value } = schema.validate(target, { abortEarly: false });

  if (error) {
    const msg = error.details.map((item) => item.message).join(", ");
    throw new BadRequest(msg);
  }

  return value;
};

export default validate;
