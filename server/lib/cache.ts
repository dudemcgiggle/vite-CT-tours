// server/lib/cache.ts
const store = new Map<string, { value: any; expires: number }>();

export function set(key: string, value: any, ttlMs = 60000): void {
  const expires = Date.now() + ttlMs;
  store.set(key, { value, expires });
}

export function get(key: string): any {
  const hit = store.get(key);
  if (!hit) return null;
  if (Date.now() > hit.expires) {
    store.delete(key);
    return null;
  }
  return hit.value;
}

export function del(key: string): void {
  store.delete(key);
}