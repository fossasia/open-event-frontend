import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import moment from 'moment';

@classic
export default class CellAction extends Component {
  didInsertElement() {
    if (this.record) {
      const attendee = this.store.peekRecord('attendee', this.record, { backgroundReload: false });
      let checkinTimes = attendee.get('checkinTimes');
      checkinTimes = checkinTimes.split(',');
      const lastDay = checkinTimes[checkinTimes.length - 1].split('T')[0];
      const presentDay =  moment().toISOString().split('T')[0];
      if (lastDay < presentDay) {
        attendee.set('isCheckedIn', false);
      }
    }
  }
}
