import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatsService } from '../cats/cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './schemas/cat.schema';

@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Post()
  async createCat(@Body() cat: CreateCatDto) {
    console.log('body: ', cat);
    return this.catService.create(cat);
  }

  @Get()
  async getAll(): Promise<Cat[]> {
    return this.catService.getAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    console.log('id: ', id);
    return this.catService.findCat(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log('id: ', id);
    return this.catService.delete(id);
  }
}
