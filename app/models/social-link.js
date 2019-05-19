import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';
import { computedSegmentedLink } from 'open-event-frontend/utils/computed-helpers';

export default ModelBase.extend({
  name       : attr('string'),
  link       : attr('string'),
  identifier : attr('string'), // used for providing css id for URL validations.

  event: belongsTo('event'),

  normalizedName: computed('name', function() {
    return this.name.trim().toLowerCase();
  }),

  isTwitter: equal('normalizedName', 'twitter'),

  segmentedLink: computedSegmentedLink.bind(this)('link')
});
