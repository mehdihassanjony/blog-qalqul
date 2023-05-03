import { CacheModule, Module } from "@nestjs/common";
import { RedisCacheService } from "./redis.service";
import * as redisStore from "cache-manager-redis-store";
import config from "../../config/configuration";
import { PostRedisCacheService } from "./post.cache.service";

@Module({
  imports: [
    CacheModule.register({
      store: redisStore,
      ...config().redis,
    }),
  ],
  providers: [RedisCacheService, PostRedisCacheService],
  exports: [RedisCacheService, PostRedisCacheService],
})
export class RedisCacheModule {}
