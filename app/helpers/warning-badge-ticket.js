import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function warningBadgeTicket(data) {
  let field = '';
  let fieldName = '';

  if (data[0]) {
    field = `'${data[0]}' is not available in ticket`;
  }

  if (data[1]) {
    fieldName = `${field} '${data[1]}'`;
  }

  return htmlSafe(`<span>${fieldName}</span>`);
}

export default helper(warningBadgeTicket);
