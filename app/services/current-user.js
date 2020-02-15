import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { isEmpty } from '@ember/utils';
import { resolve } from 'rsvp';

export default Service.extend({
  session : service(),
  store   : service(),

  load() {
    let userId = this.get('session.data.authenticated.user_id');
    if (!isEmpty(userId)) {
      return this.store.findRecord('user', userId).then(user => {
        this.set('user', user);
      });
    } else {
      return resolve();
    }
  }
});
