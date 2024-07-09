import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersRepository } from "../users/users.repository";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { Users } from "src/entities/users.entity";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('Invalid credentials');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new BadRequestException('Invalid credentials');

    // Firmar token y generarlo
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload);

    return { 
      message: 'User logged in',
      token,
    };
  }

  async signUp(user: Partial<Users>) {
    const { email, password } = user;

    const foundUser = await this.usersRepository.getUserByEmail(email);

    if (foundUser) throw new BadRequestException('Registered Email');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.usersRepository.createUser({ ...user, password: hashedPassword });

    return { 
      message: 'User successfully registered', 
      user: newUser,
    };
  }
}