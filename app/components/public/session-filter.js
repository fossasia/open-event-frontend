import Component from '@ember/component';

export default Component.extend({

  actions: {
    filter(trackId = null) {
      this.set('selectedTrackId', trackId);
    }
  }
});
