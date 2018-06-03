import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        name: {
          rules: [
            {
              type   : 'empty',
              prompt : this.get('l10n').t('Please give your sponsor a name')
            }
          ]
        }
      }
    };
  },

  sponsors: computed('data.sponsors.@each.isDeleted', function() {
    return this.get('data.sponsors').filterBy('isDeleted', false);
  }),

  actions: {
    addSponsor() {
      this.get('data.sponsors').addObject(this.store.createRecord('sponsor'));
    },
    removeSponsor(sponsor) {
      sponsor.deleteRecord();
    },
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save');
      });
    },
    move(direction) {
      this.onValid(() => {
        this.sendAction('move', direction);
      });
    },
    publish() {
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.sendAction('save');
      });
    }
  },

  didInsertElement() {
    if (this.get('data.sponsors') && !this.get('data.sponsors.length')) {
      this.get('data.sponsors').addObject(this.store.createRecord('sponsor'));
    }
  }
});
