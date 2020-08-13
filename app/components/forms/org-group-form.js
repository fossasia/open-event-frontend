import Component from '@glimmer/component';

import FormMixin from 'open-event-frontend/mixins/form';
// OrgGroupForm
export default Component.extend(FormMixin, {

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',

      fields: {
        name: {
          identifier : 'name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter your Organizer or Group name')
            }
          ]
        },
        family: {
          identifier : 'details',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter about the Organizer or Group')
            }
          ]
        }
      }
    };
  },

  actions: {
    submit(data) {
      this.onValid(() => {
        this.sendAction('save', data);
      });
    }
  }
});
