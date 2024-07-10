import { IsEmail, IsNotEmpty, MinLength } from "class-validator";


export class UserSigninDto {

    @IsNotEmpty({message: 'Email can not be empty.'})
    @IsEmail({}, {message: 'Please provide a valid email'})
    email: string;

    @IsNotEmpty({message: 'Password can not be empty.'})
    @MinLength(5, { message: 'Password minium character should be 5.'})
    password: string;
}