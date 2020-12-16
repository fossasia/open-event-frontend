import classic from 'ember-classic-decorator';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';
import { filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';
import moment from 'moment';
import { tracked } from '@glimmer/tracking';


@classic
export default class ApplicationController extends Controller {
  @service('-routing')
  routing;

  @service
  cookies;

  @service
  fastboot;

  @tracked event_name = null;

  @filterBy('model.notifications', 'isRead', false)
  unreadNotifications;

  getCookieSeen(write) {
    const cookieName = 'seen-cookie-message';
    const cookie = this.cookies.read(cookieName);
    const cookieExists = cookie === 'yes';
    if (write) {
      let date = moment();
      date = date.add(30, 'day');
      const expires = date.toISOString();
      const options = {
        path: '/',
        expires
      };
      this.cookies.write(cookieName, 'yes', options);
    }
    return !cookieExists;
  }

  @computed
  get showCookie() {
    return this.getCookieSeen();
  }

  @action
  hideCookieMessage() {
    this.getCookieSeen(true);
    this.showCookie = false;
  }

  @action
  search() {
    this.transitionToRoute('explore', { queryParams: { event_name: this.event_name } });
    this.event_name = null;
  }
}
