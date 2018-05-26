import { helper } from '@ember/component/helper';

export function fieldType(params) {
  if (params[0] === 'text' || params[0] === 'number' || params[0] === 'email') {
    return true;
  }
  return false;
}

export default helper(fieldType);
