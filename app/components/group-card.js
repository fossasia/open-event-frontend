import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class GroupCard extends Component {
  @computed('group')
  get about() {
    if (this.group.about?.length > 350) {
      return this.group.about.slice(0, 350) + '...';
    }
    return this.group.about;
  }
}
