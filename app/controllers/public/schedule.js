import Controller from '@ember/controller';
import { computed } from '@ember/object';
import moment from 'moment';

export default Controller.extend({
  isSchedulePublished: computed('model.event.schedulePublishedOn', function() {
    return this.model.event.schedulePublishedOn.toISOString() !== moment(0).toISOString();
  })
});
