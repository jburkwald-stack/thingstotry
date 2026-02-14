import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RewardsService {
  constructor(private prisma: PrismaService) {}

  async getCatalog() {
    return this.prisma.rewardCatalog.findMany({
      where: { enabled: true },
      orderBy: { cost_points: 'asc' },
    });
  }
}
