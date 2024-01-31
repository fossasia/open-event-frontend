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
    const filterOptions = [{
      name : 'form',
      op   : 'eq',
      val  : 'attendee'
    }];
    const data = {
      event,
      badges      : [],
      tickets     : (await event.query('tickets', { 'page[size]': 0 })),
      badgeForms  : (await event.query('badgeForms', { 'page[size]': 0 })),
      customForms : (await event.query('customForms', {
        filter       : filterOptions,
        sort         : 'id',
        'page[size]' : 500
      })).toArray().filter(field => field.form === 'attendee')
    };
    return data;
  }
}
