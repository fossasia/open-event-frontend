import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import moment from 'moment-timezone';
@classic
export default class CellAction extends Component {
    currentlyCheckedin = [];
    eventdates = [];
    get allDates() {
      const dates = [];
      const date1 = moment(this.extraRecords.event.get('endsAtDate'));
      const date2 = moment(this.extraRecords.event.get('startsAtDate'));
      const diff = date1.diff(date2, 'days');
      for (let i = 0; i < diff; i++) {
        dates.push((moment(this.extraRecords.event.get('startsAtDate'), 'MM-DD-YYYY').add(i, 'days').format('MM-DD-YYYY')));
        this.eventdates.push(moment(this.extraRecords.event.get('startsAtDate'), 'MM-DD-YYYY').add(i, 'days').format('MM-DD-YYYY'));
      }
      return dates;
    }

    get checkinTimes() {
      if (this.extraRecords.checkinTimes) {
        const x = this.extraRecords.checkinTimes?.split(',');
        const checkinDates = [];
        for (const i of x) {
          checkinDates.push(moment(i).format('MM-DD-YYYY'));
        }
        return checkinDates;
      }
      return [];
    }

    get checkoutTimes() {
      if (this.extraRecords.checkoutTimes) {
        const x = this.extraRecords.checkoutTimes?.split(',');
        const checkoutDates = [];
        for (const i of x) {
          checkoutDates.push(moment(i).format('MM-DD-YYYY'));
        }
        return checkoutDates;
      }
      return [];
    }

    get currentlyChecked() {
      for (const i of this.eventdates) {
        const checkinCount = this.checkinTimes?.filter(x => x === i).length || 0;
        const checkoutCount = this.checkoutTimes?.filter(x => x === i).length || 0;
        if (checkinCount > checkoutCount && !this.currentlyCheckedin.includes(i)) {
          this.currentlyCheckedin.push(i);
        }
      }
      return this.currentlyCheckedin;
    }
}
