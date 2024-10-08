import { Type } from 'class-transformer';
import { IsNumber, IsPositive } from 'class-validator';

export class OrderItemDto {
  @IsNumber()
  @IsPositive()
  productId: number;
  @IsNumber()
  @IsPositive()
  quantity: number;
  @IsPositive()
  @IsNumber()
  @Type(()=>Number)
  price: number;
}
