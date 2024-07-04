import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from "class-validator";
import { Products } from "src/entities/products.entity";

export class CreateOrderDto {
  /**
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  /**
   * @example {
	"userId":"d0e5c864-1279-4288-9a32-03589f1d378c",
	
	"products": [
		{
			"id": "7a30d3fe-68b4-4fb5-a916-5a6105771bfc"
		},
		{
			"id":"bac533fa-dd50-4e19-a924-b1fb801f8eab"
		}
	]
}
   */
  @IsArray()
  @ArrayMinSize(1)
  products: Partial<Products[]>;
}
