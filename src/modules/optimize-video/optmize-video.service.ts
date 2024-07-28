import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Injectable, UseInterceptors } from '@nestjs/common'

import { convertVideoConfigSubscription } from './subscription-configs/convert-video.config'

@Injectable()
export class OptimizeVideoService {
  constructor() {}

  @UseInterceptors()
  @RabbitSubscribe(convertVideoConfigSubscription)
  public async eventJoinConsumer(message: any) {
    console.log('Message:', message)
  }
}
