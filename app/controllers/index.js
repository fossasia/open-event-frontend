import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';

@classic
export default class IndexController extends Controller {
  queryParams = ['event_name', 'start_date', 'end_date', 'location'];
  start_date = null;
  end_date = null;
  location = null;
  event_name = null;
  filterDate = null;

  @computed('filteredEvents.[]')
  get callForSpeakersEvents() {
    return this.filteredEvents.filter(event => {
      const callForPapers = event.get('speakersCall');
      const sessionEnabled = event.isSessionsSpeakersEnabled;
      if (!callForPapers || !callForPapers.get('startsAt')  || !callForPapers.get('endsAt')) {
        return false;
      }
      const startDateTime = callForPapers.get('startsAt');
      const endDateTime = callForPapers.get('endsAt');
      const privacyState = callForPapers.get('privacy');
      return (moment().isBetween(startDateTime, endDateTime) && (sessionEnabled) && (privacyState === 'public'));
    });
  }

  @computed('filteredEvents.[]')
  get promotedEvents() {
    return this.filteredEvents ? this.filteredEvents.filter(event => {return event.isPromoted}) : null;
  }

  @computed('filteredEvents.[]')
  get upcomingEvents() {
    return this.filteredEvents ? this.filteredEvents.filter(event => {return !event.isPromoted}) : null;
  }

  @action
  shareEvent(event) {
    this.set('eventToShare', event);
    this.set('isShareModalOpen', true);
  }
}
