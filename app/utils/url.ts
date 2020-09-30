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
export const buildUrlViaUrlParse = (baseUrl: string, queryParams: { [key: string]: string }, stringifyArray = false): string => {
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
export const buildUrlViaQueryString = (baseUrl: string, queryParams: { [key: string]: string }, stringifyArray = false): string => {
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

export function extractYoutubeUrl(url: string | null): string | null | undefined {
  if (!url) {return null}
  const parsedUrl = new UrlParser(url, true);
  if (['youtube.com', 'www.youtube.com'].includes(parsedUrl.hostname)) {
    return parsedUrl.query?.v;
  } else if (['youtu.be', 'www.youtu.be'].includes(parsedUrl.hostname)) {
    return parsedUrl.pathname.split('/')[1];
  }
  return null;
}
