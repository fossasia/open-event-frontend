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
      headerComponent : 'tables/headers/sort'
    },
    {
      name      : 'Completed Tickets',
      valuePath : 'sales.completed.ticket_count',
      width     : 75
    },
    {
      name      : 'Completed Sales',
      valuePath : 'sales.completed.sales_total'
    },
    {
      name      : 'Placed Tickets',
      valuePath : 'sales.placed.ticket_count'
    },
    {
      name      : 'Placed Sales',
      valuePath : 'sales.placed.sales_total'
    },
    {
      name      : 'Pending Tickets',
      valuePath : 'sales.pending.ticket_count'
    },
    {
      name      : 'Pending Sales',
      valuePath : 'sales.pending.sales_total'
    }
  ];
}

}
