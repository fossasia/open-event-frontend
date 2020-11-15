import { helper } from '@ember/component/helper';

export function isSubstring(params) {
  const [shortString, longString] = params;
  if (longString === undefined || longString === '' || longString === null) {
    return false;
  }

  return longString.includes(shortString);
}

export default helper(isSubstring);
