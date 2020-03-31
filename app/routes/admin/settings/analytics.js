import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Route from '@ember/routing/route';

@classic
export default class AnalyticsRoute extends Route {
  titleToken() {
    return this.l10n.t('Analytics');
  }

  @action
  willTransition() {
    this.controller.model.rollbackAttributes();
  }
}
