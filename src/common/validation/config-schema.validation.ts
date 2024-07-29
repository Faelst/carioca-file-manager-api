import * as Joi from 'joi'

export const envValidationSchema = Joi.object({
  NODE_ENV: Joi.required(),
  AMQP_URI: Joi.required(),
  FTP_HOST: Joi.required(),
  FTP_PORT: Joi.required(),
  FTP_USER: Joi.required(),
  FTP_PASSWORD: Joi.required(),
  FTP_BASE_URL: Joi.required(),
  LOCAL_VIDEO_UPLOADS_PATH: Joi.required(),
})
