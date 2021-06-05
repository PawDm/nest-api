import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import User from './entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ){}

    async findOne(username: string): Promise <User|undefined> {
        const user = await this.usersRepository.findOne({username})
        if(user){
            return user;
        }
        throw new HttpException('Такого пользователя не существует!', HttpStatus.NOT_FOUND)
    }

    async findAll(){
        return await this.usersRepository.find()
    }

    async create(userDate: CreateUserDto){
        const user = {...userDate,
        isAdmin: false}
        const newUser = await this.usersRepository.create(user);
        await this.usersRepository.save(newUser);
        const {password, isAdmin, ...result} = newUser
        return result;// тут спред
    }
}
