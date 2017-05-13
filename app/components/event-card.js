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
        tags.push('#' + pascalCase(value));
      }
    });
    return tags;
  }),

  didInsertElement() {
    this._super(...arguments);
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
      this.set('$header', $header);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.get('$header')) {
      this.get('$header').popup('destroy');
    }
  }
});
