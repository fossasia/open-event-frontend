/**
 * Rule borrowed from https://forums.devshed.com/javascript-development/493764-regexp-match-url-pattern-post1944160.html#post1944160
 *
 * @author Kravvitz (https://forums.devshed.com/author/kravvitz)
 * @type {RegExp}
 */
const validUrlPattern = new RegExp('^(https?:\\/\\/)?' // protocol
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
  + '((\\d{1,3}\.){3}\\d{1,3}))' // OR ip (v4) address
  + '(\\:\\d+)?(\/[-a-z\\d%_.~+]*)*' // port and path
  + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
  + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

export const compulsoryProtocolValidUrlPattern = new RegExp('^(https?:\\/\\/)' // compulsory protocol
  + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
  + '((\\d{1,3}\.){3}\\d{1,3}))' // OR ip (v4) address
  + '(\\:\\d+)?(\/[-a-z\\d%_.~+]*)*' // port and path
  + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
  + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

export const protocolLessValidUrlPattern = new RegExp(
  '^'
  // localhost inclusion
  + '(?:(?:localhost)(:\\d{2,5})?|'
  // user:pass authentication
  + '(?:\\S+(?::\\S*)?@)?'
  + '(?:'
  // IP address exclusion
  // private & local networks
  + '(?!(?:10)(?:\\.\\d{1,3}){3})'
  + '(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})'
  + '(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})'
  // IP address dotted notation octets
  // excludes loopback network 0.0.0.0
  // excludes reserved space >= 224.0.0.0
  // excludes network & broacast addresses
  // (first & last IP address of each class)
  + '(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])'
  + '(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}'
  + '(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))'
  + '|'
  // host name
  + '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)'
  // domain name
  + '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*'
  // TLD identifier
  + '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))'
  // TLD may end with dot
  + '\\.?'
  + ')'
  // port number
  + '(?::\\d{2,5})?'
  // resource path
  + '(?:[/?#]\\S*)?)'
  + '$', 'i'
);

export const validTwitterProfileUrlPattern = new RegExp(
  '^(https?:\\/\\/)' // compulsory protocol
  + '?(?:www.)?twitter\\.com\\/([a-zA-Z0-9_]+)$'
);

export const validFacebookProfileUrlPattern = new RegExp(
  '^(https?:\\/\\/)' // compulsory protocol
  + '?(?:www.)?(facebook|fb)\\.com\\/([a-zA-Z0-9_.]+)$'
);

export const validGithubProfileUrlPattern = new RegExp(
  '^(https?:\\/\\/)' // compulsory protocol
  + '?(?:www.)?github\\.com\\/([a-zA-Z0-9_]+)([-]?)([a-zA-Z0-9_]+)$'
);

export const validInstagramProfileUrlPattern = new RegExp(
  '^(https?:\\/\\/)' // compulsory protocol
  + '?(?:www.)?(instagram.com|instagr.am)\/([a-zA-Z0-9_.]+)$'
);

export const validLinkedinProfileUrlPattern = new RegExp(
  '^(https?:\\/\\/)' // compulsory protocol
  + '?(?:www.)?(linkedin\\.com\\/)((([\\w]{2,3})?)|([^\\/]+\\/(([\\w|\\d-&#?=])+\\/?){1,}))$'
);

export const validPhoneNumber = new RegExp(
  '^\\s*(?:\\+?(\\d{1,3}))?([-. (]*(\\d{3})[-. )]*)?((\\d{3})[-. ]*(\\d{2,4})(?:[-.x ]*(\\d+))?)\\s*$'
);

export const validEmail = new RegExp(
  /* eslint-disable-next-line no-control-regex*/
  '[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+'
);

export const isValidUrl = str => {
  return validUrlPattern.test(str);
};
