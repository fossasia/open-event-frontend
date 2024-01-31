import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { stateColorMap } from 'open-event-frontend/utils/dictionary/sessions';

@classic
export default class CellSessionState extends Component {

  @computed('record')
  get color() {
    return stateColorMap[this.record] || 'yellow';
  }

}
