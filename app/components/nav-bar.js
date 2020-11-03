import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class NavBar extends Component {
  @computed('session.currentRouteName')
  get isEventPageRoute() {
    return !(String(this.session.currentRouteName).includes('public'));
  }

  @action
  logout() {
    this.authManager.logout();
    this.routing.transitionTo('index');
  }
}
