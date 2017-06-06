import Ember from 'ember';

const { Controller, computed, String } = Ember;

export default Controller.extend({

  featuredSpeakers: computed.filterBy('model.speakers', 'isFeatured', true),

  nonFeaturedSpeakers: computed.filterBy('model.speakers', 'isFeatured', false),

  htmlSafeDescription: computed('model.event.description', function() {
    return String.htmlSafe(this.get('model.event.description'));
  })

});
