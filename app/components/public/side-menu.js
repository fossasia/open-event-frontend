import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  shouldShowCallforSpeakers: computed(function() {
    return this.get('event.isSessionsSpeakersEnabled') && (this.get('event.speakersCall.privacy') === 'public');
  })
});
