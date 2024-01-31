import { isString, isArray, isObjectLike, isNumber } from 'lodash-es';

/**
 * A recursive method to parse and retrieve an error string from a BE response
 * Since the BE seems to be having different response format for errors in
 * different endpoints
 *
 * Usage: import { getErrorMessage } from 'open-event-frontend/utils/errors';
 *
 * @param input {any}
 * @param defaultError {string}
 * @param attempt
 */
export const getErrorMessage = (input, defaultError = 'Unable to load data', attempt = 1) => {
  try {
    if (!input) {
      return defaultError;
    }
    if (attempt > 2) {
      return JSON.stringify(input);
    }
    if (isString(input) || isNumber(input)) {
      let error = input;
      try {
        error = JSON.parse(input);
      } catch (ignored) { /* ignored */ }
      if (isString(error) || isNumber(isNumber)) {
        return error;
      }
      return getErrorMessage(error, ++attempt);
    }

    if (!isArray(input) && isObjectLike(input)) {
      input = input.error ? input.error : (input.message ? input.message : (input.messages ? input.messages : input));
    } else if (isArray(input)) {
      return input.join('. ');
    }

    return getErrorMessage(input, ++attempt);
  } catch (e) {
    console.warn('utils/errors.getErrorMessage', e);
    return defaultError;
  }
};
