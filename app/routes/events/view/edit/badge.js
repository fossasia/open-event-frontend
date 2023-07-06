import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import CustomFormMixin from 'open-event-frontend/mixins/event-wizard';
@classic
export default class BadgeRoute extends Route.extend(CustomFormMixin) {
  titleToken() {
    return this.l10n.t('Badges');
  }

  async model() {
    const event = this.modelFor('events.view');
    const data = {
      event,
      badges          : [],
      isBadgesEnabled : false,
      tickets         : (await event.query('tickets', {}))
    };
    return data;
  }
}
