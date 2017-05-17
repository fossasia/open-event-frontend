import Ember from 'ember';
import { orderBy, groupBy } from 'lodash';

const { Component, computed } = Ember;

export default Component.extend({
  sponsorsGrouped: computed('sponsors.[]', function() {
    return groupBy(orderBy(this.get('sponsors'), 'level'), 'type');
  })
});
