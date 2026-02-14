import { Controller, Get, Query } from '@nestjs/common';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Get()
  async getFeed(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.feedService.getFeed(
      parseInt(page) || 1,
      parseInt(limit) || 20,
    );
  }
}
