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

  capitalizeName: computed('name', function() {
    // Even though name is required for social links and is non-nullable
    // and non-null name is being sent from API, for some reason, for certain events,
    // this throws an error, so we check first if name exists
    // https://github.com/fossasia/open-event-frontend/issues/4777

    const capitalizeName = (s) => {
      if (typeof s !== 'string') return ''
      return s.charAt(0).toUpperCase() + s.slice(1)
    }
    return normalizedName;
  }),

  isTwitter : equal('capitalizeName', 'twitter'),
  isCustom  : computed('capitalizeName', function() {
    return !socialPlatforms.includes(this.capitalizeName);
  }),

  segmentedLink: computedSegmentedLink.bind(this)('link')
});
