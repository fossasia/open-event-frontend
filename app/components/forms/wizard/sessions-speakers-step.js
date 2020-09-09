import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { groupBy } from 'lodash-es';
import { sortCustomFormFields } from 'open-event-frontend/utils/sort';
import { SPEAKER_FORM_ORDER, SESSION_FORM_ORDER } from 'open-event-frontend/models/custom-form';

export default Component.extend(EventWizardMixin, FormMixin, {

  // TODO: Removing the Session & Speaker Time Validations due to the weird and buggy behaviour. Will be restored once a perfect solution is found. Please check issue: https://github.com/fossasia/open-event-frontend/issues/3667
  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        sessionType: {
          identifier : 'session',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter name for session-type')
            }
          ]
        },
        track: {
          identifier : 'track',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter name for track')
            }
          ]
        },
        privateLink: {
          identifier : 'private_link',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a Private link')
            }
          ]
        },
        privacy: {
          identifier : 'privacy',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please select the Privacy')
            }
          ]
        },
        startDate: {
          identifier : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please tell us when your event starts')
            }
          ]
        },
        endDate: {
          identifier : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please tell us when your event ends')
            }
          ]
        },
        startTime: {
          identifier : 'start_time',
          depends    : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give a start time')
            }
          ]
        },
        endTime: {
          identifier : 'end_time',
          depends    : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give an end time')
            }
          ]
        },
        microlocation: {
          identifier : 'microlocation',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter name for microlocation')
            }
          ]
        },
        microlocationFloor: {
          identifier : 'microlocation_floor',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter floor for microlocation')
            }
          ]
        }
      }
    };
  },

  tracks: computed('data.tracks.@each.isDeleted', function() {
    return this.data.tracks.filterBy('isDeleted', false);
  }),

  sessionTypes: computed('data.sessionTypes.@each.isDeleted', function() {
    return this.data.sessionTypes.filterBy('isDeleted', false);
  }),

  customForm: computed('data.customForms.[]', function() {
    const grouped = groupBy(this.data.customForms.toArray(), customForm => customForm.get('form'));

    grouped.speaker = sortCustomFormFields(grouped.speaker, SPEAKER_FORM_ORDER);
    grouped.session = sortCustomFormFields(grouped.session, SESSION_FORM_ORDER);

    return grouped;
  }),

  microlocations: computed('data.microlocations.@each.isDeleted', function() {
    return this.data.event.microlocations.filterBy('isDeleted', false);
  }),

  complexCustomForms: computed('data.customForms.@each.isComplex', function() {
    return this.data.customForms.filterBy('isComplex', true);
  }),

  ticketsPresent: computed('data.event.tickets.@each', function() {
    return this.data.event.tickets.length > 0;
  }),

  fieldChanged(field) {
    if (!field.get('isIncluded')) {
      field.set('isRequired', false);
    }
    if (field.get('isRequired')) {
      field.set('isIncluded', true);
    }
  },

  didInsertElement() {
    if (this.data.event.customForms && !this.data.event.customForms.length) {
      this.set('data.event.customForms', this.getCustomForm(this.data.event));
    }

    if (this.data.event.sessionTypes && !this.data.event.sessionTypes.length) {
      this.data.event.sessionTypes.addObject(this.store.createRecord('session-type'));
    }

    if (this.data.event.tracks && !this.data.event.tracks.length) {
      this.data.event.tracks.addObject(this.store.createRecord('track'));
    }

    if (this.data.event.microlocations && !this.data.event.microlocations.length) {
      this.data.event.microlocations.addObject(this.store.createRecord('microlocation'));
    }
  },

  actions: {
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
    },
    addItem(type) {
      switch (type) {
        case 'sessionType':
          this.data.sessionTypes.addObject(this.store.createRecord('session-type'));
          break;
        case 'track':
          this.data.tracks.addObject(this.store.createRecord('track'));
          break;
        case 'microlocation':
          this.data.microlocations.addObject(this.store.createRecord('microlocation'));
          break;
      }
    },
    addCustomField() {
      this.data.customForms.addObject(this.store.createRecord('customForm', {
        event     : this.data.event,
        isComplex : true
      }));
    },
    onChange() {
      this.onValid(() => {});
    }
  }
});
