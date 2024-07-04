import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { ApiHideProperty, ApiProperty, PartialType } from '@nestjs/swagger';
import { MatchPassword } from "src/decorators/matchPassword.decorators";

export class CreateUserDto {
    @ApiHideProperty()
    id: string;

    @ApiHideProperty()
    createAt?: string;

    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Blacky'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name: string;

    @ApiProperty({
        description: 'Correo electrónico del usuario',
        example: 'james@example.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Contraseña del usuario',
        example: 'StrongPass1!'
    })
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/, {
        message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*).',
    })
    @MinLength(8)
    @MaxLength(15)
    password: string;

    @ApiProperty({
        description: 'Confirmación de la contraseña del usuario',
        example: 'StrongPass1!'
    })
    @IsNotEmpty()
    @Validate(MatchPassword, ['password'])
    confirmPassword: string;

    @ApiProperty({
        description: 'Dirección del usuario',
        example: '123 Main St, Springfield'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string;

    @ApiProperty({
        description: 'Número de teléfono del usuario',
        example: '1234567890'
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @ApiProperty({
        description: 'País del usuario',
        example: 'Argentina'
    })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country: string;

    @ApiProperty({
        description: 'Ciudad del usuario',
        example: 'Springfield'
    })
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city: string;

    @ApiProperty({
        description: 'Indica si el usuario es administrador',
        example: false
    })
    @IsOptional()
    @IsBoolean()
    isAdmin?: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiHideProperty()
  confirmPassword?: string; // Asegúrate de que confirmPassword no esté incluido 
}