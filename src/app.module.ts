import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AppController } from './app.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    imports: [ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "dev.env",
    })],
    useFactory: (configService: ConfigService): any => {
      console.log(configService.get('DBUSERNAME'))
      let dbType = 'postgres';
      let host = configService.get('HOST');
      let port = configService.get<number>('PORT');
      let username = configService.get('DBUSERNAME');
      // let username = "postgres";sdssdsd

      let password = configService.get('PASSWORD');
      let database = configService.get('DATABASE');
      let synchronize = configService.get<boolean>('SYNC');

      console.log(`Database Connection Details:`);
      console.log(`Database Type: ${dbType}`);
      console.log(`Host: ${host}`);
      console.log(`Port: ${port}`);
      console.log(`Username: ${username}`);
      console.log(`Password: ${password}`);
      console.log(`Database Name: ${database}`);
      console.log(`Synchronize: ${synchronize}`);

      return {
        type: dbType,
        host,
        port,
        username,
        password,
        database,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize,
        logging : true
      };
    },
    inject: [ConfigService],
  }), UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

