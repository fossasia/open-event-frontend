/* eslint-disable no-console, prefer-rest-params */
import Service, { inject as service } from '@ember/service';
import DS from 'ember-data';

function pushToStore(store: DS.Store, data: any): any[] | any {
  const parsed = data?.value;
  if (Array.isArray(parsed)) {
    const items = []
    for (const item of parsed) {
      store.pushPayload(item);
      items.push(store.peekRecord(item.data.type, item.data.id));
    }
    return items;
  } else {
    store.pushPayload(parsed);

    return store.peekRecord(parsed.data.type, parsed.data.id);
  }
}

function saveToStorage(key: string, value: any | null) {
  if (!value) {return}
  let serialized = null;
  const options = { includeId: true, includeReadOnly: true };
  if (Array.isArray(value.content)) {
    serialized = value.map((v: any) => v.serialize(options));
  } else {
    serialized = value.serialize(options);
  }

  localStorage.setItem(key, JSON.stringify({
    time  : Date.now(),
    value : serialized
  }));
}

export default class Cache extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  version = 'v1';

  @service store!: DS.Store;

  get prefix(): string {
    return 'cache:' + this.version + ':';
  }

  isExpired(data: { time: number, value: any} | null): boolean {
    // Item expired after 15 seconds
    return Boolean(data?.time && (Date.now() - data?.time) > 60 * 1000)
  }

  async passThrough(key: string, callable: () => any): Promise<any> {
    const value = await callable();
    saveToStorage(key, value);

    return value;
  }

  async cacheData(key: string, callable: () => any): Promise<any | null> {
    key = this.prefix + key;
    const stored = localStorage.getItem(key);
    try {
      if (stored) {
        const data = JSON.parse(stored);

        if (!data.time) {
          // Invalid data structure
          return this.passThrough(key, callable);
        }

        const expired = this.isExpired(data);
        const item = pushToStore(this.store, data);

        if (expired) {
          // Revalidate resource while serving stale
          console.info('Item expired. Revalidating...', key);
          this.passThrough(key, callable);
        }

        return item;
      } else {
        return this.passThrough(key, callable);
      }
    } catch (e) {
      console.error('Error while loading value from cache using key: ' + key, e);

      return callable();
    }
  }

  async findAll(model: string, options: any | null): Promise<any> {
    const saved = await this.cacheData(model, () => this.store.findAll(model, { cache: true, ...options }));
    if (saved) {return saved;}
    return this.store.peekAll(model);
  }

  async findRecord(key: string, model: string, id: string | number, options: any | null): Promise<any> {
    const saved = await this.cacheData(key, () => this.store.findRecord(model, id, options));
    if (saved) {return saved;}
    return this.store.peekRecord(model, id);
  }

  async queryRecord(key: string, model: string, options: any | null): Promise<any> {
    const saved = await this.cacheData(key, () => this.store.queryRecord(model, { cache: true, ...options }));
    if (saved) {return saved;}
    return this.store.peekRecord(model, 1);
  }

  async query(key: string, model: string, options: any | null): Promise<any> {
    options = { cache: true, ...options };
    const saved = await this.cacheData(key, () => this.store.query(model, options));
    if (saved) {return saved;}
    return this.store.query(model, options);
  }

  clear(): void {
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith(this.prefix)) {
        console.info('Clearing cache entry:', key);
        localStorage.removeItem(key);
      }
    }
  }

  constructor() {
    super(...arguments);
    for (const key of Object.keys(localStorage)) {
      if (key.startsWith('cache:')) {
        if (!key.startsWith(this.prefix)) {
          console.info('Removing previous cache entry:', key);
          localStorage.removeItem(key);
        }
      }
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'cache': Cache;
  }
}
