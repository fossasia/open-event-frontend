import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class ExhibitorsListController extends Controller.extend(EmberTableControllerMixin) {
  @service notify;
  @service errorHandler;

  get columns() {
    return [
      {
        name            : this.l10n.t('State'),
        headerComponent : 'tables/headers/sort',
        cellComponent   : 'ui-table/cell/events/view/sessions/cell-buttons',
        width           : 60,
        valuePath       : 'status',
        isSortable      : true,
        extraValuePaths : ['id', 'status'],
        options         : {
          sessionStateMap: {
            organizer: {
              accepted : { pending: true },
              pending  : { accepted: true }
            }
          }
        },
        actions: {
          changeState: this.changeState.bind(this)
        }
      },
      {
        name          : this.l10n.t('Logo'),
        valuePath     : 'logoUrl',
        width         : 60,
        cellComponent : 'ui-table/cell/cell-image'
      },
      {
        name            : this.l10n.t('Name'),
        valuePath       : 'name',
        extraValuePaths : ['id'],
        cellComponent   : 'ui-table/cell/cell-actions',
        options         : {
          actions: [{
            icon  : 'edit',
            text  : this.l10n.t('Edit'),
            route : 'events.view.exhibitors.edit'
          }, {
            icon   : 'trash',
            text   : this.l10n.t('Delete'),
            method : this.delete.bind(this)
          }]
        }
      },
      {
        name          : this.l10n.t('Description'),
        width         : 240,
        cellComponent : 'ui-table/cell/cell-sponsor-sanitize',
        valuePath     : 'description'
      },
      {
        name          : this.l10n.t('URL'),
        valuePath     : 'url',
        cellComponent : 'ui-table/cell/cell-url'
      }
    ];
  }

  @action async changeState(id, state) {
    const exhibitor =  this.store.peekRecord('exhibitor', id, { backgroundReload: false });
    const oldState = exhibitor.status;
    exhibitor.set('status', state);
    this.set('isLoading', true);

    try {
      await exhibitor.save();
      this.notify.success(this.l10n.t('{{item}} has been {{action}} successfully.', {
        item   : this.l10n.t('Exhibitor'),
        action : state
      }), {
        id: 'exhibitor_state'
      });
      this.refreshModel.bind(this)();
    } catch (e) {
      exhibitor.set('status', oldState);
      this.errorHandler.handle(e);
    } finally {
      this.set('isLoading', false);
    }
  }

  @action async delete(id) {
    try {
      await this.confirm.prompt(this.l10n.t('Are you sure you would like to delete this Exhibitor?'));
    } catch {
      return;
    }
    this.set('isLoading', true);
    const exhibitor = this.store.peekRecord('exhibitor', id, { backgroundReload: true });
    try {
      await exhibitor.destroyRecord();
      this.notify.success(this.l10n.t('Exhibitor has been deleted successfully.'));
      this.refreshModel();
    } catch (e) {
      console.error('Error while deleting exhibitor', e);
      this.errorHandler.handle(e);
    }
    this.set('isLoading', false);
  }
}
