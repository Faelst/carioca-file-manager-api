import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'
import { Module } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'

import { Exchanges } from './enums/exchange-name'
import { amqpConfig } from '../../common/config/amqp.config'

@Module({
  imports: [
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: (config: ConfigType<typeof amqpConfig>) => ({
        exchanges: [
          {
            name: Exchanges.FILE_MANAGER,
            type: 'topic',
          },
          {
            name: Exchanges.FILE_MANAGER_DLX,
            type: 'topic',
          },
        ],
        queues: [],
        uri: config.uri,
        enableControllerDiscovery: true,
      }),
      inject: [amqpConfig.KEY],
    }),
  ],
  providers: [],
  controllers: [],
  exports: [RabbitMQModule],
})
export class AmqpModule {}
