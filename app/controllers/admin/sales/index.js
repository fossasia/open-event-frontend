import Controller from '@ember/controller';
import AdminSalesMixin from 'open-event-frontend/mixins/admin-sales';
import { computed } from '@ember/object';

export default Controller.extend(AdminSalesMixin, {
  columnNames: computed(function() {
    return {
      rowspan: [{
        colname : this.get('l10n').t('Events'),
        class   : '',
        span    : 2
      }, {
        colname : this.get('l10n').t('Events Date'),
        class   : '',
        span    : 2
      }],
      colspan: [{
        colname : this.get('l10n').t('Completed Orders'),
        class   : 'ui green inverted segment center aligned',
        span    : 2
      }, {
        colname : this.get('l10n').t('Placed Orders'),
        class   : 'ui blue inverted segment center aligned',
        span    : 2
      }, {
        colname : this.get('l10n').t('Pending Orders'),
        class   : 'ui yellow inverted segment center aligned',
        span    : 2
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
      propertyName : 'name',
      type         : '',
      class        : ''
    }, {
      propertyName : 'startsAt',
      type         : 'date',
      class        : ''
    }, {
      propertyName : 'sales.completed.ticket_count',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.completed.sales_total',
      type         : '$',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.placed.ticket_count',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.placed.sales_total',
      type         : '$',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.pending.ticket_count',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.pending.sales_total',
      type         : '$',
      class        : 'right aligned'
    }
  ],

  totalRow: computed(function() {
    return [
      {
        value: this.get('totalCompletedTickets')
      },
      {
        value: `US$ ${this.get('totalCompletedSales')}`
      },
      {
        value: this.get('totalPlacedTickets')
      },
      {
        value: `US$ ${this.get('totalPlacedTickets')}`
      },
      {
        value: this.get('totalPlacedTickets')
      },
      {
        value: `US$ ${this.get('totalPlacedTickets')}`
      }
    ];
  }),

  totalSpan: 2
});
