import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';

@classic
export default class ScheduleController extends Controller {
  @computed('model.event.schedulePublishedOn')
  get isSchedulePublished() {
    return this.model.event.schedulePublishedOn.toISOString() !== moment(0).toISOString();
  }
}
