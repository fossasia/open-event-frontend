import Controller from '@ember/controller';
import moment from 'moment';
import { action, computed } from '@ember/object';

export default class extends Controller {
  @computed('session.currentRouteName')
  get smallLead() {
    return this.session.currentRouteName !== 'public.index';
  }
  @computed('model.startsAtDate', 'model.endsAtDate')
  get displayEndDate() {
    return !moment(this.model.startsAtDate).isSame(this.model.endsAtDate, 'minute');
  }
  @computed('session.currentRouteName')
  get displaySideMenu() {
    return this.session.currentRouteName !== 'public.cfs.new-session' && this.session.currentRouteName !== 'public.cfs.new-speaker' && this.session.currentRouteName !== 'public.cfs.edit-speaker' && this.session.currentRouteName !== 'public.cfs.edit-session';
  }
  @action
  toggleMenu() {
    this.toggleProperty('isMenuOpen');
  }
}
