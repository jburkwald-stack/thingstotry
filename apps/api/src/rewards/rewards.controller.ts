import { Controller, Get } from '@nestjs/common';
import { RewardsService } from './rewards.service';

@Controller('rewards')
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

  @Get('catalog')
  async getCatalog() {
    return this.rewardsService.getCatalog();
  }
}
