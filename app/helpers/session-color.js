import Helper from '@ember/component/helper';
import { stateColorMap } from 'open-event-frontend/utils/dictionary/sessions';

export function sessionColor(params) {
  return stateColorMap[params[0]];
}

export default Helper.helper(sessionColor);
