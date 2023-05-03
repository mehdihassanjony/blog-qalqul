import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { Environment } from "src/common/enums";

@Injectable()
export class PostRedisCacheService {
  protected postActivityKey: string = "post:verify:";
  protected postExpiry: number = 1000;
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async setPostActivity(key: string): Promise<boolean> {
    await this.cacheManager.set(this.postActivityKey + key, true, 1000);
    return true;
  }

  async getPostActivity(key: string) {
    return await this.cacheManager.get(this.postActivityKey + key);
  }

  async del(key: string) {
    return await this.cacheManager.del(this.postActivityKey + key);
  }

  // ============= DECLAIMER: ONLY FOR TESTING PURPOSE ================ //
  async reset() {
    if (process.env.NODE_ENV !== Environment.TEST) return;

    return await this.cacheManager.reset();
  }
}
