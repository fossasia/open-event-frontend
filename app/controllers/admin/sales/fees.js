import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  ticketsTotal: computed(function() {
    let sum = 0;
    this.get('model').forEach(data => {
      sum += data.ticketCount;
    });
    return sum;
  }),

  revenueTotal: computed(function() {
    let sum = 0;
    this.get('model').forEach(data => {
      sum += data.revenue;
    });
    return sum;
  }),

  columnNames: {
    rowspan: [{
      colname : 'Events',
      class   : '',
      span    : 2
    }],
    colspan: [{
      colname : 'Completed Orders',
      class   : 'ui green inverted segment center aligned',
      span    : 3
    }]
  },
  subColumnNames : ['Tickets', 'Fee', 'Revenue'],
  columnValues   : [
    {
      propertyName : 'name',
      type         : '',
      class        : ''
    }, {
      propertyName : 'ticketCount',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'feePercentage',
      type         : '%',
      class        : 'right aligned'
    }, {
      propertyName : 'revenue',
      type         : '$',
      class        : 'right aligned'
    }
  ],

  totalRow: computed(function() {
    return [
      {
        value : this.get('ticketsTotal'),
        span  : 1
      },
      {
        value : `US$ ${this.get('revenueTotal')}`,
        span  : 2
      }
    ];
  }),

  totalSpan: 1
});
