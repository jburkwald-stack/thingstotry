import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { FeedModule } from './feed/feed.module';
import { EventsModule } from './events/events.module';
import { PostsModule } from './posts/posts.module';
import { PlansModule } from './plans/plans.module';
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    FeedModule,
    EventsModule,
    PostsModule,
    PlansModule,
    RewardsModule,
  ],
})
export class AppModule {}
