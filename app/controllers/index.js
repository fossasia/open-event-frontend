import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';

@classic
export default class IndexController extends Controller {
  @computed('filteredEvents.[]', 'featuredEvents.[]')
  get callForSpeakersEvents() {
    const filteredEventsCfs = this.filteredEvents.filter(isEventCfsOpen);
    const featuredEventsCfs = this.featuredEvents.filter(isEventCfsOpen);
    const combinedCfsEvents = new Set(filteredEventsCfs.concat(featuredEventsCfs));
    return Array.from(combinedCfsEvents);
  }

  @computed('filteredEvents.[]')
  get promotedEvents() {
    return this.filteredEvents?.filter(event => event.isPromoted);
  }

  @computed('filteredEvents.[]')
  get upcomingEvents() {
    return this.filteredEvents?.filter(event => !event.isPromoted);
  }

  @action
  handleKeyPress() {
    if (event.code === 'Enter') {
      this.send('search');
    }
  }

  @action
  search() {
    this.transitionToRoute('explore', { queryParams: { event_name: this.event_name } });
  }

  @action
  shareEvent(event) {
    this.set('eventToShare', event);
    this.set('isShareModalOpen', true);
  }
}

function isEventCfsOpen(event) {
  const callForPapers = event.get('speakersCall');
  const sessionEnabled = event.isSessionsSpeakersEnabled;
  if (!callForPapers || !callForPapers.get('startsAt')  || !callForPapers.get('endsAt')) {
    return false;
  }
  const startDateTime = callForPapers.get('startsAt');
  const endDateTime = callForPapers.get('endsAt');
  const privacyState = callForPapers.get('privacy');
  return (moment().isBetween(startDateTime, endDateTime) && (sessionEnabled) && (privacyState === 'public'));
}
