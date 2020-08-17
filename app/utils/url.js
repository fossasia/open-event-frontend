import UrlParser from 'url-parse';
import queryString from 'query-string';
import { merge, mapValues, isArray } from 'lodash-es';

/**
 * Build a URL with query string
 *
 * @param baseUrl
 * @param queryParams - An object with query params
 * @param stringifyArray - Should an array be converted to csv
 * @return {string}
 */
export const buildUrlViaUrlParse = (baseUrl, queryParams, stringifyArray = false) => {
  const parsedUrl = new UrlParser(baseUrl, true);
  if (stringifyArray) {
    queryParams = mapValues(queryParams, value => {
      if (isArray(value)) {
        return value.join(',');
      }
      return value;
    });
  }
  parsedUrl.set('query', merge(parsedUrl.query, queryParams));
  return parsedUrl.toString();
};

/**
 * Build a URL with query string
 *
 * @param baseUrl
 * @param queryParams - An object with query params
 * @param stringifyArray - Should an array be converted to csv
 * @return {string}
 */
export const buildUrlViaQueryString = (baseUrl, queryParams, stringifyArray = false) => {
  const parsedUrl = queryString.parseUrl(baseUrl, { arrayFormat: 'bracket' });
  if (stringifyArray) {
    queryParams = mapValues(queryParams, value => {
      if (isArray(value)) {
        return value.join(',');
      }
      return value;
    });
  }
  // eslint-disable-next-line prefer-template
  return parsedUrl.url + '?' + queryString.stringify(merge(parsedUrl.query, queryParams), { arrayFormat: 'bracket' });
};

export const buildUrl = buildUrlViaQueryString;
