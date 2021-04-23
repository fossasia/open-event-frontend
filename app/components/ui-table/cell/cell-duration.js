import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

@classic
export default class CellButtons extends Component {
  @computed('extraRecords.startTime', 'record')
  get duration() {
    return moment.duration(
      moment(this.record).diff(
        moment(this.extraRecords.startTime)
      )
    ).humanize();
  }
}
