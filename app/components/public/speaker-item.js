import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('speaker column')
export default class SpeakerItem extends Component {
  @computed
  get socialLinks() {
    return this.speaker.getProperties('twitter', 'facebook', 'github', 'linkedin');
  }

  @computed
  get hasSocialLinks() {
    const currentSpeaker = this.speaker;
    return (currentSpeaker.twitter || currentSpeaker.facebook || currentSpeaker.github || currentSpeaker.linkedin || currentSpeaker.shortBiography || currentSpeaker.longBiography || currentSpeaker.speakingExperience || currentSpeaker.website);
  }

  @computed
  get sessionRoute() {
    if (this.session.currentRouteName === 'events.view.speaker.view') {
      return 'events.view.session.view';
    } else {
      return 'public.session.view';
    }
  }
}
