import { Inject, Injectable } from '@nestjs/common'
import { Client, FileInfo, FTPResponse, UploadOptions } from 'basic-ftp'
import { Readable, Writable } from 'stream'
import { IConnectionOptions } from './ftp.interfaces'

@Injectable()
export class FtpService {
  private readonly ftpClient: Client
  constructor(
    @Inject('CONFIG_CONNECTION_OPTIONS')
    private readonly options: IConnectionOptions,
  ) {
    this.ftpClient = new Client()
    this.ftpClient.ftp.verbose = false
  }

  async list(path?: string): Promise<FileInfo[]> {
    try {
      await this.ftpClient.access(this.options)
      return await this.ftpClient.list(path)
    } catch (err) {
      this.ftpClient.close()
      throw err
    } finally {
      this.ftpClient.close()
    }
  }

  async downloadTo(
    destination: Writable | string,
    fromRemotePath: string,
    startAt?: number,
  ): Promise<FTPResponse> {
    try {
      await this.ftpClient.access(this.options)
      return await this.ftpClient.downloadTo(
        destination,
        fromRemotePath,
        startAt,
      )
    } catch (err) {
      this.ftpClient.close()
      throw err
    } finally {
      this.ftpClient.close()
    }
  }

  async upload(
    source: Readable | string,
    dir: string,
    fileName: string,
    options?: UploadOptions,
  ): Promise<void> {
    await this.ftpClient.access(this.options)

    await this.ftpClient.ensureDir(dir)

    await this.ftpClient.uploadFrom(source, `${dir}/${fileName}`, options)
  }

  async delete(fileRemotePath: string): Promise<void> {
    await this.ftpClient.access(this.options)

    await this.ftpClient.remove(fileRemotePath)
  }

  async size(fileRemotePath: string): Promise<number> {
    try {
      await this.ftpClient.access(this.options)
      return await this.ftpClient.size(fileRemotePath)
    } catch (err) {
      this.ftpClient.close()
      throw err
    } finally {
      this.ftpClient.close()
    }
  }

  getPublicUrl(filePath: string): string {
    return `${this.options.baseUrl}${filePath}`
  }
}
