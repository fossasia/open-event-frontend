import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component, computed } = Ember;

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
              prompt : this.l10n.t('Please give your sponsor a name')
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
    moveForward() {
      this.onValid(() => {
        this.sendAction('move');
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
