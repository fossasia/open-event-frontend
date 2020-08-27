import classic from 'ember-classic-decorator';
import { computed, action } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';

@classic
export default class ScheduleController extends Controller {
  @computed('model.event.schedulePublishedOn')
  get isSchedulePublished() {
    return this.model.event.schedulePublishedOn.toISOString() !== moment(0).toISOString();
  }

   hideSchedule = true;
   hideTrack = false;
   hideRooms = false;
  @action
  showSchedule() {
    this.toggleProperty('hideSchedule');
    this.toggleProperty('hideTrack');
    this.toggleProperty('hideRooms');

	  this.set('hideSchedule', true);
	  this.set('hideTrack', false);
	  this.set('hideRooms', false);

  }

  @action
  showTrack() {
    this.toggleProperty('hideSchedule');
    this.toggleProperty('hideTrack');
    this.toggleProperty('hideRooms');
    
    this.set('hideSchedule', false);
    this.set('hideTrack', true);
    this.set('hideRooms', false);
  
  }

  @action
  showRoom() {
    this.toggleProperty('hideSchedule');
    this.toggleProperty('hideTrack');
    this.toggleProperty('hideRooms');
   
    this.set('hideSchedule', false);
    this.set('hideTrack', false);
    this.set('hideRooms', true);
    
  }
}
