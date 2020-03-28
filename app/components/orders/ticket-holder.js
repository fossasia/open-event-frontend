import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  buyer: computed('data.user', function() {
    return this.data.user;
  })
});
