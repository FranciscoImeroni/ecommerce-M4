import { Module } from "@nestjs/common";
import { AuthService } from "./auth.services";
import { AuthController } from "./auth.controller";
import { UsersRepository } from "../users/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Users])],
    providers: [AuthService, UsersRepository],
    controllers: [AuthController],
})

export class AuthModule {}