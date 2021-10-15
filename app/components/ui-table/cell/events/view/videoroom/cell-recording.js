import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

@classic
export default class UiTableCellEventsViewVideoroomCellRecordingComponent extends Component {
  @computed('record')
  get duration() {
    return moment.duration(
      moment(this.record.endTime).diff(
        moment(this.record.startTime)
      )
    ).humanize();
  }
}
