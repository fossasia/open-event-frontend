import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function richTextLink(data) {
  let fieldName = data[0];
  if (data[1]) {
    fieldName += ` - ${data[1]}`;
  }
  if (data[2]) {
    fieldName += '<div class="ui icon d-inline" data-tooltip="Custom Field"><i class="info icon"></i></div>';
  }
  return htmlSafe(`<span>${fieldName}</span>`);
}

export default helper(richTextLink);
