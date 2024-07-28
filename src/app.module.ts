import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { configModuleOptions } from './common/config/config-module-options'
import { AmqpModule } from './modules/amqp/amqp.module'
import { OptimizeVideoModule } from './modules/optimize-video/optimie-video.module'

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    AmqpModule,
    OptimizeVideoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
