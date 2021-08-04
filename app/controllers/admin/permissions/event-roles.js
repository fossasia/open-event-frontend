import Controller from '@ember/controller';
import { computed, action } from '@ember/object';

export default class extends Controller {
  @computed('model.services')
  get services() {
    return this.model.services.sortBy('name');
  }

  @computed('model.permissions')
  get permissions() {
    return this.model.permissions.sortBy('serviceName');
  }

  @action
  updatePermissions() {
    this.set('isLoading', true);
    this.model.permissions.save()
      .then(() => {
        this.notify.success(this.l10n.t('Admin Event role permissions have been saved successfully.'),
          {
            id: 'admin_event_succ'
          });
      })
      .catch(err => {
        console.error('Error while saving admin event role permissions', err);
        this.notify.error(err,
          {
            id: 'admin_event_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }
}
