import classic from 'ember-classic-decorator';
import Service, { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { resolve } from 'rsvp';

@classic
export default class CurrentUserService extends Service {
  @service
  session;

  @service
  store;

  load() {
    const userId = this.session.data.authenticated.user_id;
    if (!isEmpty(userId)) {
      return this.store.findRecord('user', userId).then(user => {
        this.set('user', user);
      });
    } else {
      return resolve();
    }
  }
}
