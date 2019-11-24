import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  services: computed('model', function() {
    return this.get('model.services').sortBy('name');
  }),
  sortDefinition : ['serviceName'],
  permissions    : computed.sort('model.permissions', 'sortDefinition'),
  actions        : {
    updatePermissions() {
      this.set('isLoading', true);
      this.get('model.permissions').save()
        .then(() => {
          this.notify.success(this.l10n.t('Admin Event role permissions have been saved successfully.'),
            {
              id: 'admin_event_succ'
            });
        })
        .catch(err => {
          this.notify.error(this.l10n.t(err),
            {
              id: 'admin_event_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  }
});
