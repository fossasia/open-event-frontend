import { filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import moment from 'moment';


export default Controller.extend({
  routing             : service('-routing'),
  unreadNotifications : filterBy('model.notifications', 'isRead', false),
  footerPages         : filterBy('model.pages', 'place', 'footer'),

  showCookie: computed(function() {
    let cookie = readCookie('seen-cookie-message');
    let val = false;
    val = !(cookie != null && cookie === 'yes');

    updateCookie();
    return val;
  })
});

/**
 *  Update the cookie's state
 */
function updateCookie() {
  createCookie('seen-cookie-message', 'yes', 30, '/');
}


/**
 * Read the cookie
 * @param name
 * @returns value of the cookie if found else return null
 * Reference -> http://www.quirksmode.org/js/cookies.html
 */
function readCookie(name) {
  let nameEQ = `${name  }=`;
  let ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {c = c.substring(1, c.length)}
    if (c.indexOf(nameEQ) === 0) {return c.substring(nameEQ.length, c.length)}
  }
  return null;
}

/**
 * Create the cookie
 *
 * @param name
 * @param value
 * @param days
 * @param path
 * Reference -> http://www.quirksmode.org/js/cookies.html
 */
function createCookie(name, value, days, path) {
  let expires;
  if (days) {
    let date = moment();
    date = date.add(days, 'day');
    expires = `; expires=${date.toISOString()}`;
  } else {
    expires = '';
  }
  document.cookie = `${name}=${value}${expires}; path=${path}`;
}
