import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Environment } from '../../common/enums';

@Injectable()
export class RedisCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async set(key: string, value: any, ttl: number) {
    await this.cacheManager.set(key, value, {ttl});
    return true;
  }

  async get(key: string) {    
    return await this.cacheManager.get(key);
  }

  async del(key: string) {
    return await this.cacheManager.del(key);
  }

  // ============= DECLAIMER: ONLY FOR TESTING PURPOSE ================ //
  async reset() {
    if (process.env.NODE_ENV !== Environment.TEST) return;

    return await this.cacheManager.reset();
  }
}
