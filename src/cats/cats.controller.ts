import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  async createCat(@Body() cat: CreateCatDto) {
    return this.catService.create(cat);
  }

  @Get()
  async getAll(): Promise<Cat[]> {
    return this.catService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catService.delete(id);
  }
}
