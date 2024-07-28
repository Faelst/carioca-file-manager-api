import { Channel, ConsumeMessage } from 'amqplib'
import { Exchanges } from '../../amqp/enums/exchange-name'
import { Queue } from '../../amqp/enums/queue'
import { RoutingKey } from '../../amqp/enums/routing-keys'

export const convertVideoConfigSubscription = {
  exchange: Exchanges.FILE_MANAGER,
  routingKey: RoutingKey.OPTIMIZE_VIDEO,
  queue: Queue.OPTIMIZE_VIDEO_QUEUE,
  queueOptions: {
    messageTtl: 5000,
    arguments: {
      'x-dead-letter-exchange': Exchanges.FILE_MANAGER_DLX,
    },
  },
  errorHandler: (channel: Channel, msg: ConsumeMessage, error: any) => {
    console.log('Error:', error)
    channel.reject(msg, false)
  },
}
