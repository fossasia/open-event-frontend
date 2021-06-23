import Route from '@ember/routing/route';
import EmberTableRouteMixin from 'open-event-frontend/mixins/ember-table-route';

export default class extends Route.extend(EmberTableRouteMixin) {
  titleToken() {
    return this.l10n.t('Create Video Channel');
  }

  async model() {
    const videoChannel = await this.store.createRecord('video-channel', {});

    return videoChannel;
  }
}
