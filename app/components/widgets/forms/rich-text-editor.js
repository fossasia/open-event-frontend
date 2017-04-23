import Ember from 'ember';
import { v4 } from 'ember-uuid';

const { Component, computed, run: { debounce }, testing } = Ember;

export default Component.extend({

  editor: null,

  // Ensure any changes to the parser rules are set in the sanitizer @ services/sanitizer.js
  standardParserRules: {
    tags: {
      'p'      : 1,
      'b'      : { 'rename_tag': 'string' },
      'strong' : 1,
      'i'      : { 'rename_tag': 'em' },
      'em'     : 1,
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

  textareaIdGenerated: computed('textareaId', function() {
    return this.get('textareaId') ? this.get('textareaId') : v4();
  }),

  didInsertElement() {
    this._super.call(this);
    this.$('.button')
      .popup({
        inline    : true,
        variation : 'tiny'
      });

    // Don't initialize wysihtml5 when app is in testing mode
    if (!testing) {
      this.editor = new wysihtml5.Editor(this.$(`#${this.get('textareaIdGenerated')}`)[0], {
        toolbar     : this.$(`#${this.get('textareaIdGenerated')}-toolbar`)[0],
        parserRules : this.get('standardParserRules')
      });

      const updateValue = () => {
        debounce(this, () => {
          this.set('value', this.editor.getValue());
        }, 400);
      };

      this.editor.on('interaction', updateValue);
      this.editor.on('aftercommand:composer', updateValue);
    }
  },

  willDestroyElement() {
    this._super.call(this);
    if (this.editor) {
      this.editor.destroy();
    }
  }
});
