import Helper from '@ember/component/helper';
import { stateColorMap } from 'open-event-frontend/utils/dictionary/sessions';

export function sessionColor(params) {
  switch (params[0]) {
    case 'accepted':
      return `${stateColorMap['accepted']}`;
    case 'pending':
      return `${stateColorMap['pending']}`;
    case 'confirmed':
      return `${stateColorMap['confirmed']}`;
    default:
      return 'red';
  }
}

export default Helper.helper(sessionColor);
