import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  async findMany(filters: any = {}) {
    const { page = 1, limit = 20, category, search, difficulty, is_free } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};
    if (category) where.category = { slug: category };
    if (difficulty) where.difficulty = difficulty;
    if (is_free !== undefined) where.is_free = is_free === 'true' || is_free === true;
    if (search) where.title = { contains: search };

    const [events, total] = await Promise.all([
      this.prisma.event.findMany({
        where,
        include: { category: true, _count: { select: { posts: true } } },
        orderBy: { start_datetime: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.event.count({ where }),
    ]);

    return {
      data: events,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        category: true,
        posts: {
          where: { status: 'APPROVED' },
          include: { user: true, _count: { select: { likes: true } } },
          take: 10,
          orderBy: { created_at: 'desc' },
        },
      },
    });
  }

  async getCategories() {
    return this.prisma.category.findMany({
      include: { _count: { select: { events: true } } },
      orderBy: { name: 'asc' },
    });
  }
}
