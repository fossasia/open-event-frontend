import Ember from 'ember';
import { forOwn } from 'lodash';
import { pascalCase } from 'open-event-frontend/utils/string';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: ['column'],

  tags: computed('event.type', 'event.topic', 'event.subTopic', function() {
    const tagsOriginal = this.get('event').getProperties('type', 'topic', 'subTopic');
    let tags = [];
    forOwn(tagsOriginal, value => {
      if (value && value.trim() !== '') {
        tags.push(`#${pascalCase(value)}`);
      }
    });
    return tags;
  })
});
