
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import {FileModule } from 'src/file/file.module'
import { configModule } from 'configure.root';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    FileModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_POST),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'img'),
    }),
    configModule,
  ],
})
export class AppModule {}
