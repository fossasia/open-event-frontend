import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import moment from 'moment';

@classic
export default class PublicController extends Controller {
  @computed('session.currentRouteName')
  get smallLead() {
    return this.session.currentRouteName && this.session.currentRouteName !== 'public.index';
  }

  @computed('model.startsAtDate', 'model.endsAtDate')
  get displayEndDate() {
    return !moment(this.model.startsAtDate).isSame(this.model.endsAtDate, 'minute');
  }

  @computed('session.currentRouteName')
  get displaySideMenu() {
    return this.session.currentRouteName && this.session.currentRouteName !== 'public.cfs.new-session' && this.session.currentRouteName !== 'public.cfs.new-speaker' && this.session.currentRouteName !== 'public.cfs.edit-speaker' && this.session.currentRouteName !== 'public.cfs.edit-session';
  }

  @computed('locationName', 'online')
  get headerLocation() {
    if (this.model.locationName && this.model.online) {
      return `In-Person Event and Online Event ${this.model.locationName}`;
    } else if (this.model.online) {
      return 'Online Event';
    } else if (this.model.locationName) {
      return this.model.locationName;
    } else {
      return 'Location to be announced';
    }
  }

  @action
  toggleMenu() {
    this.toggleProperty('isMenuOpen');
  }
}
