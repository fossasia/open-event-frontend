/**
 * Rule borrowed from http://forums.devshed.com/javascript-development/493764-regexp-match-url-pattern-post1944160.html#post1944160
 *
 * @author Kravvitz (http://forums.devshed.com/author/kravvitz)
 * @type {RegExp}
 */
const validUrlPattern = new RegExp('^(https?:\/\/)?' // protocol
  + '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' // domain name
  + '((\d{1,3}\.){3}\d{1,3}))' // OR ip (v4) address
  + '(\:\d+)?(\/[-a-z\d%_.~+]*)*' // port and path
  + '(\?[;&a-z\d%_.~+=-]*)?' // query string
  + '(\#[-a-z\d_]*)?$', 'i'); // fragment locator


export const isValidUrl = str => {
  return validUrlPattern.test(str);
};
