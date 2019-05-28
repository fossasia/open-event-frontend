import { filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';

export default Controller.extend({
  footerPages: filterBy('model', 'place', 'footer'),

  eventPages: filterBy('model', 'place', 'event'),

  actions: {
    updateCurrentPage(page, type) {
      if (type === 'create') {
        this.set('isCreate', true);
        this.set('currentForm', this.store.createRecord('page'));
      } else {
        this.set('isCreate', false);
        this.set('currentForm', page);
      }
      this.set('isFormOpen', true);
    },
    savePage(page) {
      page.save()
        .then(() => {
          if (this.isCreate) {
            this.set('isFormOpen', false);
          }
          this.notify.success(this.l10n.t('Page details have been saved successfully.'));
        })
        .catch(() => {
          this.notify.error(this.l10n.t('An unexpected error has occurred. Page Details not saved.'));
        });
    }
  }
});
