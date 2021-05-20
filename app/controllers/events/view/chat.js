import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  async toggleChat() {
    this.set('model.isChatEnabled', !this.model.isChatEnabled);
    try {
      await this.model.save();
    } catch (error) {
      console.error('Error while enabling chat', error);
    }
  }
}
