import Component from '@ember/component';
import { computed } from '@ember/object';
import { isEqual } from '@ember/utils';

export default Component.extend({
  isFreeOrder: computed('order', function() {
    const amount = this.get('order.amount');
    return amount === null || isEqual(amount, 0);
  })
});
