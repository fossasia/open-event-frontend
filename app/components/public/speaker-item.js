import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames  : ['four wide  speaker column'],
  socialLinks : computed(function() {
    return this.get('speaker').getProperties('twitter', 'facebook', 'github', 'linkedin');
  }),
  hasSocialLinks: computed(function() {
    var currentSpeaker = this.speaker;
    return (currentSpeaker.twitter || currentSpeaker.facebook || currentSpeaker.github || currentSpeaker.linkedin || currentSpeaker.shortBiography || currentSpeaker.longBiography || currentSpeaker.speakingExperience);
  })
});
