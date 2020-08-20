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
    // Even though name is required for social links and is non-nullable
    // and non-null name is being sent from API, for some reason, for certain events,
    // this throws an error, so we check first if name exists
    // https://github.com/fossasia/open-event-frontend/issues/4777

    const normalizedName = this.name?.trim().toLowerCase();
    const socialPlatforms = ['facebook', 'twitter', 'github', 'youtube', 'linkedin', 'google'];
    if (normalizedName && !socialPlatforms.includes(normalizedName)) {
      normalizedName = 'globe';
    }
    return normalizedName;
  }),

  isTwitter: equal('normalizedName', 'twitter'),

  segmentedLink: computedSegmentedLink.bind(this)('link')
});
