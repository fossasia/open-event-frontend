import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  actions: {
    filter(trackId = null) {
      this.set('selectedTrackId', trackId);
    }
  }
});
