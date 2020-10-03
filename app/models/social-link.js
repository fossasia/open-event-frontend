import { equal } from '@ember/object/computed';
import { computed } from '@ember/object';
import attr from 'ember-data/attr';
import ModelBase from 'open-event-frontend/models/base';
import { belongsTo } from 'ember-data/relationships';
import { computedSegmentedLink, socialPlatforms } from 'open-event-frontend/utils/computed-helpers';

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
    if (!socialPlatforms.includes(normalizedName)) {
      return 'globe';
    }
    return normalizedName;
  }),

  isTwitter : equal('normalizedName', 'twitter'),
  isCustom  : computed('normalizedName', function() {
    return !socialPlatforms.includes(this.normalizedName);
  }),

  segmentedLink: computedSegmentedLink.bind(this)('link')
});
