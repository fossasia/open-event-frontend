import Component from '@ember/component';
import { computed } from '@ember/object';
import { groupBy } from 'lodash-es';

export default Component.extend({
  buyer: computed('data.user', function() {
    return this.get('data.user');
  }),
  holders: computed('data.attendees', function() {
    return this.get('data.attendees');
  }),
  isPaidOrder: computed('data', function() {
    if (!this.get('data.amount')) {
      return false;
    }
    return true;
  }),
  allFields: computed('fields', function() {
    return groupBy(this.get('fields').toArray(), field => field.get('form'));
  })
});
