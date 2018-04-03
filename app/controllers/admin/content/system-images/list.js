import Controller from '@ember/controller';
import { computed } from '@ember/object';
export default Controller.extend({
  data: computed('model.subTopics', function() {
    let topics = this.get('model.subTopics');
    topics.forEach(topic => {
      if (!topic.get('placeholder.content')) {
        topic.set('placeholder', this.store.createRecord('custom-placeholder', {
          name          : topic.get('name'),
          eventSubTopic : topic
        }));
      }
    });
    return topics;
  }),
  actions: {
    openModal(placeholder) {
      this.set('isModalOpen', true);
      this.set('selectedPlaceholder', placeholder);
    }
  }
});
