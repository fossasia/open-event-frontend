import Route from '@ember/routing/route';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { A } from '@ember/array';
export default Route.extend(EventWizardMixin, {

  titleToken() {
    return this.l10n.t('Attendee Form');
  },

  async model() {
    let filterOptions = [{
      name : 'form',
      op   : 'eq',
      val  : 'attendee'
    }];

    let data = {
      event: this.modelFor('events.view')
    };
    data.customForms = await data.event.query('customForms', {
      filter       : filterOptions,
      sort         : 'id',
      'page[size]' : 50
    });

    return data;
  },
  afterModel(data) {
    /**
     * Create the additional custom forms if only the compulsory forms exist.
     */
    if (data.customForms.length === 3) {
      let customForms = A();
      for (const customForm of data.customForms ? data.customForms.toArray() : []) {
        customForms.pushObject(customForm);
      }

      const createdCustomForms = this.getCustomAttendeeForm(data.event);

      for (const customForm of createdCustomForms ? createdCustomForms : []) {
        customForms.pushObject(customForm);
      }

      data.customForms = customForms;
    }
  }
});
