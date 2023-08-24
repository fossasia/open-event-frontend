import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function valueFieldLink(data) {
  let field = '';
  if(data){
    field = data;  
  }
  return htmlSafe(field);
}

export default helper(valueFieldLink);
