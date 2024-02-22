import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { Nuser } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService { 
            //the(Nuser) and <Nuser> is coming from user.entity.ts
  constructor(@InjectRepository(Nuser) private readonly userepo : Repository<Nuser>){
    console.log(Nuser) //output [class Nuser]
    console.log("Class name: ",Nuser.name) //output Class name:  Nuser



  }
  findOne(fid : any){
    return this.userepo.findOne({
      where:{
        id : fid
      }})
  }

   create(createUserDto: CreateUserDto) : Promise<Nuser>{

    //here also User and User() is coming from user.entity.ts
    let user : Nuser = new Nuser()
    user.firstname = createUserDto.firstname
    user.lastname = createUserDto.lastname
    user.age = createUserDto.age

    return  this.userepo.save(user)
  }

  findAll(): Promise<Nuser[]> {
    return this.userepo.find()
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    let user : Nuser = new Nuser()
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
