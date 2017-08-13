import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import Ember from 'ember';
import { belongsTo } from 'ember-data/relationships';

const { observer } = Ember;

export default ModelBase.extend({
  fieldIdentifier : attr('string'),
  form            : attr('string'),
  type            : attr('string', { defaultValue: 'text' }),
  isRequired      : attr('boolean', { defaultValue: false }),
  isIncluded      : attr('boolean', { defaultValue: false }),
  isFixed         : attr('boolean', { defaultValue: false }),

  event: belongsTo('event'),

  isIncludedObserver: observer('isIncluded', function() {
    if (!this.get('isIncluded') && this.get('isRequired')) {
      this.set('isRequired', false);
    }
  }),

  isRequiredObserver: observer('isRequired', function() {
    if (!this.get('isIncluded') && this.get('isRequired')) {
      this.set('isIncluded', true);
    }
  })

});
