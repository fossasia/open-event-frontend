import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { forOwn } from 'lodash-es';
import moment from 'moment';
import { pascalCase } from 'open-event-frontend/utils/string';

@classic
@classNames('column')
export default class EventCard extends Component {
  @computed('event.type', 'event.topic', 'event.subTopic')
  get tags() {
    // Unfortunately, due to the extremely dynamic and stringy nature
    // of ember, the next line crashes on using object destructuring
    // and we don't have time and resources to chase down issues originating
    // from ember core, hence disabling the lint
    const tagsOriginal = this.getProperties('event.topic.name', 'event.type.name', 'event.subTopic.name');  // eslint-disable-line ember/no-get
    const tags = [];
    forOwn(tagsOriginal, value => {
      if (value && value.trim() !== '') {
        tags.push(`#${pascalCase(value)}`);
      }
    });
    return tags;
  }

  @computed
  get eventClass() {
    return this.isWide ? 'thirteen wide computer ten wide tablet sixteen wide mobile column ' + (!this.device.isMobile && 'rounded-l-none') : 'event fluid';
  }

  @computed
  get isPastEvent() {
    const currentTime = moment.tz(this.event.timezone);
    return this.event.endsAt < currentTime;
  }

  @action
  selectCategory(category, subCategory) {
    this.set('category', (category === this.category && !subCategory) ? null : category);
    this.set('subCategory', (!subCategory || subCategory === this.subCategory) ? null : subCategory);
    this.set('is_online', null);
    this.setProperties({
      eventName  : null,
      eventType  : null,
      startDate  : null,
      endDate    : null,
      location   : null,
      ticketType : null,
      cfs        : null,
      isOnline   : null,
      hasImage   : null,
      hasLogo    : null,
      isPast     : null
    });
  }

  @action
  selectEventType(eventType) {
    this.set('eventType', eventType === this.eventType ? null : eventType);
    this.setProperties({
      eventName   : null,
      category    : null,
      subCategory : null,
      startDate   : null,
      endDate     : null,
      location    : null,
      ticketType  : null,
      cfs         : null,
      isOnline    : null,
      hasImage    : null,
      hasLogo     : null,
      isPast      : null
    });
  }

}
