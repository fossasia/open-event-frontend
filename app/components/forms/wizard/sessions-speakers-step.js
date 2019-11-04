import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { groupBy } from 'lodash-es';
import moment from 'moment';

export default Component.extend(EventWizardMixin, FormMixin, {

  getValidationRules() {
    window.$.fn.form.settings.rules.checkDates = () => {
      let startDatetime = moment(this.get('data.speakersCall.startsAt'));
      let endDatetime = moment(this.get('data.speakersCall.endsAt'));
      return (endDatetime.diff(startDatetime, 'minutes') > 0);
    };
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
            },
            {
              type   : 'checkDates',
              prompt : this.l10n.t('Start date & time ')
            }
          ]
        },
        endDate: {
          identifier : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please tell us when your event ends')
            },
            {
              type   : 'checkDates',
              prompt : this.l10n.t('Start date & time should be after End date and time')
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
            },
            {
              type   : 'checkDates',
              prompt : '.'
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
            },
            {
              type   : 'checkDates',
              prompt : '.'
            }
          ]
        }
      }
    };
  },

  tracks: computed('data.tracks.@each.isDeleted', function() {
    return this.get('data.tracks').filterBy('isDeleted', false);
  }),

  sessionTypes: computed('data.sessionTypes.@each.isDeleted', function() {
    return this.get('data.sessionTypes').filterBy('isDeleted', false);
  }),

  customForm: computed('data.customForms.[]', function() {
    return groupBy(this.get('data.customForms').toArray(), customForm => customForm.get('form'));
  }),

  microlocations: computed('data.microlocations.@each.isDeleted', function() {
    return this.get('data.event.microlocations').filterBy('isDeleted', false);
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
    if (this.get('data.event.customForms') && !this.get('data.event.customForms.length')) {
      this.set('data.event.customForms', this.getCustomForm(this.get('data.event')));
    }

    if (this.get('data.event.sessionTypes') && !this.get('data.event.sessionTypes.length')) {
      this.get('data.event.sessionTypes').addObject(this.store.createRecord('session-type'));
    }

    if (this.get('data.event.tracks') && !this.get('data.event.tracks.length')) {
      this.get('data.event.tracks').addObject(this.store.createRecord('track'));
    }

    if (this.get('data.event.microlocations') && !this.get('data.event.microlocations.length')) {
      this.get('data.event.microlocations').addObject(this.store.createRecord('microlocation'));
    }
  },

  actions: {
    move(direction) {
      this.onValid(() => {
        this.sendAction('move', direction);
      });
    },
    addItem(type) {
      switch (type) {
        case 'sessionType':
          this.get('data.sessionTypes').addObject(this.store.createRecord('session-type'));
          break;
        case 'track':
          this.get('data.tracks').addObject(this.store.createRecord('track'));
          break;
        case 'microlocation':
          this.get('data.microlocations').addObject(this.store.createRecord('microlocation'));
          break;
      }
    },
    onChange() {
      this.onValid(() => {});
    }
  }
});
