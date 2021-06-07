import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  async toggleDocument() {
    this.set('model.isDocumentEnabled', !this.model.isDocumentEnabled);
    try {
      await this.model.save();
    } catch (error) {
      console.error('Error while enabling document', error);
    }
  }
}
