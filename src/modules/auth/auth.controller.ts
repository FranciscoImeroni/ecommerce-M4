import { Body, Controller, Get, Post, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { ApiTags } from "@nestjs/swagger";
import { CreateUserDto } from "../users/user.dto";

@ApiTags('auth')
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin') 
    signIn(@Body() credentials:CreateUserDto){ 
        const {email, password}= credentials

        return this.authService.signIn(email,password)
    }

    @Post('signUp')
    signUp(@Body() user:CreateUserDto) {
        
        return this.authService.signUp(user);
    } 
}