import { Controller, Get, Param, Query } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  async findAll(@Query() query: any) {
    return this.eventsService.findMany(query);
  }

  @Get('categories')
  async getCategories() {
    return this.eventsService.getCategories();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }
}
