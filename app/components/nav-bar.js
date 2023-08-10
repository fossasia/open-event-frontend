import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';


@classic
export default class NavBar extends Component {
  @service globalData;
  @computed('session.currentRouteName')
  get isGroupRoute() {
    return (String(this.session.currentRouteName).includes('group'));
  }

  @computed('session.currentRouteName')
  get isNotEventPageRoute() {
    if (this.isGroupRoute) {
      return true;
    }
    return !(String(this.session.currentRouteName).includes('public'));
  }

  @computed('session.currentRouteName')
  get isNotWizardPageRoute() {
    if (this.isGroupRoute) {
      return true;
    }
    return !String(this.session.currentRouteName) !== 'create';
  }

  @computed('session.currentRouteName')
  get isNotExplorePageRoute() {
    if (this.isGroupRoute) {
      return true;
    }
    return !(String(this.session.currentRouteName).includes('explore'));
  }
  @computed('session.currentRouteName')
  get isNotPublicPageRoute() {
    if (this.isGroupRoute) {
      return true;
    }
    return !(String(this.session.currentRouteName).includes('public'));
  }
  @computed('session.currentRouteName')
  get isNotOrderPageRoute() {
    if (this.isGroupRoute) {
      return true;
    }
    return !(String(this.session.currentRouteName).includes('order'));
  }

  @computed('session.currentRouteName')
  get isNotEventDetailPageRoute() {
    if (this.isGroupRoute || this.routing.currentRouteName === 'events.list') {
      return true;
    }
    return !(String(this.session.currentRouteName).includes('events.view'));
  }

  @action
  handleKeyPress() {
    if (event.keyCode === 13 || event.which === 13) {
      this.search();
      document.querySelector('#mobile-bar').classList.remove('show-bar');
      document.getElementById('mobileSearchBar').blur();
    }
  }

  @action
  searchOnClick() {
    this.sendAction('search');
    document.querySelector('#mobile-bar').classList.remove('show-bar');
  }

  @action
  toggleSearchBar() {
    document.querySelector('#mobile-bar').classList.toggle('show-bar');
  }

  @action
  toggleMobileSearchBar() {
    const mobileBar = document.getElementById('mobile-bar');
    const mobileSearchBar = document.getElementById('mobileSearchBar');
    mobileBar.classList.add('show-bar');
    mobileSearchBar.focus();
    document.querySelector('.pusher').addEventListener('click', function(e) {
      if (e.target === mobileSearchBar) {
        return;
      }
      mobileBar.classList.remove('show-bar');
    });
  }

  @action
  handleClick() {
    this.router.replaceWith('public.index',  this.globalData.idEvent);
  }


  @action
  logout() {
    this.authManager.logout();
    this.routing.transitionTo('index');
  }
}
