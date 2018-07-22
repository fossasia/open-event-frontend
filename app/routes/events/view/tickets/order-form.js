import Route from '@ember/routing/route';
import CustomFormMixin from 'open-event-frontend/mixins/custom-form';

export default Route.extend(CustomFormMixin, {
  titleToken() {
    return this.get('l10n').t('Order Form');
  },
  actions: {
    /**
     * Save the forms.
     */
    save() {
      // save the forms.
    }
  },
  async model() {
    let filterOptions = [{
      name : 'form',
      op   : 'eq',
      val  : 'attendee'
    }];
    return {
      customForms: await this.modelFor('events.view').query('customForms', {
        filter       : filterOptions,
        sort         : 'field-identifier',
        'page[size]' : 50
      })
    };
  },
  afterModel(model) {
    /**
     * Create the custom forms if no form exists.
     */
    if (model.customForms.length === 0) {
      model.customForms = this.getCustomAttendeeForm(this.modelFor('events.view').get('event'));
    }
  }
});
