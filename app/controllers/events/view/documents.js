import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class extends Controller {

  @service errorHandler;

  @action
  async toggleDocument() {
    this.set('model.isDocumentEnabled', !this.model.isDocumentEnabled);
    if (!this.model.documentLinks && this.model.isDocumentEnabled) {
      this.model.documentLinks = [{ name: '', link: '' }];
    }
    try {
      await this.model.save();
    } catch (error) {
      console.error('Error while enabling document', error);
      this.errorHandler.handle(error);
    }
  }
}
