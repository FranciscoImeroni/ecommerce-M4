import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/users.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(Users) private usersRepository: Repository<Users>,
    ) {}

    async getUsers(page: number, limit: number) {
        const skip = (page - 1) * limit;
        const users = await this.usersRepository.find({
            take: limit,
            skip: skip,
        });

        return users.map(({ password, confirmPassword, ...userNoPassword }) => userNoPassword);
    }

    async getUser(id: string) {
        const user = await this.usersRepository.findOne({
            where: { id },
            relations: ['orders'],
        });
        if (!user) {
            throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
        const { password, confirmPassword, ...userNoPassword } = user;

        return userNoPassword;
    }

    async createUser(user: Partial<Users>) {
        const newUser = await this.usersRepository.save(user);
        const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
        const { password, confirmPassword, ...userNoPassword } = dbUser;

        return userNoPassword;
    }

    async updateUser(id: string, user: Partial<Users>): Promise<Partial<Users>> {
        const updateData = { ...user };
        await this.usersRepository.update(id, updateData);
        const updatedUser = await this.usersRepository.findOneBy({ id });
        if (!updatedUser) {
            throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
        const { password, confirmPassword, ...userNoPassword } = updatedUser;

        return userNoPassword
    }

    async getUserByEmail(email: string) {
        return await this.usersRepository.findOneBy({ email });
    }

    async deleteUser(id: string): Promise<string> {
        const user = await this.usersRepository.findOneBy({ id }); 
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        await this.usersRepository.remove(user);
        return `User with id ${id} has been deleted`;
    }
}