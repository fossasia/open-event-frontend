import Route from '@ember/routing/route';

export default class VideoChannelEditRoute extends Route {
  titleToken() {
    return this.l10n.t('Edit Video Channel');
  }

  async model(params) {
    return this.store.findRecord('video-channel', params.videoChannel_id, {});
  }
}
