import Route from '@ember/routing/route';

export default class ExhibitorsEditRoute extends Route {
  titleToken() {
    return this.l10n.t('Edit Exhibitor');
  }

  async model(params) {
    return this.store.findRecord('video-channel', params.videoChannel_id, {});
  }
}
