import Ember from 'ember';
import { v4 } from 'ember-uuid';

const { Component, computed, run: { debounce }, testing, observer } = Ember;

export default Component.extend({

  editor: null,

  // Ensure any changes to the parser rules are set in the sanitizer @ services/sanitizer.js
  standardParserRules: {
    tags: {
      'p'      : 1,
      'b'      : { 'rename_tag': 'strong' },
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

  valueObserver: observer('value', function() {
    if (this.get('editor') && this.get('value') !== this.get('_value')) {
      this.get('editor').setValue(this.get('value'));
    }
  }),

  textareaIdGenerated: computed('textareaId', function() {
    return this.get('textareaId') ? this.get('textareaId') : v4();
  }),

  didInsertElement() {
    this._super(...arguments);
    this.set('_value', this.get('value'));
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
          const value = this.editor.getValue();
          this.setProperties({ _value: value, value });
        }, 200);
      };

      this.editor.on('interaction', updateValue);
      this.editor.on('aftercommand:composer', updateValue);
    }
  },

  willDestroyElement() {
    this._super(...arguments);
    if (this.editor) {
      this.editor.destroy();
    }
    this.$('.button').popup('destroy');
  }
});
