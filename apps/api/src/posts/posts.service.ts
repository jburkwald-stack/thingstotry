import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export class CreatePostDto {
  caption: string;
  image_url: string;
  event_id?: string;
}

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAll(page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [posts, total] = await Promise.all([
      this.prisma.post.findMany({
        where: { status: 'APPROVED' },
        include: {
          user: true,
          event: { include: { category: true } },
          _count: { select: { likes: true, comments: true } },
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.post.count({ where: { status: 'APPROVED' } }),
    ]);
    return {
      data: posts.map((p) => ({ ...p, likes_count: p._count.likes, comments_count: p._count.comments })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    };
  }

  async findOne(id: string) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        event: { include: { category: true } },
        _count: { select: { likes: true, comments: true } },
        comments: { include: { user: true }, orderBy: { created_at: 'desc' } },
      },
    });
  }
}
