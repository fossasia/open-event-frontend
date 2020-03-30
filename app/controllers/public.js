import Controller from '@ember/controller';
import moment from 'moment';
import { computed } from '@ember/object';

export default Controller.extend({
  smallLead: computed('session.currentRouteName', function() {
    if (this.session.currentRouteName) {
      return this.session.currentRouteName !== 'public.index';
    }
  }),
  displayEndDate: computed('model.startsAtDate', 'model.endsAtDate', function() {
    return !moment(this.model.startsAtDate).isSame(this.model.endsAtDate, 'minute');
  }),
  displaySideMenu: computed('session.currentRouteName', function() {
    if (this.session.currentRouteName) {
      return this.session.currentRouteName !== 'public.cfs.new-session' && this.session.currentRouteName !== 'public.cfs.new-speaker' && this.session.currentRouteName !== 'public.cfs.edit-speaker' && this.session.currentRouteName !== 'public.cfs.edit-session';
    }
  }),
  actions: {
    toggleMenu() {
      this.toggleProperty('isMenuOpen');
    }
  }
});
