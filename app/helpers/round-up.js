import Helper from '@ember/component/helper';
import { ceil } from 'lodash-es';

export function roundUp(params) {
  return ceil(params[0], 2);
}

export default Helper.helper(roundUp);
