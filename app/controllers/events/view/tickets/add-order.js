import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { sumBy } from 'lodash';

export default Controller.extend({
  hasTicketsInOrder: computed('model.@each.quantity', function() {
    return sumBy(this.get('model'), item => item.get('quantity')) > 0;
  }),
  total: computed('model.@each.itemTotal', function() {
    let sum = 0.0;
    this.get('model').forEach(ticket => {
      sum += ticket.get('itemTotal');
    });
    return sum;
  }),
  columns: [
    {
      propertyName : 'name',
      title        : 'Ticket Type'
    },
    {
      propertyName   : 'price',
      title          : 'Price(US$)',
      disableSorting : true
    },
    {
      propertyName : '',
      title        : 'Quantity',
      template     : 'components/ui-table/cell/cell-input-number'
    },
    {
      propertyName : 'itemTotal',
      title        : 'Item Total'
    }
  ]
});
