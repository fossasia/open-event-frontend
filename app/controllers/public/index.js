import { filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Controller.extend({

  featuredSpeakers: filterBy('model.speakers', 'isFeatured', true),

  nonFeaturedSpeakers: filterBy('model.speakers', 'isFeatured', false),

  htmlSafeDescription: computed('model.event.description', function() {
    return htmlSafe(this.get('model.event.description'));
  })

});
