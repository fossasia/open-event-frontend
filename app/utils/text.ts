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

export const kebabCase = (string: string): string => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')    // get all lowercase letters that are near to uppercase ones
    .replace(/[\s_]+/g, '-')                // replace all spaces and low dash
    .toLowerCase()                          // convert to lower case
}

export const stringHashCode = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; ++i) {hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0}

  return hash
}

export const tn = {
  t: (str: string): string => str
}
