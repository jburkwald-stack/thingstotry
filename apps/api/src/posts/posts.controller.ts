import { Controller, Get, Param, Query } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.postsService.findAll(parseInt(page) || 1, parseInt(limit) || 20);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.postsService.findOne(id);
  }
}
