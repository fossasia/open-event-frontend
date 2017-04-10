import Ember from 'ember';
import { humanReadableBytes } from 'open-event-frontend/utils/size';
import { v4 } from 'ember-uuid';

const { Component, computed } = Ember;

export default Component.extend({

  inputId: computed(function () {
    return v4();
  }),

  maxSize: computed('maxSizeInKb', function() {
    return humanReadableBytes(this.get('maxSizeInKb'));
  })
});
