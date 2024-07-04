import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    getUsers(page: number, limit: number) {
        return this.usersRepository.getUsers(page, limit);
    }

    getUser(id: string) {
        return this.usersRepository.getUser(id);
    }

    updateUser(id: string, user: any) {
        return this.usersRepository.updateUser(id, user);
    }

    async deleteUser(id: string) {
        const user = await this.usersRepository.deleteUser(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return `User with id ${id} has been deleted`;
    }
}
 