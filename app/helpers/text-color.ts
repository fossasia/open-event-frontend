import { getTextColor } from 'open-event-frontend/utils/color';
import Helper from '@ember/component/helper';

// inputs: bg color, dark color (chosen if bg is light), light color (chosen if bg is dark)
export default Helper.helper(function(params: string[]): string {
  const color = params[0];
  if (!color) {return '#000'}
  return getTextColor(color, params[1], params[2]);
});
