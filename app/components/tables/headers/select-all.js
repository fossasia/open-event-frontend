import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';

@classic
export default class SelectAll extends Component {

  @action
  toggleSelectAll(value) {
    this.column.actions.toggleSelectAll(value);
  }
}
