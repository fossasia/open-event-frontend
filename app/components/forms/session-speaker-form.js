import Ember from 'ember';
import { groupBy } from 'lodash';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component, computed } = Ember;

export default Component.extend(FormMixin, {
  allFields: computed('fields', function() {
    return groupBy(this.get('fields').toArray(), field => field.get('form'));
  })
});
