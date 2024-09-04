import * as Joi from "@hapi/joi";

export const configValidationSchema = Joi.object({
  DATASOURCE_USERNAME: Joi.string().required(),
  DATASOURCE_PASSWORD: Joi.string().required(),
  DATASOURCE_DATABASE: Joi.string().required(),
  DATASOURCE_HOST: Joi.string().required(),
  DATASOURCE_PORT: Joi.number().default(5432),
  DATASOURCE_SYNC: Joi.boolean().default(true),
});
