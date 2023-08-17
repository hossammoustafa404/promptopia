import Joi from "joi";
import { ObjectId } from "mongodb";

export const promptSchema: Joi.ObjectSchema<any> = Joi.object().keys({
  content: Joi.string().required(),
  category: Joi.string().required(),
  user: Joi.required()
    .custom((value, helpers) => {
      const isValidId = ObjectId.isValid(value);

      if (!isValidId) {
        return helpers.error("any.invalid");
      }

      return value;
    })
    .messages({ "any.invalid": "Invalid objectId for user" }), // How to validate mongodb id here?
});
