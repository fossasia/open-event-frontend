import Controller from '@ember/controller';
import AdminSalesMixin from 'open-event-frontend/mixins/admin-sales';
import { computed } from '@ember/object';

export default Controller.extend(AdminSalesMixin, {
  salesTotal: computed(function() {
    let sum = 0;
    this.get('model').forEach(data => {
      sum += data.sales.completed.ticket_count;
    });
    return sum;
  }),
  discountsTotal: computed(function() {
    let sum = 0;
    this.get('model').forEach(data => {
      sum += data.sales.completed.sales_total;
    });
    return sum;
  }),
  columnNames: computed(function() {
    return {
      rowspan: [{
        colname : this.get('l10n').t('Marketers'),
        class   : '',
        span    : 2
      }],
      colspan: [{
        colname : this.get('l10n').t('Completed Orders'),
        class   : 'ui green inverted segment center aligned',
        span    : 3
      }]
    };
  }),
  subColumnNames: computed(function() {
    return [
      this.get('l10n').t('Tickets'),
      this.get('l10n').t('Sales'),
      this.get('l10n').t('Tickets'),
      this.get('l10n').t('Sales'),
      this.get('l10n').t('Tickets'),
      this.get('l10n').t('Sales')
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
      type         : '$',
      class        : 'right aligned'
    }
  ],

  totalRow: computed(function() {
    return [
      {
        value: this.get('ticketsTotal')
      },
      {
        value: `US$ ${this.get('salesTotal')}`
      },
      {
        value: `US$ ${this.get('discountsTotal')}`
      }
    ];
  }),

  totalSpan: 1
});
