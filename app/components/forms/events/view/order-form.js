import Component from '@ember/component';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        orderExpiryTime: {
          identifier : 'orderExpiryTime',
          rules      : [
            {
              type   : 'integer[1..60]',
              prompt : this.l10n.t('Please enter a valid registration time limit between 1 to 60 minutes.')
            }
          ]
        }
      }
    };
  },
  actions: {
    submit(data) {
      this.onValid(() => {
        this.save(data);
      });
    }
  }
});
