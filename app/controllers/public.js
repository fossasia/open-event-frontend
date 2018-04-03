import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  smallLead: computed('session.currentRouteName', function() {
    if (this.get('session.currentRouteName')) {
      return this.get('session.currentRouteName') !== 'public.index';
    }
  }),
  actions: {
    toggleMenu() {
      this.toggleProperty('isMenuOpen');
    }
  }
});
