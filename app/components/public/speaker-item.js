import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('four wide  speaker column')
export default class SpeakerItem extends Component {
  @computed
  get socialLinks() {
    return this.speaker.getProperties('twitter', 'facebook', 'github', 'linkedin');
  }

  @computed
  get hasSocialLinks() {
    let currentSpeaker = this.speaker;
    return (currentSpeaker.twitter || currentSpeaker.facebook || currentSpeaker.github || currentSpeaker.linkedin || currentSpeaker.shortBiography || currentSpeaker.longBiography || currentSpeaker.speakingExperience);
  }
}
