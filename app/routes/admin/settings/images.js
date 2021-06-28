import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class ImagesRoute extends Route {
  titleToken() {
    return this.l10n.t('Images');
  }

  async model() {
    return hash({
      speakerImageSize : this.store.queryRecord('speaker-image-size', 1),
      eventImageSize   : this.store.queryRecord('event-image-size', 1)
    });
  }

  @action
  willTransition() {
    this.controller.model.speakerImageSize.rollbackAttributes();
    this.controller.model.eventImageSize.rollbackAttributes();
  }
}
