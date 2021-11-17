import Helper from '@ember/component/helper';

export function convertToNormalString(params/* , hash*/) {
  const [camelCase] = params;

  // Adds a space before the capital letters
  const result = camelCase.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);

  return finalResult;
}

export default Helper.helper(convertToNormalString);
