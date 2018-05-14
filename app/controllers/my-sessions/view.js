import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  isUpcoming: computed('model.endsAt', function() {
    let endAt = this.get('model.endsAt');
    if (endAt < moment()) {
      return false;
    }
    return true;
  })
});
