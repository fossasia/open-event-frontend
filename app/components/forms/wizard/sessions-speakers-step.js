import Ember from 'ember';
import moment from 'moment';
import FormMixin from 'open-event-frontend/mixins/form';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { groupBy } from 'lodash';

const { Component, computed } = Ember;

export default Component.extend(EventWizardMixin, FormMixin, {

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {
        microlocation: {
          identifier : 'microlocation',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter name for microlocation')
            }
          ]
        },
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
        }
      }
    };
  },

  timezones: computed(function() {
    return timezones;
  }),

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

  actions: {
    saveDraft() {
      this.onValid(() => {
        this.set('data.event.state', 'draft');
        this.sendAction('save');
      });
    },
    moveForward() {
      this.onValid(() => {
        this.sendAction('save');
      });
    },
    publish() {
      this.onValid(() => {
        this.set('data.event.state', 'published');
        this.sendAction('save');
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
    removeItem(item) {
      item.deleteRecord();
    },
    updateDates() {
      const timezone = this.get('data.event.timezone');
      var startDate = this.get('data.event.startsAt');
      var endDate = this.get('data.event.endsAt');
      this.set('data.event.startsAt', moment.tz(startDate, timezone));
      this.set('data.event.endsAt', moment.tz(endDate, timezone));
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
  }
});
