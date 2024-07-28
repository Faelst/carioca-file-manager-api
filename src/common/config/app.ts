import { registerAs } from '@nestjs/config'

import { name, version } from '../../../package.json'

export const appConfig = registerAs('app', () => ({
  name,
  version,
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || '8080',
}))
