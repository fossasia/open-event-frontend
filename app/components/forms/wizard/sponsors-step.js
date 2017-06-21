import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';

const { Component } = Ember;

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

  actions: {
    addSponsor() {
      this.get('data.sponsors.items').addObject(this.store.createRecord('sponsor'));
    },
    removeSponsor(sponsor) {
      sponsor.unloadRecord();
      this.get('data.sponsors.items').removeObject(sponsor);
    },
    saveDraft() {
      this.onValid(() => {
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
        this.get('save')('publish');
      });
    }
  }
});
