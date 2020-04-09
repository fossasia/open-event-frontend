import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class TicketHolder extends Component {
  @computed('data.user')
  get buyer() {
    return this.data.user;
  }
}
