import Controller from '@ember/controller';
import { computed, action } from '@ember/object';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';

export default class extends Controller.extend(EmberTableControllerMixin) {

  @computed()
  get sponsorsColumns() {
    return [
      {
        name          : 'Logo',
        valuePath     : 'logo-url',
        cellComponent : 'ui-table/cell/cell-image'
      },
      {
        name            : 'Name',
        valuePath       : 'name',
        headerComponent : 'tables/headers/sort',
        isSortable      : true

      },
      {
        name          : 'Type',
        valuePath     : 'type',
        cellComponent : 'ui-table/cell/cell-sponsor-sanitize'
        // extraValuePaths : ['type'],
        // options         : {
        //   PropName: 'type'
        // }
      },
      {
        name          : 'Level',
        valuePath     : 'level',
        cellComponent : 'ui-table/cell/cell-sponsor-sanitize'
        // extraValuePaths : ['level'],
        // options         : {
        //   PropName: 'level'
        // }
      },
      {
        name          : 'Options',
        valuePath     : 'options',
        cellComponent : 'ui-table/cell/cell-sponsor-options',
        actions       : {
          editSponsor   : this.editSponsor.bind(this),
          deleteSponsor : this.deleteSponsor.bind(this)
        }
      }
    ];
  }

  @action
  deleteSponsor(sponsor) {
    this.set('isLoading', true);
    sponsor.destroyRecord()
      .then(() => {
        this.notify.success(this.l10n.t('Sponsor has been deleted successfully.'));
        this.refreshModel.bind(this)();
      })
      .catch(() => {
        this.notify.error(this.l10n.t('An unexpected error has occurred.'));
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  editSponsor() {
    this.transitionToRoute('events.view.edit.sponsors');
  }
}

