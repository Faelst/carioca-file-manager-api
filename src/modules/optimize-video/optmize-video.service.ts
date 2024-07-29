import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq'
import { Injectable } from '@nestjs/common'

import { convertVideoConfigSubscription } from './subscription-configs/convert-video.config'
import { ConvertVideoToM3u8UseCase } from './use-case/convert-video-to-m3u8.usecase'

@Injectable()
export class OptimizeVideoService {
  constructor(
    private readonly convertVideoToM3u8UseCase: ConvertVideoToM3u8UseCase,
  ) {}

  @RabbitSubscribe(convertVideoConfigSubscription)
  public async eventJoinConsumer(message: {
    remoteFilePath: string
    fileName: string
  }) {
    await this.convertVideoToM3u8UseCase.execute(message)
  }
}
