import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { action } from '@ember/object';
import { tagName } from '@ember-decorators/component';

@classic
@tagName('')
export default class GroupNav extends Component {
  @action
  refreshRoute() {
    this.refresh();
  }
}

