import Controller from '@ember/controller';
import { camelCase, startCase } from 'lodash-es';

export default Controller.extend({

  disableEventSubtopic : true,
  currentTopicSelected : null,

  actions: {
    async loadSubTopics(topic) {
      this.set('isLoading', true);
      try {
        this.set('model.eventSubTopics', await topic.get('subTopics').toArray());
        this.set('disableEventSubtopic', false);
        this.set('currentTopicSelected', topic);
      } catch (e) {
        this.notify.error(this.get('l10n').t('An unexpected error has occurred. SubTopics not loaded.'));
      } finally {
        this.set('isLoading', false);
      }
    },
    openModalFor(modelInstanceOrName) {
      const modelName = typeof modelInstanceOrName === 'string' ? modelInstanceOrName : modelInstanceOrName.constructor.modelName;
      const modelInstance = typeof modelInstanceOrName === 'string' ? this.store.createRecord(modelInstanceOrName) : modelInstanceOrName;
      const camelCasedValue = camelCase(modelName);
      this.set(camelCasedValue, modelInstance);
      modelInstance.openModal = true;
    },
    deleteEventProperty(eventProp) {
      this.set('isLoading', true);
      const modelName = camelCase(eventProp.constructor.modelName);
      eventProp.destroyRecord()
        .then(() => {
          this.get(`model.${modelName}s`).removeObject(eventProp);
          this.notify.success(this.get('l10n').t('This Event Property has been deleted successfully.'));
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t('An unexpected error has occurred. Event Type was not deleted.'));
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    },
    addEventProperty(modelInstance) {
      const camelCasedValue = camelCase(modelInstance.constructor.modelName);
      this.set('isLoading', true);
      modelInstance.save()
        .then(() => {
          this.get(`model.${camelCasedValue}s`).addObject(modelInstance);
          this.notify.success(this.get('l10n').t(`${startCase(camelCasedValue)} has been added successfully.`));
        })
        .catch(() => {
          this.notify.error(this.get('l10n').t(`An unexpected error has occurred. ${startCase(camelCasedValue)} not saved.`));
        })
        .finally(() => {
          this.set('isLoading', false);
          this.set(camelCasedValue, null);
        });
    }
  }
});
