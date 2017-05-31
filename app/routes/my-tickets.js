import Ember from 'ember';
import moment from 'moment';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { Route } = Ember;

export default Route.extend(AuthenticatedRouteMixin, {
  titleToken() {
    return this.i18n.t('My Tickets');
  },

  model() {
    return this.store.query('event', { end_time_gt: moment.utc().format('YYYY-MM-DDTHH:mm:ss'), state: 'Published' });
  }
});
