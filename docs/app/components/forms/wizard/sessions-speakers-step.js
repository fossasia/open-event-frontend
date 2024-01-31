import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { groupBy, sortBy } from 'lodash-es';
import { sortCustomFormFields } from 'open-event-frontend/utils/sort';
import { SPEAKER_FORM_ORDER, SESSION_FORM_ORDER } from 'open-event-frontend/models/custom-form';
import moment from 'moment-timezone';
import $ from 'jquery';

export default Component.extend(EventWizardMixin, FormMixin, {

  // TODO: Removing the Session & Speaker Time Validations due to the weird and buggy behaviour. Will be restored once a perfect solution is found. Please check issue: https://github.com/fossasia/open-event-frontend/issues/3667
  getValidationRules() {
    $.fn.form.settings.rules.checkStartDateCFS = () => {
      return !(moment($('.ui.form').form('get value', 'start_date')).isAfter(this.data.event.startsAtDate));
    };
    $.fn.form.settings.rules.checkEndDateCFS = () => {
      return !(moment($('.ui.form').form('get value', 'end_date')).isAfter(this.data.event.startsAtDate));
    };
    $.fn.form.settings.rules.checkSoftEndDateAfterCfsStart = () => {
      return (moment($('.ui.form').form('get value', 'soft_end_date')).isSameOrAfter(this.data.speakersCall.startsAtDate));
    };
    $.fn.form.settings.rules.checkSoftEndDateBeforeCfsEnd = () => {
      return (moment($('.ui.form').form('get value', 'soft_end_date')).isSameOrBefore(this.data.speakersCall.endsAtDate));
    };
    $.fn.form.settings.rules.checkSoftEndTimeAfterCfsStart = () => {
      return (moment($('.ui.form').form('get value', 'soft_end_date') + ' ' + $('.ui.form').form('get value', 'soft_end_time')).isAfter(this.data.speakersCall.startsAt));
    };
    $.fn.form.settings.rules.checkSoftEndTimeBeforeCfsEnd = () => {
      return (moment($('.ui.form').form('get value', 'soft_end_date') + ' ' + $('.ui.form').form('get value', 'soft_end_time')).isBefore(this.data.speakersCall.endsAt));
    };
    return {
      inline : true,
      delay  : false,
      on     : 'change',
      fields : {
        sessionType: {
          identifier : 'session',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter name for session-type.')
            }
          ]
        },
        track: {
          identifier : 'track',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name for the track.')
            }
          ]
        },
        privateLink: {
          identifier : 'private_link',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a private link.')
            }
          ]
        },
        startDate: {
          identifier : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('When does your event start?')
            },
            {
              type   : 'checkStartDateCFS',
              prompt : this.l10n.t('CFS start time should be before event start time.')
            }
          ]
        },
        softEndsAtDate: {
          identifier : 'soft_end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please add a soft end date.')
            },
            {
              type   : 'checkSoftEndDateAfterCfsStart',
              prompt : this.l10n.t('Soft closing date should be after CFS start date!')
            },
            {
              type   : 'checkSoftEndDateBeforeCfsEnd',
              prompt : this.l10n.t('Soft closing date should be before CFS end date!')
            }
          ]
        },
        endDate: {
          identifier : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('When does your event end?')
            },
            {
              type   : 'checkEndDateCFS',
              prompt : this.l10n.t('CFS end time should be before event start time!')
            }
          ]
        },
        startTime: {
          identifier : 'start_time',
          depends    : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a start time.')
            }
          ]
        },
        softEndsAtTime: {
          identifier : 'soft_end_time',
          depends    : 'soft_end_date',
          optional   : true,
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please add a soft end time.')
            },
            {
              type   : 'checkSoftEndTimeAfterCfsStart',
              prompt : this.l10n.t('Soft closing time should be after CFS start time!')
            },
            {
              type   : 'checkSoftEndTimeBeforeCfsEnd',
              prompt : this.l10n.t('Soft closing time should be before CFS end time!')
            }
          ]
        },
        endTime: {
          identifier : 'end_time',
          depends    : 'end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter an end time.')
            }
          ]
        },
        microlocation: {
          identifier : 'microlocation',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter a name for a microlocation.')
            }
          ]
        },
        microlocationFloor: {
          identifier : 'microlocation_floor',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please enter floor for microlocation.')
            }
          ]
        },
        announcement: {
          identifier : 'announcement',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please add an announcement to enable the call for speakers.')
            }
          ]
        }
      }
    };
  },

  tracks: computed('data.tracks.@each.isDeleted', 'data.tracks.@each.position', function() {
    const sortedRooms = this.data.event.tracks.sortBy('position').filterBy('isDeleted', false);
    sortedRooms.forEach((room, idx) => {
      room.set('position', idx);
    });

    return sortedRooms;
  }),

  sessionTypes: computed('data.sessionTypes.@each.isDeleted', 'data.sessionTypes.@each.position', function() {
    const sortedRooms = this.data.event.sessionTypes.sortBy('position').filterBy('isDeleted', false);
    sortedRooms.forEach((room, idx) => {
      room.set('position', idx);
    });

    return sortedRooms;
  }),

  hasCallForSpeaker: computed('data.event.isCfsEnabled', function() {
    return !!this.data.event.isCfsEnabled;
  }),

  hasSoftClosing: computed('data.speakersCall.softendsAt', function() {
    return !!this.data.speakersCall.softEndsAt;
  }),

  customForm: computed('data.customForms.[]', function() {
    const grouped = groupBy(this.data.customForms.toArray(), customForm => customForm.get('form'));

    grouped.speaker = sortBy(sortCustomFormFields(grouped.speaker, SPEAKER_FORM_ORDER), ['position']);
    grouped.session = sortBy(sortCustomFormFields(grouped.session, SESSION_FORM_ORDER), ['position']);

    return grouped;
  }),

  microlocations: computed('data.microlocations.@each.isDeleted', 'data.microlocations.@each.position', function() {
    const sortedRooms = this.data.event.microlocations.sortBy('position').filterBy('isDeleted', false);
    sortedRooms.forEach((room, idx) => {
      room.set('position', idx);
    });

    return sortedRooms;
  }),

  complexCustomForms: computed('data.customForms.@each.isComplex', function() {
    return this.data.customForms.filterBy('isComplex', true);
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
  },

  actions: {
    addCustomField() {
      this.data.customForms.addObject(this.store.createRecord('customForm', {
        event     : this.data.event,
        isComplex : true
      }));
    },
    async toggle(microlocation) {
      try {
        if (!microlocation.hiddenInScheduler) {
          await this.confirm.prompt(this.l10n.t('If you hide this microlocation you will not be able to schedule sessions in it. The location will still be available for online events without scheduled sessions, e.g. break-out or discussion rooms. '));
          microlocation.hiddenInScheduler = true;
        } else {
          microlocation.hiddenInScheduler = false;
        }
      } catch {
        microlocation.hiddenInScheduler = false;
      }
    },
    removeField(field) {
      this.data.customForms.removeObject(field);
    },
    addRoom(type, index) {
      switch (type) {
        case 'microlocation':
          this.microlocations.forEach(room => {
            const pos = room.get('position');
            pos > index && room.set('position', pos + 1);
          });
          this.data.event.microlocations.addObject(this.store.createRecord('microlocation', { position: index + 1 }));
          break;
        case 'sessionType':
          this.sessionTypes.forEach(room => {
            const pos = room.get('position');
            pos > index && room.set('position', pos + 1);
          });
          this.data.event.sessionTypes.addObject(this.store.createRecord('session-type', { position: index + 1 }));
          break;
        case 'track':
          this.tracks.forEach(room => {
            const pos = room.get('position');
            pos > index && room.set('position', pos + 1);
          });
          this.data.event.tracks.addObject(this.store.createRecord('track', { position: index + 1 }));
          break;
      }
    },
    removeRoom(room, type, index) {
      room.deleteRecord();
      switch (type) {
        case 'microlocation':
          this.microlocations.forEach(item => {
            const pos = item.get('position');
            pos > index && item.set('position', pos - 1);
          });
          break;
        case 'sessionType':
          this.sessionTypes.forEach(item => {
            const pos = item.get('position');
            pos > index && item.set('position', pos - 1);
          });
          break;
        case 'track':
          this.tracks.forEach(item => {
            const pos = item.get('position');
            pos > index && item.set('position', pos - 1);
          });
          break;
      }
    },
    moveRoom(item, type, direction) {
      const idx = item.get('position');
      const otherIdx = direction === 'up' ? (idx - 1) : (idx + 1);
      let other;
      if (type === 'microlocation') {
        other = this.microlocations.find(item => item.get('position') === otherIdx);
      } else if (type === 'sessionType') {
        other = this.sessionTypes.find(item => item.get('position') === otherIdx);
      } else if (type === 'track') {
        other = this.tracks.find(item => item.get('position') === otherIdx);
      }
      other.set('position', idx);
      item.set('position', otherIdx);
    },
    resetCFS() {
      this.set('data.event.isCfsEnabled', !this.data.event.isCfsEnabled);
    },
    resetSoftClosing() {
      this.set('data.speakersCall.softEndsAt', null);
    },
    onChange() {
      this.onValid(() => {});
    },
    toggleSessionSpeaker() {
      if (!this.data.event.isSessionsSpeakersEnabled) {
        this.set('data.event.isSessionsSpeakersEnabled', true);
        if (this.data.event.sessionTypes && !this.data.event.sessionTypes.length) {
          this.data.event.sessionTypes.addObject(this.store.createRecord('session-type'));
        }

        if (this.data.event.tracks && !this.data.event.tracks.length) {
          this.data.event.tracks.addObject(this.store.createRecord('track'));
        }

        if (this.data.event.microlocations && !this.data.event.microlocations.length) {
          this.data.event.microlocations.addObject(this.store.createRecord('microlocation'));
        }
      } else {
        this.set('data.event.isSessionsSpeakersEnabled', false);
        if (this.data.event.sessionTypes && this.data.event.sessionTypes.length) {
          this.data.event.sessionTypes.clear();
        }

        if (this.data.event.tracks && this.data.event.tracks.length) {
          this.data.event.tracks.clear();
        }

        if (this.data.event.microlocations && this.data.event.microlocations.length) {
          this.data.event.microlocations.clear();
        }
      }
    }
  }
});
