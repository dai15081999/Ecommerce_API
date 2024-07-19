import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class OrderedProductsDto {
  @IsNotEmpty({ message: 'Product can not be ' })
  id: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Price should be number & max decimal precission' },
  )
  @IsPositive({ message: 'Price can not be Negative.' })
  product_unit_price: number;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'Quantity should be number & max decimal precission' },
  )
  @IsPositive({ message: 'Quantity can not be Negative.' })
  product_quantity: number;
}
