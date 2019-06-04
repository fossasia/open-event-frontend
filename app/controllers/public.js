import Controller from '@ember/controller';
import moment from 'moment';
import { computed } from '@ember/object';

export default Controller.extend({
  smallLead: computed('session.currentRouteName', function() {
    if (this.get('session.currentRouteName')) {
      return this.get('session.currentRouteName') !== 'public.index';
    }
  }),
  displayEndDate: computed('model.startsAtDate', 'model.endsAtDate', function() {
    return !moment(this.model.startsAtDate).isSame(this.model.endsAtDate, 'minute');
  }),
  actions: {
    toggleMenu() {
      this.toggleProperty('isMenuOpen');
    }
  }
});
