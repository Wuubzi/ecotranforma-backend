import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';
import { CacheDTO } from './dto/cacheDTO';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async saveToCache(data: CacheDTO) {
    await this.cacheManager.set(data.clave, data.valor, 300000);
  }

  async getFromCache(clave: string) {
    const valor = await this.cacheManager.get(clave);
    return valor;
  }

  async deleteFromCache(clave: string) {
    await this.cacheManager.del(clave);
  }
}
