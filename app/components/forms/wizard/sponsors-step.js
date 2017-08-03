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

  sponsors: computed('data.event.sponsors.@each.isDeleted', function() {
    return this.get('data.event.sponsors').filterBy('isDeleted', false);
  }),

  actions: {
    addSponsor() {
      this.get('data.event.sponsors').addObject(this.store.createRecord('sponsor'));
    },
    removeSponsor(sponsor) {
      sponsor.deleteRecord();
    },
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.get('save')('draft');
      });
    },
    moveForward() {
      this.onValid(() => {
        this.get('move')();
      });
    },
    publish() {
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.get('save')('publish');
      });
    }
  },

  didInsertElement() {
    if (this.get('data.event.sponsors') && !this.get('data.event.sponsors.length')) {
      this.get('data.event.sponsors').addObject(this.store.createRecord('sponsor'));
    }
  }
});
