import Ember from 'ember';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

const { Route } = Ember;

export default Route.extend(EventWizardMixin, {
  titleToken() {
    return this.l10n.t('Basic Details');
  },
  model() {
    return {
      parentData : this._super(...arguments),
      event      : this.getBasicDetails()
    };
  }
});
