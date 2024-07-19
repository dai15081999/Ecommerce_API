import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';
@Injectable()
export class UsersService {
  constructor(@InjectRepository(UserEntity) private usersRepository: Repository<UserEntity>){}
  async signup(userSignup: UserSignupDto): Promise<UserEntity> {

    const userExist = await this.findUserByEmail(userSignup.email)
    if(userExist) throw new BadRequestException('Email is not available.')
    
    userSignup.password = await hash(userSignup.password, 10)
    let user = this.usersRepository.create(userSignup)

    user = await this.usersRepository.save(user)
    delete user.password
    return user
  }

  async signin(userSigninDto: UserSigninDto) {
    const userExists = await this.usersRepository.createQueryBuilder('users').addSelect('users.password')
      .where('users.email=:email', { email:userSigninDto.email}).getOne()
      if(!userExists) throw new BadRequestException('Bad creadentials.')
    const matchPassword = await compare(userSigninDto.password, userExists.password)
      if(!matchPassword) throw new BadRequestException('Bad creadentials.')
    delete userExists.password 
    return userExists
  }
 

  async findAll() {
    return await this.usersRepository.find()
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({id})
    if(!user) throw new NotFoundException('User not found.')
      return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email})
  }
  
  async accessToken(user: UserEntity) {
    return sign({id: user.id, email: user.email}, process.env.JSON_TOKEN_SERCRET, { expiresIn: process.env.JSON_TOKEN_EXPIRETIME})
  }
}
