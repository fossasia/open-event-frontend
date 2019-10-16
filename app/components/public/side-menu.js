import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  selectedIndex: undefined,
  async didInsertElement() {
    this._super(...arguments);
    let speakersCall = await this.get('event.speakersCall');
    this.set('shouldShowCallforSpeakers',
      speakersCall && speakersCall.announcement && (speakersCall.privacy === 'public'));
  },
  actions: {
    changeSelectedIndex(index) {
      this.set('selectedIndex', index);
    }
  },
  isSchedulePublished: computed('event.schedulePublishedOn', function() {
    return this.get('event.schedulePublishedOn') && this.get('event.schedulePublishedOn').toISOString() !== moment(0).toISOString();
  })
});
