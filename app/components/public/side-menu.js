import Component from '@ember/component';

export default Component.extend({
  async didInsertElement() {
    this._super(...arguments);
    let speakersCall = await this.get('event.speakersCall');
    this.set('shouldShowCallforSpeakers',
      speakersCall.announcement && (speakersCall.privacy === 'public'));
  }
});
