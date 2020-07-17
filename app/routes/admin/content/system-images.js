import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SystemImagesRoute extends Route {
  titleToken() {
    return this.l10n.t('System Images');
  }

  model() {
    return this.store.query('event-topic', {
      include : 'event-sub-topics',
      sort    : 'name'
    });
  }

  afterModel(model, transition) {
    super.afterModel(...arguments);
    if (transition.targetName === 'admin.content.system-images.index') {
      this.replaceWith('admin.content.system-images.list', model.toArray()[0].id);
    }
  }
}
