import Ember from 'ember';
import moment from 'moment';

const { Route } = Ember;

export default Route.extend({
  model() {
    return this.store.query('event', { end_time_gt: moment.utc().format('YYYY-MM-DDTHH:mm:ss'), state: 'Published' });
  }
});
