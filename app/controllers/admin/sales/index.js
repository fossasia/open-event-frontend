import Controller from '@ember/controller';
import AdminSalesMixin from 'open-event-frontend/mixins/admin-sales';
import { or } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class IndexController extends Controller.extend(AdminSalesMixin, EmberTableControllerMixin) {

@or('authManager.currentUser.isSuperAdmin', 'authManager.currentUser.isAdmin') hasRestorePrivileges;

get columns() {
  return [
    {
      name            : 'Events',
      valuePath       : 'name',
      isSortable      : true,
      headerComponent : 'tables/headers/sort'
    },
    {
      name            : 'Event Date',
      valuePath       : 'startsAt',
      isSortable      : true,
      headerComponent : 'tables/headers/sort',
      extraValuePaths : ['timezone'],
      cellComponent   : 'ui-table/cell/cell-simple-date'
    },
    {
      name            : 'Completed Orders',
      headerComponent : 'tables/headers/sort',
      color           : 'green',
      subcolumns      : [
        {
          name      : 'Tickets',
          valuePath : 'sales.completed.ticket_count',
          width     : 30
        },
        {
          name            : 'Sales',
          valuePath       : 'sales.completed.sales_total',
          extraValuePaths : ['paymentCurrency'],
          cellComponent   : 'ui-table/cell/admin/sales/cell-amount'
        }
      ]
    },
    {
      name            : 'Placed Orders',
      color           : 'blue',
      headerComponent : 'tables/headers/sort',
      subcolumns      : [
        {
          name      : 'Tickets',
          valuePath : 'sales.placed.ticket_count',
          width     : 30
        },
        {
          name            : 'Sales',
          valuePath       : 'sales.placed.sales_total',
          extraValuePaths : ['paymentCurrency'],
          cellComponent   : 'ui-table/cell/admin/sales/cell-amount'
        }
      ]
    },
    {
      name            : 'Pending Orders',
      color           : 'yellow',
      headerComponent : 'tables/headers/sort',
      subcolumns      : [
        {
          name      : 'Tickets',
          valuePath : 'sales.pending.ticket_count',
          width     : 30
        },
        {
          name            : 'Sales',
          valuePath       : 'sales.pending.sales_total',
          extraValuePaths : ['paymentCurrency'],
          cellComponent   : 'ui-table/cell/admin/sales/cell-amount'
        }
      ]
    }
  ];
}

}
