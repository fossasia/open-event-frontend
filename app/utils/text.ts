export function slugify(string: string, sep = '-'): string {
  return string.toLowerCase()
    .replace(/[^\w\s-]/g, '') // remove non-word [a-z0-9_], non-whitespace, non-hyphen characters
    .replace(/[\s_-]+/g, sep) // swap any length of whitespace, underscore, hyphen characters with a single -
    .replace(/^-+|-+$/g, ''); // remove leading, trailing -
}

interface EmberObject {
  get(key: string): string
}

export function matchPropertyIn(obj: EmberObject, filter: string, properties: string[]): boolean {
  filter = filter.toLowerCase();
  for (const property of properties) {
    if (obj.get(property).toLowerCase().includes(filter)) {return true}
  }

  return false;
}
