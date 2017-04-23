import Ember from 'ember';

const { Controller, computed, String } = Ember;

export default Controller.extend({

  htmlSafeDescription: computed('model.event.description', function() {
    return String.htmlSafe(this.get('model.event.description'));
  })

});
