
import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import EmberTableControllerMixin from 'open-event-frontend/mixins/ember-table-controller';
import { action } from '@ember/object';

export default class extends Controller.extend(EmberTableControllerMixin) {
    per_page = 10;

    @tracked isloading = false;

    get followersColumn() {
      return [
        {
          name            : this.l10n.t('User Image'),
          valuePath       : 'user.avatarUrl',
          extraValuePaths : ['user'],
          cellComponent   : 'ui-table/cell/cell-user-image'
        },
        {
          name      : this.l10n.t('Public Profile Name'),
          valuePath : 'user.publicName'
        },
        {
          name          : this.l10n.t('Group Join Date'),
          valuePath     : 'createdAt',
          cellComponent : 'ui-table/cell/cell-date',
          options       : {
            timezone   : 'UTC',
            dateFormat : 'dddd, D MMMM, YYYY h:mm A'
          }
        },
        {
          name      : this.l10n.t('Email'),
          valuePath : 'user.email'
        }
      ];
    }

    @action
    refreshRoute() {
      this.refresh();
    }
}
