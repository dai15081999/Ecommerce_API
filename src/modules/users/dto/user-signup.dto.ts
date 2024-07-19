import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { UserSigninDto } from "./user-signin.dto";
import { ApiProperty } from "@nestjs/swagger";


export class UserSignupDto extends UserSigninDto {
    @ApiProperty()
    @IsNotEmpty({message: 'Name can not be null'})
    @IsString({ message: 'Name should be string'})
    name: string;

}