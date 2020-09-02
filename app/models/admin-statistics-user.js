import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';

export default ModelBase.extend({
  superAdmin     : attr('number'),
  admin          : attr('number'),
  verified       : attr('number'),
  unverified     : attr('number'),
  owner          : attr('number'),
  organizer      : attr('number'),
  coorganizer    : attr('number'),
  attendee       : attr('number'),
  trackOrganizer : attr('number'),

  total: computed('superAdmin', 'admin', 'verified', 'unverified', function() {
    return this.superAdmin + this.admin + this.verified + this.unverified;
  })
});
