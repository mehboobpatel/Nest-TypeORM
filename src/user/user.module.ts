import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nuser } from './entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([Nuser])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
