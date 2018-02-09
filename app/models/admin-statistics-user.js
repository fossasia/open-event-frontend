import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import Ember from 'ember';

const { computed } = Ember;

export default ModelBase.extend({
  superAdmin     : attr('number'),
  admin          : attr('number'),
  verified       : attr('number'),
  unverified     : attr('number'),
  organizer      : attr('number'),
  coorganizer    : attr('number'),
  attendee       : attr('number'),
  trackOrganizer : attr('number'),

  total: computed('superAdmin', 'admin', 'verified', 'unverified', function() {
    return this.get('superAdmin') + this.get('admin') + this.get('verified') + this.get('unverified');
  })
});
