import Controller from '@ember/controller';
import AdminSalesMixin from 'open-event-frontend/mixins/admin-sales';
import { computed } from '@ember/object';

export default Controller.extend(AdminSalesMixin, {
  salesTotal: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.completed.ticket_count;
    });
    return sum;
  }),
  discountsTotal: computed(function() {
    let sum = 0;
    this.model.forEach(data => {
      sum += data.sales.completed.sales_total;
    });
    return sum;
  }),
  columnNames: computed(function() {
    return {
      rowspan: [{
        colname : this.l10n.t('Marketers'),
        class   : '',
        span    : 4
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
      this.l10n.t('Sales'),
      this.l10n.t('Total')
    ];
  }),
  columnValues: [
    {
      propertyName : 'fullname',
      type         : '',
      class        : ''
    }, {
      propertyName : 'tickets',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.completed.ticket_count',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.completed.sales_total',
      type         : 'currency',
      class        : 'right aligned'
    }
  ],

  totalRow: computed(function() {
    return [
      {
        value: this.ticketsTotal
      },
      {
        value: `US$ ${this.salesTotal}`
      },
      {
        value: `US$ ${this.discountsTotal}`
      }
    ];
  }),

  totalSpan: 1
});
