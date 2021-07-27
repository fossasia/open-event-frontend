import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ExploreRoute extends Route {
  titleToken() {
    return this.l10n.t('Explore');
  }

  beforeModel() {
    super.beforeModel(...arguments);
    this.transitionTo('explore.events');
  }
}
