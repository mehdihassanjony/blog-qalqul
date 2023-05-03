import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CategoryDto } from 'src/models/category/category.dto';

import { CategoryService } from './category.service';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @Get('/count')
  async getCount() {
    try {
      return await this.service.getCount();
    } catch (err) {
      throw new HttpException(err, HttpStatus.NO_CONTENT);
    }
  }

  @Get()
  getAll(@Query('page') page: number, @Query('take') take: number) {
    try {
      return this.service.getCategories(page, take);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Get(':categoryId')
  async getOne(@Param('categoryId') catId: number) {
    try {
      return await this.service.getOneCategory(catId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() catDto: CategoryDto) {
    try {
      return await this.service.createCategory(catDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Put(':categoryId')
  @UseGuards(AuthGuard())
  async update(
    @Param('categoryId') categoryId: number,
    @Body() categoryDto: CategoryDto,
  ) {
    try {
      return await this.service.updateCategory(categoryId, categoryDto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_ACCEPTABLE);
    }
  }

  @Delete(':categoryId')
  @UseGuards(AuthGuard())
  async remove(@Param('categoryId') categoryId: number) {
    try {
      return await this.service.removeCategory(categoryId);
    } catch (err) {
      throw new HttpException(err, HttpStatus.NOT_FOUND);
    }
  }
}
