import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private plansService: PlansService) {}

  @Get()
  async findAll(@Query('page') page?: string, @Query('limit') limit?: string) {
    return this.plansService.findAll(parseInt(page) || 1, parseInt(limit) || 20);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.plansService.findOne(id);
  }
}
