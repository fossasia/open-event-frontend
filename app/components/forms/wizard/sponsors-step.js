import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';

export default Component.extend(FormMixin, EventWizardMixin, {

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
        },
        image_upload: {
          rules: [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please upload sponsor\'s logo.')
            }
          ]
        }
      }
    };
  },

  sponsors: computed('data.sponsors.@each.isDeleted', function() {
    return this.data.sponsors.filterBy('isDeleted', false);
  }),

  actions: {
    addSponsor() {
      const { sponsors } = this.data;
      const incorrect_sponsors = sponsors.filter(function(sponsor) {
        return (!sponsor.get('name'));
      });
      if (incorrect_sponsors.length > 0) {
        this.notify.error(this.l10n.t('Please fill the required fields for existing sponsor items'), {
          id: 'req_field_sponsor'
        });
        this.set('isLoading', false);
      } else {
        this.data.sponsors.addObject(this.store.createRecord('sponsor'));
      }
    },
    removeSponsor(sponsor) {
      sponsor.deleteRecord();
    },
    toggleSponsors() {
      if (this.data.sponsors && !this.data.sponsors.length) {
        this.data.event.isSponsorsEnabled = true;
        this.data.sponsors.addObject(this.store.createRecord('sponsor'));
      } else {
        this.data.event.isSponsorsEnabled = false;
        this.data.sponsors.clear();
      }
    }
  }
});
