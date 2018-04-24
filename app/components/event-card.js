import Component from '@ember/component';
import { computed } from '@ember/object';
import { forOwn } from 'lodash';
import { pascalCase } from 'open-event-frontend/utils/string';

export default Component.extend({
  classNames: ['column'],

  tags: computed('event.type', 'event.topic', 'event.subTopic', function() {
    const tagsOriginal = this.getProperties('event.topic.name', 'event.type.name', 'event.subTopic.name');
    let tags = [];
    forOwn(tagsOriginal, value => {
      if (value && value.trim() !== '') {
        tags.push(`#${pascalCase(value)}`);
      }
    });
    return tags;
  })
});
