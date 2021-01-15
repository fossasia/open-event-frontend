import { filterBy } from '@ember/object/computed';
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {

  @filterBy('model', 'place', 'footer') footerPages;

  @filterBy('model', 'place', 'event') eventPages;

  @action
  updateCurrentPage(page, type) {
    if (type === 'create') {
      this.set('isCreate', true);
      this.set('currentForm', this.store.createRecord('page'));
    } else {
      this.set('isCreate', false);
      this.set('currentForm', page);
    }
    this.set('isFormOpen', true);
  }

  @action
  savePage(page) {
    page.save()
      .then(() => {
        if (this.isCreate) {
          this.set('isFormOpen', false);
        }
        this.notify.success(this.l10n.t('Page details have been saved successfully.'),
          {
            id: 'page_detail_succ'
          });
      })
      .catch(e => {
        console.error('Error saving page details', e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. Page Details not saved.'),
          {
            id: 'page_detail_del'
          });
      });
  }
}
