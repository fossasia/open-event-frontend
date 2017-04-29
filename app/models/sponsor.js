import DS from 'ember-data';
import Ember from 'ember';
import { values } from 'lodash';

const { Model, attr, belongsTo } = DS;
const { computed } = Ember;

export default Model.extend({
  name        : attr('string'),
  level       : attr('number'),
  type        : attr('string'),
  url         : attr('string'),
  description : attr('string'),
  logoUrl     : attr('string'),

  event: belongsTo('event'),

  segmentedLink: computed('url', {
    get() {
      const splitted = this.get('url') ? this.get('url').split('://') : [];
      if (!splitted || splitted.length === 0 || (splitted.length === 1 && splitted[0].includes('http'))) {
        return {
          protocol : 'https',
          address  : ''
        };
      }
      return {
        protocol : splitted[0],
        address  : splitted[1]
      };
    },
    set(key, value) {
      this.set('url', values(value).join('://'));
      return value;
    }
  })

});
