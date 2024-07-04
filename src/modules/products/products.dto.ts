import { IsNotEmpty, IsNumber, IsString, IsUrl } from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class ProductDto {

  @ApiHideProperty()
  id: string;

  @ApiHideProperty()
  createAt?: string;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'LG OLED 4k',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descripción del producto',
    example: '55-inch 4K OLED Smart TV',
  })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 1499.99,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({
    description: 'Stock del producto',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @ApiProperty({
    description: 'URL de la imagen del producto',
    example: 'https://images.lg.com/us/tvs/gallery/OLED55CXPUA/lg-oled55cxpua-gallery-1.jpg',
  })
  @IsNotEmpty()
  @IsUrl()
  imgUrl: string;

  @ApiProperty({
    description: 'ID de la categoría del producto',
    example: 'uuid_de_la_categoria',
  })
  @IsNotEmpty()
  @IsString()
  category: string;
}
