import Component from '@ember/component';

export default Component.extend({
  classNames: ['ui', 'segment'],

  hideImage: false,

  actions: {
    hideSpeakerImage() {
      this.toggleProperty('hideImage');
      if (!this.get('session.speakers.length')) {
        this.set('hideImage', false);
      }
    }
  }
});
