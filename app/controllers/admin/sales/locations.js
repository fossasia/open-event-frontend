import Controller from '@ember/controller';
import AdminSalesMixin from 'open-event-frontend/mixins/admin-sales';
import { computed } from '@ember/object';


export default Controller.extend(AdminSalesMixin, {
  columnNames: computed(function() {
    return {
      rowspan: [{
        colname : 'Location',
        class   : '',
        span    : 2
      }],
      colspan: [{
        colname : 'Completed Orders',
        class   : 'ui green inverted segment center aligned',
        span    : 2
      }, {
        colname : 'Placed Orders',
        class   : 'ui blue inverted segment center aligned',
        span    : 2
      }, {
        colname : 'Pending Orders',
        class   : 'ui yellow inverted segment center aligned',
        span    : 2
      }]
    };
  }),
  subColumnNames: computed(function() {
    return [
      this.l10n.t('Tickets'),
      this.l10n.t('Sales'),
      this.l10n.t('Tickets'),
      this.l10n.t('Sales'),
      this.l10n.t('Tickets'),
      this.l10n.t('Sales')
    ];
  }),
  columnValues: [
    {
      propertyName : 'locationName',
      type         : 'string',
      class        : ''
    }, {
      propertyName : 'sales.completed.ticket_count',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.completed.sales_total',
      type         : 'currency',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.placed.ticket_count',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.placed.sales_total',
      type         : 'currency',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.pending.ticket_count',
      type         : '',
      class        : 'right aligned'
    }, {
      propertyName : 'sales.pending.sales_total',
      type         : 'currency',
      class        : 'right aligned'
    }
  ]
});
