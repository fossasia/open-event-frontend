import Controller from '@ember/controller';
import AdminSalesMixin from 'open-event-frontend/mixins/admin-sales';
import { or } from '@ember/object/computed';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class IndexController extends Controller.extend(AdminSalesMixin, EmberTableControllerMixin) {

@or('authManager.currentUser.isSuperAdmin', 'authManager.currentUser.isAdmin') hasRestorePrivileges;
// sort_by = 'total-sales';
sort_dir = 'DSC';
per_page = 10;
get columns() {
  return [
    {
      name            : this.l10n.t('Events'),
      valuePath       : 'name',
      isSortable      : true,
      headerComponent : 'tables/headers/sort'
    },
    {
      name            : this.l10n.t('Owner'),
      valuePath       : 'owner',
      extraValuePaths : ['ownerId'],
      cellComponent   : 'ui-table/cell/admin/sales/cell-first-name',
      isSortable      : true,
      headerComponent : 'tables/headers/sort'
    },
    {
      name            : this.l10n.t('Type'),
      valuePath       : 'type',
      isSortable      : true,
      headerComponent : 'tables/headers/sort'
    },
    {
      name            : this.l10n.t('Event Date'),
      valuePath       : 'startsAt',
      isSortable      : true,
      headerComponent : 'tables/headers/sort',
      extraValuePaths : ['timezone'],
      cellComponent   : 'ui-table/cell/cell-simple-date'
    },
    {
      name            : this.l10n.t('Completed Orders'),
      headerComponent : 'tables/headers/sort',
      color           : 'green',
      subcolumns      : [
        {
          name            : this.l10n.t('Tickets'),
          valuePath       : 'completedOrderTickets',
          headerComponent : 'tables/headers/sort',
          isSortable      : true,
          width           : 30
        },
        {
          name            : this.l10n.t('Sales'),
          valuePath       : 'completedOrderSales',
          extraValuePaths : ['paymentCurrency'],
          headerComponent : 'tables/headers/sort',
          isSortable      : true,
          cellComponent   : 'ui-table/cell/admin/sales/cell-amount'
        }
      ]
    },
    {
      name            : this.l10n.t('Placed Orders'),
      color           : 'blue',
      headerComponent : 'tables/headers/sort',
      subcolumns      : [
        {
          name            : this.l10n.t('Tickets'),
          valuePath       : 'placedOrderTickets',
          headerComponent : 'tables/headers/sort',
          isSortable      : true,
          width           : 30
        },
        {
          name            : this.l10n.t('Sales'),
          valuePath       : 'placedOrderSales',
          headerComponent : 'tables/headers/sort',
          isSortable      : true,
          extraValuePaths : ['paymentCurrency'],
          cellComponent   : 'ui-table/cell/admin/sales/cell-amount'
        }
      ]
    },
    {
      name            : this.l10n.t('Pending Orders'),
      color           : 'yellow',
      headerComponent : 'tables/headers/sort',
      subcolumns      : [
        {
          name            : this.l10n.t('Tickets'),
          valuePath       : 'pendingOrderTickets',
          headerComponent : 'tables/headers/sort',
          isSortable      : true,
          width           : 30
        },
        {
          name            : this.l10n.t('Sales'),
          valuePath       : 'pendingOrderSales',
          headerComponent : 'tables/headers/sort',
          isSortable      : true,
          extraValuePaths : ['paymentCurrency'],
          cellComponent   : 'ui-table/cell/admin/sales/cell-amount'
        }
      ]
    }
  ];
}
}
