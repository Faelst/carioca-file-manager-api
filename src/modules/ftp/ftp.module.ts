import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FtpService } from './ftp.service'

@Module({
  imports: [],
  providers: [
    ConfigService,
    FtpService,
    {
      provide: 'CONFIG_CONNECTION_OPTIONS',
      useFactory: (configService: ConfigService) => ({
        host: configService.get('FTP_HOST'),
        port: configService.get('FTP_PORT'),
        user: configService.get('FTP_USER'),
        password: configService.get('FTP_PASSWORD'),
        secureOptions: {
          passive: true,
          path: '/porno-carioca',
        },
        baseUrl: configService.get('FTP_BASE_URL'),
      }),
      inject: [ConfigService],
    },
  ],
  exports: [FtpService],
})
export class FtpModule {}
