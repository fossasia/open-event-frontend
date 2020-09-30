import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import moment from 'moment';
import { SPEAKERS_FILTER } from 'open-event-frontend/routes/public/speakers';
import { tracked } from '@glimmer/tracking';

@classic
export default class SideMenu extends Component {
  @tracked
  showSpeakers = false;

  @tracked
  showSessions = false;

  async didInsertElement() {
    super.didInsertElement(...arguments);
    const speakersCall = await this.event.speakersCall;
    this.set('shouldShowCallforSpeakers',
      speakersCall && speakersCall.announcement && (speakersCall.privacy === 'public'));

    this.checkSpeakers();
    this.checkSessions();
  }

  async checkSpeakers() {
    this.showSpeakers = this.showSpeakers || (await this.loader.load(`/events/${this.event.id}/speakers?fields[speaker]=id&page[size]=1&filter=${JSON.stringify(SPEAKERS_FILTER)}`)).data.length;
  }

  async checkSessions() {
    const filters = [{
      or: [
        {
          name : 'state',
          op   : 'eq',
          val  : 'confirmed'
        },
        {
          name : 'state',
          op   : 'eq',
          val  : 'accepted'
        }
      ]
    }];
    this.showSessions = this.showSessions || (await this.loader.load(`/events/${this.event.id}/sessions?fields[session]=id&page[size]=1&filter=${JSON.stringify(filters)}`)).data.length;
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
