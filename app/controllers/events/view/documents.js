import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {

  @service errorHandler;

  @action
  async toggleDocument() {
    this.set('model.isDocumentEnabled', !this.model.isDocumentEnabled);
    try {
      await this.model.save();
    } catch (error) {
      console.error('Error while enabling document', error);
      this.errorHandler.handle(error);
    }
  }

  @action
  removeDocument(document) {
    this.model.documentLinks = this.model.documentLinks.filter(dl => dl !== document);
  }

  @action
  addEventDocument() {
    if (!this.model.documentLinks) {
      this.model.documentLinks = [];
    }
    this.model.documentLinks = [...this.model.documentLinks, { name: '', link: '' }];
  }

  @action
  async submit() {
    try {
      await this.model.save();
      this.notify.success(this.l10n.t('Document updated successfully'),
        {
          id: 'doc_upd_succ'
        });
    } catch (error) {
      console.error('Error while saving document', error);
      this.errorHandler.handle(error);
    }
  }
}
