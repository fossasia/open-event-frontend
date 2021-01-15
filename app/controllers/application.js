import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';
import moment from 'moment';


@classic
export default class ApplicationController extends Controller {
  @service('-routing')
  routing;

  @service
  cookies;

  @service
  fastboot;

  @filterBy('model.notifications', 'isRead', false)
  unreadNotifications;

  @filterBy('model.pages', 'place', 'footer')
  footerPages;

  @computed
  get showCookie() {
    const cookieName = 'seen-cookie-message';
    const cookie = this.cookies.read(cookieName);
    let cookieExists = false;
    cookieExists = !(cookie != null && cookie === 'yes');
    let date = moment();
    date = date.add(30, 'day');
    const expires = date.toISOString();
    const options = {
      path: '/',
      expires
    };
    this.cookies.write(cookieName, 'yes', options);
    return cookieExists;
  }
}
