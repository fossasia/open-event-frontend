import Controller from '@ember/controller';
import { camelCase, startCase } from 'lodash-es';
import { action } from '@ember/object';

export default class extends Controller {

  disableEventSubtopic = true;
  currentTopicSelected = null;

  @action
  async loadSubTopics(topic) {
    this.set('isLoading', true);
    try {
      this.set('model.eventSubTopics', await topic.subTopics.toArray());
      this.set('disableEventSubtopic', false);
      this.set('currentTopicSelected', topic);
    } catch (e) {
      console.error('Error while updating subtopics', e);
      this.notify.error(this.l10n.t('An unexpected error has occurred. SubTopics not loaded.'),
        {
          id: 'subtop_error'
        });
    } finally {
      this.set('isLoading', false);
    }
  }

  @action
  openModalFor(modelInstanceOrName) {
    const modelName = typeof modelInstanceOrName === 'string' ? modelInstanceOrName : modelInstanceOrName.constructor.modelName;
    const modelInstance = typeof modelInstanceOrName === 'string' ? this.store.createRecord(modelInstanceOrName) : modelInstanceOrName;
    const camelCasedValue = camelCase(modelName);
    this.set(camelCasedValue, modelInstance);
    modelInstance.openModal = true;
  }

  @action
  deleteEventProperty(eventProp) {
    this.set('isLoading', true);
    const modelName = camelCase(eventProp.constructor.modelName);
    eventProp.destroyRecord()
      .then(() => {
        this.get(`model.${modelName}s`).removeObject(eventProp);
        this.notify.success(this.l10n.t('This Event Property has been deleted successfully.'),
          {
            id: 'event_prop_del'
          });
      })
      .catch(e => {
        console.error('Error while deleting ' + modelName, e);
        this.notify.error(this.l10n.t('An unexpected error has occurred. Event Type was not deleted.'),
          {
            id: 'event_type_error'
          });
      })
      .finally(() => {
        this.set('isLoading', false);
      });
  }

  @action
  addEventProperty(modelInstance) {
    const camelCasedValue = camelCase(modelInstance.constructor.modelName);
    this.set('isLoading', true);
    modelInstance.save()
      .then(() => {
        this.get(`model.${camelCasedValue}s`).addObject(modelInstance);
        this.notify.success(this.l10n.t('{{item}} has been added successfully.', {
          item: startCase(camelCasedValue)
        }),
        {
          id: 'mode_add_succ'
        });
      })
      .catch(e => {
        console.error('Error while adding ' + camelCasedValue, e);
        this.notify.error(this.l10n.t('An unexpected error has occurred.') + this.l10n.t('{{item}} not saved.', {
          item: startCase(camelCasedValue)
        }),
        {
          id: 'mode_err_succ'
        });
      })
      .finally(() => {
        this.set('isLoading', false);
        this.set(camelCasedValue, null);
      });
  }
}
