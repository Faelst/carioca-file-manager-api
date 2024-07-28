import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as ffmpeg from 'fluent-ffmpeg'
import * as path from 'path'
import * as fs from 'fs'

import { FtpService } from '../../ftp/ftp.service'

@Injectable()
export class ConvertVideoToM3u8 {
  constructor(
    private readonly ftpService: FtpService,
    private readonly configService: ConfigService,
  ) {}

  async execute(remoteFilePath: string) {
    const outputDir = this.configService.getOrThrow('LOCAL_UPLOADS_PATH')

    const localInputPath = path.join(outputDir, path.basename(remoteFilePath))

    const localOutputPath = path.join(outputDir, outputFileName)

    await this.ftpService.downloadTo(localInputPath, remoteFilePath)

    return new Promise((resolve, reject) => {
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      ffmpeg(localInputPath)
        .outputOptions([
          '-codec: copy',
          '-start_number 0',
          '-hls_time 10',
          '-hls_list_size 0',
          '-f hls',
        ])
        .output(localOutputPath)
        .on('end', async () => {
          try {
            await this.ftpService.upload(
              localOutputPath,
              path.dirname(remoteFilePath),
              outputFileName,
            )

            resolve(
              `File has been converted successfully and saved to ${localOutputPath}`,
            )
          } catch (err) {
            reject(`Failed to upload file: ${err.message}`)
          }
        })
        .on('error', (err) => {
          reject(`Error: ${err.message}`)
        })
        .run()
    })
  }
}
