import DS from 'ember-data';
import Ember from 'ember';

const { Model, attr } = DS;

const { observer } = Ember;

export default Model.extend({
  identifier : attr('string'),
  name       : attr('string'),
  type       : attr('string', { defaultValue: 'text' }),
  isRequired : attr('boolean', { defaultValue: false }),
  isIncluded : attr('boolean', { defaultValue: false }),
  isFixed    : attr('boolean', { defaultValue: false }),

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
