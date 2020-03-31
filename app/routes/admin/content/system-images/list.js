import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ListRoute extends Route {
  titleToken() {
    return this.l10n.t('Sub topics');
  }

  model(params) {
    this.set('params', params);
    return this.store.findRecord('event-topic', params.topic_id, { include: 'event-sub-topics' });
  }
}
