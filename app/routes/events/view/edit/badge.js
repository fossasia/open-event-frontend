import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import CustomFormMixin from 'open-event-frontend/mixins/event-wizard';
import { A } from '@ember/array';
@classic
export default class BadgeRoute extends Route.extend(CustomFormMixin) {
  titleToken() {
    return this.l10n.t('Badges');
  }

  async model() {
    const filterOptions = [{
      name : 'form',
      op   : 'eq',
      val  : 'badge'
    }];

    const event = this.modelFor('events.view');
    const data = {
      event,
      forms       : [],
      tickets     : (await event.query('tickets', {})),
      customForms : (await event.query('customForms', {
        filter       : filterOptions,
        sort         : 'id',
        'page[size]' : 500
      })).toArray().filter(field => field.form === 'badge')
    };
    return data;
  }

  afterModel(data) {
    /**
     * Create the additional custom forms if only the compulsory forms exist.
     */
    if (data.customForms.length === 3) {
      const customForms = A();
      for (const customForm of data.customForms ? data.customForms.toArray() : []) {
        customForms.pushObject(customForm);
      }

      // const createdCustomForms = this.getCustomAttendeeForm(data.event);

      // for (const customForm of createdCustomForms ? createdCustomForms : []) {
      //   customForms.pushObject(customForm);
      // }

      data.customForms = customForms;
    }
  }
}
