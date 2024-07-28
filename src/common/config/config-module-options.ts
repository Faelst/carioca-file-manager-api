import { ConfigModuleOptions } from '@nestjs/config'

import { amqpConfig } from './amqp.config'
import { Environment } from '../enums/environment'
import { envValidationSchema } from '../validation/config-schema.validation'
import { appConfig } from './app'

const getEnvFilePath = (): string => {
  const env = process.env.NODE_ENV

  if (env === Environment.TEST) {
    return `.env.${Environment.TEST}`
  }

  return '.env'
}

export const configModuleOptions: ConfigModuleOptions = {
  isGlobal: true,
  load: [appConfig, amqpConfig],
  validationSchema: envValidationSchema,
  envFilePath: getEnvFilePath(), // Load environment-specific .env file
}
