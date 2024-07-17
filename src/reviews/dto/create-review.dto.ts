import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateReviewDto {
    @ApiProperty()
    @IsNotEmpty({ message: 'Product should not be empty.'})
    @IsNumber({}, { message: 'Product Id should be string'})
    productId: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'ratings could not be empty '})
    @IsNumber()
    ratings: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'comment should not be empty '})
    @IsString()
    comment: string
}
