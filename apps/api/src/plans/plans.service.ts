import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class CreatePlanDto {
  title: string;
  description?: string;
}

@Injectable()
export class PlansService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [plans, total] = await Promise.all([
      this.prisma.plan.findMany({
        where: { is_public: true },
        include: {
          user: true,
          events: { include: { event: { include: { category: true } } } },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.plan.count({ where: { is_public: true } }),
    ]);
    return {
      data: plans.map((p) => ({
        ...p,
        events: p.events.map((pe) => pe.event),
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    const plan = await this.prisma.plan.findUnique({
      where: { id },
      include: {
        user: true,
        events: { include: { event: { include: { category: true } } } },
      },
    });
    if (!plan) return null;
    return { ...plan, events: plan.events.map((pe) => pe.event) };
  }
}
