import Helper from '@ember/component/helper';

export function identifySocialLink(main_string, sub_string) {
  if (main_string.includes(sub_string)) {
    return true;
  } else {
    return  false;
  }
}
export default Helper.helper(identifySocialLink);
