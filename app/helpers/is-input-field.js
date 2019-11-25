import { helper } from '@ember/component/helper';

export const isInputField = params => params[0] === 'text' || params[0] === 'number' || params[0] === 'email' || params[0] === 'select';

export default helper(isInputField);
