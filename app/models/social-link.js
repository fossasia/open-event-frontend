import DS from 'ember-data';
import Ember from 'ember';
import { values } from 'lodash';
import Fragment from 'ember-data-model-fragments/fragment';

const { attr } = DS;
const { computed } = Ember;

export default Fragment.extend({
  name : attr('string'),
  link : attr('string'),

  normalizedName: computed('name', function() {
    return this.get('name').trim().toLowerCase();
  }),

  isTwitter: computed.equal('normalizedName', 'twitter'),

  segmentedLink: computed('link', {
    get() {
      const splitted = this.get('link') ? this.get('link').split('://') : [];
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
      this.set('link', values(value).join('://'));
      return value;
    }
  })
});
