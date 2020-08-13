import Controller from '@ember/controller';
import { computed, action } from '@ember/object';

export default class extends Controller {

  @computed('model.subTopics')
  get data() {
    const topics = this.model.subTopics;
    topics.forEach(topic => {
      if (!topic.get('placeholder.content')) {
        topic.set('placeholder', this.store.createRecord('custom-placeholder', {
          name          : topic.name,
          eventSubTopic : topic
        }));
      }
    });
    return topics;
  }

  @action
  openModal(placeholder) {
    this.set('isModalOpen', true);
    this.set('selectedPlaceholder', placeholder);
  }
}
