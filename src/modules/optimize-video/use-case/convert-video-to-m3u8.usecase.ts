import { Injectable } from '@nestjs/common'
import * as ffmpeg from 'fluent-ffmpeg'
import * as path from 'path'
import * as fs from 'fs'

import { FtpService } from '../../ftp/ftp.service'

@Injectable()
export class ConvertVideoToM3u8UseCase {
  private basePath: string

  constructor(private readonly ftpService: FtpService) {
    this.basePath = path.resolve(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      '..',
      'uploads',
      'videos',
    )
  }

  async execute({
    remoteFilePath,
    fileName,
  }: {
    remoteFilePath: string
    fileName: string
  }) {
    const localInputPath = path.join(this.basePath, fileName)

    const outputFileName = `${fileName.split('.')[0]}.m3u8`

    const localOutputPath = path.join(this.basePath, outputFileName)

    await this.ftpService.downloadTo(localInputPath, remoteFilePath)

    return new Promise((resolve, reject) => {
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

            await this.ftpService.delete(remoteFilePath)

            fs.readdirSync(this.basePath).forEach((file) => {
              if (file.includes(fileName.split('.')[0])) {
                fs.unlinkSync(path.join(this.basePath, file))
              }
            })

            resolve(
              `File has been converted successfully and saved to ${localOutputPath}`,
            )
          } catch (err) {
            console.log(err)
            reject(`Failed to upload file: ${err}`)
          }
        })
        .on('error', (err) => {
          console.log(err)
          reject(`Error: ${err.message}`)
        })
        .run()
    })
  }
}
