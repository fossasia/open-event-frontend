import FormMixin from 'open-event-frontend/mixins/form';
import ModalBase from 'open-event-frontend/components/modals/modal-base';

export default ModalBase.extend(FormMixin, {
  isSmall            : true,
  autoScrollToErrors : false,

  actions: {
    addEventProperty(modelInstance, eventTopic) {
      this.onValid(() => {
        modelInstance.set('eventTopic', eventTopic);
        this.addEventProperty(modelInstance);
      });
    }
  },
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        subTopicName: {
          identifier : 'sub_topic_name',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a sub topic name')
            }
          ]
        }
      }
    };
  }
});
