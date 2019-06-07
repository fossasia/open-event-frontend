import Controller from '@ember/controller';
import AdminSalesMixin from 'open-event-frontend/mixins/admin-sales';
import { computed } from '@ember/object';

export default Controller.extend(AdminSalesMixin, {
  ticketsTotal: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.ticketCount;
    });
    return sum;
  }),

  revenueTotal: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.revenue;
    });
    return sum;
  }),
  columnNames: computed(function() {
    return {
      rowspan: [{
        colname : this.l10n.t('Events'),
        class   : '',
        span    : 2
      }],
      colspan: [{
        colname : this.l10n.t('Completed Orders'),
        class   : 'ui green inverted segment center aligned',
        span    : 3
      }]
    };
  }),
  subColumnNames: computed(function() {
    return [
      this.l10n.t('Tickets'),
      this.l10n.t('Fee'),
      this.l10n.t('Revenue')
    ];
  }),
  columnValues: [
    {
      propertyName : 'name',
      type         : 'string',
      class        : ''
    }, {
      propertyName : 'ticketCount',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'feePercentage',
      type         : 'percentage',
      class        : 'right aligned'
    }, {
      propertyName : 'revenue',
      type         : 'currency',
      class        : 'right aligned'
    }
  ]
});

