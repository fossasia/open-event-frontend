import { filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import moment from 'moment';


export default Controller.extend({
  routing             : service('-routing'),
  cookies             : service(),
  fastboot            : service(),
  unreadNotifications : filterBy('model.notifications', 'isRead', false),
  footerPages         : filterBy('model.pages', 'place', 'footer'),
  userLocation        : null,

  showCookie: computed(function() {
    const cookieName = 'seen-cookie-message';
    let cookie = this.cookies.read(cookieName);
    let cookieExists = false;
    cookieExists = !(cookie != null && cookie === 'yes');
    let date = moment();
    date = date.add(30, 'day');
    let expires = date.toISOString();
    let options = {
      path: '/',
      expires
    };
    this.cookies.write(cookieName, 'yes', options);
    return cookieExists;
  })
});
