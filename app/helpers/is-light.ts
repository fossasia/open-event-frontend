import { isLight } from 'open-event-frontend/utils/color';
import Helper from '@ember/component/helper';

export default Helper.helper(function(params: string[]): string {
  const color = params[0];
  return isLight(color) ? params[1] || '#000' : params[2] || '#fff';
});
