import Ember from 'ember';
import { forOwn } from 'lodash';
import { pascalCase } from 'open-event-frontend/utils/string';

const { Component, computed, on } = Ember;

export default Component.extend({
  classNames: ['column'],

  tags: computed('event.type', 'event.topic', 'event.subTopic', function() {
    const tagsOriginal = this.get('event').getProperties('type', 'topic', 'subTopic');
    let tags = [];
    forOwn(tagsOriginal, value => {
      if (value.trim() !== '') {
        tags.push('#' + pascalCase(value));
      }
    });
    return tags;
  }),

  _didInsertElement: on('didInsertElement', function() {
    const $innerSpan = this.$('.header > span');
    const $header = this.$('.header');
    while ($innerSpan.outerHeight() > $header.height()) {
      $header.attr('data-content', $innerSpan.text());
      $header.attr('data-variation', 'tiny');
      $innerSpan.text((index, text) => {
        return text.replace(/\W*\s(\S)*$/, '...');
      });
      $header.popup({
        position: 'top center'
      });
    }
  })
});
