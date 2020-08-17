import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';

let upcoming_events_count = 0;
@classic
export default class IndexController extends Controller {
  queryParams = ['event_name', 'start_date', 'end_date', 'location'];
  start_date = null;
  end_date = null;
  location = null;
  event_name = null;
  filterDate = null;

  @computed('filteredEvents.[]', 'featuredEvents.[]')
  get callForSpeakersEvents() {
    const filteredEventsCfs = this.filteredEvents.filter(isEventCfsOpen);
    const featuredEventsCfs = this.featuredEvents.filter(isEventCfsOpen);
    const combinedCfsEvents = new Set(filteredEventsCfs.concat(featuredEventsCfs));
    return Array.from(combinedCfsEvents).slice(0, 12);
  }

  @computed('filteredEvents.[]')
  get promotedEvents() {
    return this.filteredEvents ? this.filteredEvents.filter(isPromotedEvent) : null;
  }

  @computed('filteredEvents.[]')
  get upcomingEvents() {
    return this.filteredEvents ? this.filteredEvents.filter(validUpcomingEvent) : null;
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

function isPromotedEvent(event) {
  if (upcoming_events_count < 21 && event.isPromoted) {
    return true;
  } else {
    return false;
  }
}

function validUpcomingEvent(event) {
  if (upcoming_events_count < 21 && event.thumbnailImageUrl && event.location.name && !event.isPromoted) {
    upcoming_events_count += 1;
    return true;
  } else {
    return false;
  }
}
