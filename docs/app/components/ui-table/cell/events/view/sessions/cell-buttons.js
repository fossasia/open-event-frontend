import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { stateColorMap } from 'open-event-frontend/utils/dictionary/sessions';
import { computed } from '@ember/object';

@classic
export default class CellButtons extends Component {

  @computed('extraRecords.status')
  get states() {
    return Object.keys(this.props.options.sessionStateMap.organizer[this.extraRecords.status])
      .map(state => ({ name: state, color: stateColorMap[state] }));
  }

  @computed('extraRecords.status')
  get color() {
    return stateColorMap[this.extraRecords.status];
  }

}
