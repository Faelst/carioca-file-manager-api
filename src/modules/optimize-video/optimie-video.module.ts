import { Module } from '@nestjs/common'
import { OptimizeVideoService } from './optmize-video.service'

@Module({
  imports: [],
  providers: [OptimizeVideoService],
})
export class OptimizeVideoModule {}
