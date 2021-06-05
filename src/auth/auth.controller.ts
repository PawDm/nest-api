import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ){}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req){
        console.log(req.user);

        return this.authService.login(req.user)
    }

    @Post('register')
    async register(@Body() registrationData: CreateUserDto){
        return this.authService.register(registrationData);
    }



}
