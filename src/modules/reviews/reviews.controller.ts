import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { ReviewEntity } from './entities/review.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guards';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guards';
import { Roles } from 'src/utility/common/user_roles.enum';

@Controller('reviews')
@ApiTags('Reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(AuthenticationGuard)
  @Post()
  async create(@Body() createReviewDto: CreateReviewDto, @CurrentUser() currentUser: UserEntity): Promise<ReviewEntity> {
    return await this.reviewsService.create(createReviewDto, currentUser);
  }
  
  @Get('/all')
  findAll() {
    return this.reviewsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ReviewEntity> {
    return await this.reviewsService.findOne(+id);
  }

  @Get()
  findAllByProduct(@Body('productId') productId: number): Promise<ReviewEntity[]> {
    return this.reviewsService.findAllByProduct(+productId); 
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewsService.update(+id, updateReviewDto);
  }

  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
