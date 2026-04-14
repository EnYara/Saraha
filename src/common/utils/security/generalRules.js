import Joi from "joi";
import mongoose, { Types } from "mongoose";

const  customId= (v, h) => {
  const isValid = Types.ObjectId.isValid(v); 
    return isValid ? v : h.message("id is not valid");
  }

export const general_rules = {
  email: Joi.string().email({tlds: { allow: true },maxDomainSegments: 2,maxDomainSegments: 2}),
  password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
  cPassword: Joi.string().valid(Joi.ref("password")),

  id: Joi.string().custom(customId),

  file: Joi.object({
    fieldname:Joi.string().required(), 
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    path: Joi.string().required(),
    size: Joi.number().required(),
  }).messages({
    "any.required": "file is required",
  }),
};
