import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';

export default Component.extend(FormMixin, {

  fixedFields: computed('data.customForms.@each', function() {
    return this.data.customForms?.filter(field => field.isFixed);
  }),

  editableFields: computed('data.customForms.@each', function() {
    return this.data.customForms?.filter(field => !field.isFixed);
  }),

  ticketsPresent: computed('data.event.tickets.@each', function() {
    return this.data.event.tickets.length > 0;
  }),

  showEditColumn: computed('editableFields.@each', function() {
    return this.editableFields?.some(field => field.isComplex);
  }),

  actions: {
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save', this.data);
      });
    },
    savePublished() {
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.sendAction('save', this.data);
      });
    },
    move(direction) {
      this.onValid(() => {
        this.sendAction('move', direction, this.data);
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
  }
});
