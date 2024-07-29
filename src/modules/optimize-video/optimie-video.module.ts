import { Module } from '@nestjs/common'
import { OptimizeVideoService } from './optmize-video.service'
import { ConvertVideoToM3u8UseCase } from './use-case/convert-video-to-m3u8.usecase'
import { FtpModule } from '../ftp/ftp.module'

@Module({
  imports: [FtpModule],
  providers: [OptimizeVideoService, ConvertVideoToM3u8UseCase],
})
export class OptimizeVideoModule {}
