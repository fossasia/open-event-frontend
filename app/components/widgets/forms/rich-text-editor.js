import $ from 'jquery';
import Component from '@ember/component';
import { observer, computed } from '@ember/object';
import { v4 } from 'ember-uuid';
import { isTesting } from 'open-event-frontend/utils/testing';

export default Component.extend({

  editor      : null,
  timeoutFunc : null,

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
      'br'     : 1,
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
    if (this.editor && this.editor.getValue() !== this.value) {
      this.editor.setValue(this.value);
      this.editor.focus(true);
    }
  }),

  textareaIdGenerated: computed('textareaId', function() {
    return this.textareaId ? this.textareaId : v4();
  }),

  didInsertElement() {
    this._super(...arguments);
    this.set('_value', this.value);
    $('.button', this.element)
      .popup({
        inline    : true,
        variation : 'tiny'
      });

    // Don't initialize wysihtml5 when app is in testing mode
    if (!isTesting) {
      this.editor = new wysihtml5.Editor($(`#${this.textareaIdGenerated}`, this.element)[0], {
        toolbar     : $(`#${this.textareaIdGenerated}-toolbar`, this.element)[0],
        parserRules : this.standardParserRules
      });

      const updateValue = () => {
        if (this.timeoutFunc) {
          clearTimeout(this.timeoutFunc);
        }
        this.timeoutFunc = setTimeout(() => {
          let value = String(this.editor.getValue()).replace(/(<br>)*$/g, '').replace(/&nbsp;/g, ' ');
          let trimmedValue = new String('');
          let i = value.length;
          while (i--) {
            if (value.charCodeAt(i) !== 10) {
              trimmedValue = (value.charAt(i)) + trimmedValue;
            }
          }
          value = trimmedValue;
          this.setProperties({ _value: value, value });
        }, 500);
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
    $('.button', this.element).popup('destroy');
  }
});
