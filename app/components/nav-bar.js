import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class NavBar extends Component {
  @action
  logout() {
    this.authManager.logout();
    this.routing.transitionTo('index');
  }
}
