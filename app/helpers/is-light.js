import { isLight } from 'open-event-frontend/utils/color';
import Helper from '@ember/component/helper';

export function textColor(color) {
  return isLight(color) ? '#000' : '#fff';
}
export default Helper.helper(textColor);
