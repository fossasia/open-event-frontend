import Component from '@ember/component';
import { computed } from '@ember/object';
import { forOwn } from 'lodash-es';
import { pascalCase } from 'open-event-frontend/utils/string';

export default Component.extend({
  classNames: ['column'],

  tags: computed('event.type', 'event.topic', 'event.subTopic', function() {
    // Unfortunately, due to the extremely dynamic and stringy nature
    // of ember, the next line crashes on using object destructuring
    // and we don't have time and resources to chase down issues originating
    // from ember core, hence disabling the lint
    const tagsOriginal = this.getProperties('event.topic.name', 'event.type.name', 'event.subTopic.name');  // eslint-disable-line ember/no-get
    let tags = [];
    forOwn(tagsOriginal, value => {
      if (value && value.trim() !== '') {
        tags.push(`#${pascalCase(value)}`);
      }
    });
    return tags;
  }),

  actions: {
    selectCategory(category, subCategory) {
      this.set('category', (category === this.category && !subCategory) ? null : category);
      this.set('subCategory', (!subCategory || subCategory === this.subCategory) ? null : subCategory);
    },

    selectEventType(eventType) {
      this.set('eventType', eventType === this.eventType ? null : eventType);
    }
  }
});
