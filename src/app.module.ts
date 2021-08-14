import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CarouselsModule } from './carousels/carousels.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', '172.29.189.251'),
        port: Number(configService.get('DB_PORT', 5432)),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', 'docker'),
        database: configService.get('DB_DATABASE', 'postgres'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true
      }),
    }),
    AuthModule,
    CarouselsModule,
    ImagesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
