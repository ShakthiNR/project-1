import Joi from "joi";

const secondaryVariantSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number().optional().min(0).max(100),
  inventory: Joi.number().required(),
});

const primaryVariantSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number().optional().min(0).max(100),
  inventory: Joi.number().required(),
  active: Joi.boolean().required(),
  secondaryVariants: Joi.array().items(secondaryVariantSchema).optional(),
});

export const productSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  discountPercentage: Joi.number().optional().min(0).max(100),
  inventory: Joi.string().required(),
  active: Joi.boolean().required(),
  leadTime: Joi.string().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.string().uri().required(),
  primaryVariantName: Joi.string().required(),
  secondaryVariantName: Joi.string().required(),
  primaryVariants: Joi.array().items(primaryVariantSchema).optional(),
});
