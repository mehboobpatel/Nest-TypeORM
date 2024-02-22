import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService { 
            //the(User) and <User> is coming from user.entity.ts
  constructor(@InjectRepository(User) private readonly userepo : Repository<User>){

  }
  findOne(fid : any){
    return this.userepo.findOne({
      where:{
        id : fid
      }})
  }

   create(createUserDto: CreateUserDto) : Promise<User>{

    //here also User and User() is coming from user.entity.ts
    let user : User = new User()
    user.firstname = createUserDto.firstname
    user.lastname = createUserDto.lastname
    user.age = createUserDto.age

    return  this.userepo.save(user)
  }

  findAll(): Promise<User[]> {
    return this.userepo.find()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user : User = new User()
    user.firstname = updateUserDto.firstname
    user.lastname = updateUserDto.lastname
    user.age = updateUserDto.age
    user.id = id;

    return  this.userepo.save(user)
  }

  remove(id: number) {
    return  this.userepo.delete(id)
  }
}
