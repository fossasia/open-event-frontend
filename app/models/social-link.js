import attr from 'ember-data/attr';
import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';
import Ember from 'ember';
import { computedSegmentedLink } from 'open-event-frontend/utils/computed-helpers';

const { computed } = Ember;

export default Model.extend({
  name : attr('string'),
  link : attr('string'),

  event: belongsTo('event'),

  normalizedName: computed('name', function() {
    return this.get('name').trim().toLowerCase();
  }),

  isTwitter: computed.equal('normalizedName', 'twitter'),

  segmentedLink: computedSegmentedLink.bind(this)('link')
});
