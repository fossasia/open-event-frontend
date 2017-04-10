import Ember from 'ember';
import { v4 } from 'ember-uuid';

const { Component, computed, run: { debounce } } = Ember;

export default Component.extend({

  standardParserRules: {
    tags: {
      'b'      : 1,
      'strong' : { 'rename_tag': 'b' },
      'i'      : 1,
      'em'     : { 'rename_tag': 'i' },
      'u'      : 1,
      'ol'     : 1,
      'li'     : 1,
      'ul'     : 1,
      'a'      : {
        'check_attributes': {
          'href': 'url'
        },
        'set_attributes': {
          'rel'    : 'nofollow',
          'target' : '_blank'
        }
      }
    }
  },

  textareaId: computed(function() {
    return v4();
  }),

  didInsertElement() {
    this.$('.button')
      .popup({
        inline    : true,
        variation : 'tiny'
      });
    const editor = new wysihtml5.Editor(this.$(`#${this.get('textareaId')}`)[0], {
      toolbar     : this.$(`#${this.get('textareaId')}-toolbar`)[0],
      parserRules : this.get('standardParserRules')
    });
    this.set('editor');

    const updateValue = () => {
      debounce(this, () => {
        this.set('value', editor.getValue());
      }, 400);
    };

    editor.on('interaction', updateValue);
    editor.on('aftercommand:composer', updateValue);
  }
});
