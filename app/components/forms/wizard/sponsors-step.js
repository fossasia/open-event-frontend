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

  ticketsPresent: computed('data.event.tickets.@each', function() {
    return this.data.event.tickets.length > 0;
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
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save');
      });
    },
    savePublished() {
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.sendAction('save', this.data);
      })
    },
    move(direction) {
      this.onValid(() => {
        this.sendAction('move', direction);
      });
    },
    openConfirmModal() {
      this.set('isPublishUnpublishModalOpen', true);
    },

    togglePublishState() {
      this.set('isPublishUnpublishModalOpen', false);
      const { state } = this.data.event;
      this.set('isLoading', true);
      this.set('data.event.state', state === 'draft' ? 'published' : 'draft');
      this.data.event.save()
        .then(() => {
          if (state === 'draft') {
            this.sendAction('save', this.data);
            this.notify.success(this.l10n.t('Your event has been published successfully.'),
              {
                id: 'event_publish'
              });
          } else {
            this.sendAction('save', this.data);
            this.notify.success(this.l10n.t('Your event has been unpublished.'),
              {
                id: 'event_unpublish'
              });
          }
        })
        .catch(e => {
          console.error('Error while publishing/unpublishing event', e);
          this.set('data.event.state', state);
          this.notify.error(this.l10n.t('An unexpected error has occurred.'),
            {
              id: 'event_publish_error'
            });
        })
        .finally(() => {
          this.set('isLoading', false);
        });
    }
  },

  didInsertElement() {
    if (this.data.sponsors && !this.data.sponsors.length) {
      this.data.sponsors.addObject(this.store.createRecord('sponsor'));
    }
  }
});
