import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

@classic
export default class AddToCalendarModal extends ModalBase {
    calendarIcons = {
      'Google Calendar' : 'google',
      'iCal'            : 'calendar',
      'Yahoo'           : 'yahoo',
      'Outlook'         : 'microsoft'
    }

    calendarColors = {
      'Google Calendar' : 'blue',
      'iCal'            : 'red',
      'Yahoo'           : 'purple',
      'Outlook'         : 'teal'
    }

    @computed('calendarUrls')
    get calendars() {
      return this.calendarUrls.map(calendar => {
        const newCalendar = {};
        newCalendar.name = calendar.name;
        newCalendar.url = calendar.url;
        newCalendar.icon = this.calendarIcons[calendar.name];
        newCalendar.color = this.calendarColors[calendar.name];
        return newCalendar;
      });
    }
}
