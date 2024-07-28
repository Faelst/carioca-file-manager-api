import { registerAs } from '@nestjs/config'

export const amqpConfig = registerAs('amqp', () => ({
  uri: process.env.AMQP_URI || 'amqps://guest:guest@localhost:5672',
}))
