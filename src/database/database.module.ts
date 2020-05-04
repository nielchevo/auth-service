import { Module } from '@nestjs/common';

import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';

const typeormDbConfig = (configEnv: ConfigService): TypeOrmModuleOptions => {
  if (process.env.NODE_ENV == 'production') {
    return ({
      type: 'postgres',
      host: configEnv.get<string>('PROD_DB_HOST'),
      database: configEnv.get<string>('PROD_DB_DATABASE'),
      password: configEnv.get<string>('PROD_DB_PASSWORD'),
      username: configEnv.get<string>('PROD_DB_USER'),
      entities: ["dist/**/*.entity{.js, .ts}"],
      namingStrategy: new SnakeNamingStrategy(),
    })
  } else {
    // 'development'
    return ({
      type: 'postgres',
      host: configEnv.get<string>('DEV_DB_HOST'),
      database: configEnv.get<string>('DEV_DB_DATABASE'),
      password: configEnv.get<string>('DEV_DB_PASSWORD'),
      username: configEnv.get<string>('DEV_DB_USER'),
      entities: ["dist/**/*.entity{.js, .ts}"],
      namingStrategy: new SnakeNamingStrategy(),
      logging: 'all',
    })
  }
}

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configEnv: ConfigService) => {
      return typeormDbConfig(configEnv)
    }
  })],
  providers: [],
  exports: []
})
export class DatabaseModule { }
