import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.services";
import { AuthGuard } from "../auth/guards/auth.guard";
import { CreateUserDto } from "./user.dto";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "./roles.enum";
import { RolesGuard } from "../auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('users')
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiBearerAuth()
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard) 
    getUsers(@Query('page') page: string, @Query('limit') limit: string) {
        if(page&&limit) {
        return this.usersService.getUsers(Number(page), Number(limit));
        }
        return this.usersService.getUsers(1,5);
    }

    @ApiBearerAuth()
    @Get(':id')
    @UseGuards(AuthGuard)
    getUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.getUser(id);
    }

    @ApiBearerAuth()
    @Put(':id')
    @UseGuards(AuthGuard)
    updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: CreateUserDto) {
        return this.usersService.updateUser(id, user);
    }

    @ApiBearerAuth()
    @Delete(':id')
    @UseGuards(AuthGuard) 
    deleteUser(@Param('id', ParseUUIDPipe) id: string) {
        return this.usersService.deleteUser(id);
    }
}