import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

@classic
export default class BasicDetailsRoute extends Route.extend(EventWizardMixin) {
  titleToken() {
    return this.l10n.t('Basic Details');
  }

  model() {
    return this.modelFor('events.view.edit');
  }
}
