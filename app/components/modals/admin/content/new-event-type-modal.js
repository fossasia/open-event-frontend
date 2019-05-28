import FormMixin from 'open-event-frontend/mixins/form';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend(FormMixin, {
  isSmall            : true,
  autoScrollToErrors : false,

  actions: {
    addEventProperty(modelInstance) {
      this.onValid(() => {
        this.sendAction('addEventProperty', modelInstance);
      });
    }
  },
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        typeName: {
          identifier : 'type_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a event type')
            }
          ]
        }
      }
    };
  }
});
