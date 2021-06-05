import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
        ){}

    async validateUser(username: string, pass: string): Promise<any>{
        const user = await this.usersService.findOne(username);
        await this.verifyPassword(pass,user.password)

        if(user){
            const{password, ...result} = user;
            return result;
        }
        throw new HttpException('Такого пользователя не существует!', HttpStatus.NOT_FOUND)
    }

    async login(user: any){
        const payload = { username: user.username, userId: user.id, admin: user.isAdmin};
        return{
            access_token: this.jwtService.sign(payload)
        }
    }

    async register(registrationData: CreateUserDto){
        const hashedPassword = await bcrypt.hash(registrationData.password, 10);
        try{
            const createdUser = await this.usersService.create(
                {...registrationData,
                    password: hashedPassword}
                );
            return createdUser;
        }catch(error){

        }
        throw new HttpException('Что-то пошло не так', HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private async verifyPassword(plainTextPassword: string, hashedPassword: string){
        const isPasswordMatching = await bcrypt.compare(plainTextPassword,hashedPassword);
        if(!isPasswordMatching){
            throw new HttpException('Не верно указан логин или пароль', HttpStatus.BAD_REQUEST);
        }
    }
}
