import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

@classic
export default class NavBar extends Component {
  @service router;
  @service globalData;
  @service('event') eventService;

  loaded = false

  @tracked
  showSpeakers = null;

  @tracked
  showExhibitors = null;

  @tracked
  showSessions = null;

  didUpdateAttrs() {

    if (!this.loaded && this.get('needShowEventMenu')) {
      this.loaded = true;
      this.checkSpeakers();
      this.checkSessions();
      this.checkExhibitors();
    } else if (!this.get('needShowEventMenu')) {
      this.loaded = false;
    }
  }

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

  @computed('isNotPublicPageRoute')
  get checkShowClassCssPublic() {
    if (this.session.isAuthenticated) {
      if (this.isNotPublicPageRoute) {
        return 'au-home-page';
      } else {
        return 'au-public-page';
      }
    } else {
      if (this.isNotPublicPageRoute) {
        return 'un-home-page';
      } else {
        return 'un-public-page';
      }
    }
  }

  @action
  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.router.transitionTo('explore.events', {
        queryParams: { name: event.target.value }
      });
      document.querySelector('#mobile-bar').classList.remove('show-bar');
      event.target.blur();
    }
  }

  @action
  searchOnClick(event) {
    this.router.transitionTo('explore.events', {
      queryParams: { name: event.target.value }
    });
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

    if (this._handleOutsideClick) {
      document.removeEventListener('click', this._handleOutsideClick);
    }

    this._handleOutsideClick = e => {
      if (!mobileBar.contains(e.target)) {
        mobileBar.classList.remove('show-bar');
        document.removeEventListener('click', this._handleOutsideClick);
      }
    };

    document.addEventListener('click', this._handleOutsideClick);
  }

  @action
  handleClick() {
    this.router.replaceWith('public.index',  this.globalData.idEvent);
  }

  @action
  redirectToPage(event) {
    const optionValue = event;
    if (optionValue === 'speakers') {
      this.router.replaceWith('public.speakers',  this.globalData.idEvent);
    } else if (optionValue === 'exhibition') {
      this.router.replaceWith('public.exhibition',  this.globalData.idEvent);
    } else if (optionValue === 'schedule') {
      this.router.replaceWith('public.sessions.index',  this.globalData.idEvent);
    } else {
      this.router.replaceWith('public.index',  this.globalData.idEvent);
    }
  }

  async checkSpeakers() {
    this.showSpeakers = await this.eventService.hasSpeakers(this.globalData.idEvent);
  }

  async checkExhibitors() {
    this.showExhibitors = await this.eventService.hasExhibitors(this.globalData.idEvent);
  }

  async checkSessions() {
    this.showSessions = await this.eventService.hasSessions(this.globalData.idEvent);
  }


  @action
  logout() {
    this.authManager.logout();
    this.routing.transitionTo('index');
  }

}
