import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
export default class NavBar extends Component {
  @computed('routing.router.currentRoute.queryParams')
  get eventName() {
    return this.routing.router.currentRoute.queryParams.event_name;
  }

  @computed('session.currentRouteName')
  get isNotEventPageRoute() {
    return !(String(this.session.currentRouteName).includes('public'));
  }

  @computed('session.currentRouteName')
  get isNotExplorePageRoute() {
    return !(String(this.session.currentRouteName).includes('explore'));
  }

  @action
  handleKeyPress(eventName) {
    if (event.code === 'Enter') {
      this.sendAction('search', eventName);
      document.querySelector('#mobile-bar').classList.remove('show-bar');
    }
  }

  @action
  toggleSearchBar() {
    document.querySelector('#mobile-bar').classList.toggle('show-bar');
  }

  @action
  logout() {
    this.authManager.logout();
    this.routing.transitionTo('index');
  }
}
