import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class ImagesRoute extends Route {
  titleToken() {
    return this.l10n.t('Images');
  }

  async model() {
    return {
      speakerImageSize : await this.store.queryRecord('speaker-image-size', 1),
      eventImageSize   : await this.store.queryRecord('event-image-size', 1)
    };
  }

  @action
  willTransition() {
    this.controller.model.speakerImageSize.rollbackAttributes();
    this.controller.model.eventImageSize.rollbackAttributes();
  }
}
