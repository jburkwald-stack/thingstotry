import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FeedService {
  constructor(private prisma: PrismaService) {}

  async getFeed(page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where: { status: 'APPROVED' },
        include: {
          user: true,
          event: { include: { category: true } },
          _count: { select: { likes: true, comments: true } },
          comments: {
            include: { user: true },
            orderBy: { created_at: 'desc' },
            take: 3,
          },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.post.count({ where: { status: 'APPROVED' } }),
    ]);

    return {
      data: posts.map((p) => ({
        ...p,
        likes_count: p._count.likes,
        comments_count: p._count.comments,
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }
}
