import { action } from '@ember/object';
import Route from '@ember/routing/route';

export default class SocialMediaRoute extends Route {
  titleToken() {
    return this.l10n.t('Social Media');
  }

  @action
  willTransition() {
    this.controller.model.rollbackAttributes();
  }
}
