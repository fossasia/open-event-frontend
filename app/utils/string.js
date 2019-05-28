import { camelCase } from 'lodash-es';

export const pascalCase = string => {
  string = camelCase(string);
  return string.charAt(0).toUpperCase() + string.slice(1);
};
