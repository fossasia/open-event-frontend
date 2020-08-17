import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import moment from 'moment';

@classic
export default class SideMenu extends Component {
  async didInsertElement() {
    super.didInsertElement(...arguments);
    const speakersCall = await this.event.speakersCall;
    this.set('shouldShowCallforSpeakers',
      speakersCall && speakersCall.announcement && (speakersCall.privacy === 'public'));
  }

  @action
  scrollToTarget() {
    document.querySelectorAll('.scroll').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });

        document.querySelectorAll('.scroll').forEach(node => {
          node.classList.remove('active');
        });
        e.target.classList.add('active');
      });
    });
  }

  @computed('event.schedulePublishedOn')
  get isSchedulePublished() {
    return this.event.schedulePublishedOn && this.event.schedulePublishedOn.toISOString() !== moment(0).toISOString();
  }
}
