import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  footerPages: computed.filterBy('model', 'place', 'footer'),

  eventPages: computed.filterBy('model', 'place', 'event'),

  actions: {
    updateCurrentPage(page, type) {
      if (type === 'create') {
        this.set('isCreate', true);
        this.set('currentForm', this.get('store').createRecord('page'));
      } else {
        this.set('isCreate', false);
        this.set('currentForm', page);
      }
      this.set('isFormOpen', true);
    },
    savePage(page) {
      page.save()
        .then(() => {
          if (this.get('isCreate')) {
            this.set('isFormOpen', false);
          }
          this.notify.success(this.l10n.t('Page details have been saved successfully.'));
        })
        .catch(()=> {
          this.notify.error(this.l10n.t('An unexpected error has occured. Page Details not saved.'));
        });
    }
  }
});
