import { helper } from '@ember/component/helper';

export function lower(params: string[]) {
  return params[0]?.toLowerCase();
}

export default helper(lower);
