import Component from '@ember/component';
import { computed } from '@ember/object';
import FormMixin from 'open-event-frontend/mixins/form';
import EventWizardMixin from 'open-event-frontend/mixins/event-wizard';
import { groupBy, sortBy } from 'lodash-es';
import { sortCustomFormFields } from 'open-event-frontend/utils/sort';
import { SPEAKER_FORM_ORDER, SESSION_FORM_ORDER } from 'open-event-frontend/models/custom-form';
import moment from 'moment';
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
        startDate: {
          identifier : 'start_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please tell us when your event starts')
            },
            {
              type   : 'checkStartDateCFS',
              prompt : this.l10n.t('CFS start time should be before than event start time')
            }
          ]
        },
        softEndsAtDate: {
          identifier : 'soft_end_date',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give a soft end date')
            },
            {
              type   : 'checkSoftEndDateAfterCfsStart',
              prompt : this.l10n.t('Soft closing date should be after CFS start date')
            },
            {
              type   : 'checkSoftEndDateBeforeCfsEnd',
              prompt : this.l10n.t('Soft closing date should be before CFS end date')
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
              type   : 'checkEndDateCFS',
              prompt : this.l10n.t('CFS end time should be before than event start time')
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
        softEndsAtTime: {
          identifier : 'soft_end_time',
          depends    : 'soft_end_date',
          optional   : true,
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please give a soft end time')
            },
            {
              type   : 'checkSoftEndTimeAfterCfsStart',
              prompt : this.l10n.t('Soft closing time should be after CFS start time')
            },
            {
              type   : 'checkSoftEndTimeBeforeCfsEnd',
              prompt : this.l10n.t('Soft closing time should be before CFS end time')
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
        },
        announcement: {
          identifier : 'announcement',
          rules      : [
            {
              type   : 'empty',
              prompt : this.l10n.t('Please add announcement to enable call for speakers')
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
    addItem(type) {
      switch (type) {
        case 'sessionType':
          this.data.sessionTypes.addObject(this.store.createRecord('session-type'));
          break;
        case 'track':
          this.data.tracks.addObject(this.store.createRecord('track'));
          break;
      }
    },
    addCustomField() {
      this.data.customForms.addObject(this.store.createRecord('customForm', {
        event     : this.data.event,
        isComplex : true
      }));
    },
    removeField(field) {
      this.data.customForms.removeObject(field);
    },
    addRoom(index) {
      this.microlocations.forEach(room => {
        const pos = room.get('position');
        pos > index && room.set('position', pos + 1);
      });
      this.data.event.microlocations.addObject(this.store.createRecord('microlocation', { position: index + 1 }));
    },
    removeRoom(room, index) {
      room.deleteRecord();
      this.microlocations.forEach(item => {
        const pos = item.get('position');
        pos > index && item.set('position', pos - 1);
      });
    },
    moveRoom(item, direction) {
      const idx = item.get('position');
      const otherIdx = direction === 'up' ? (idx - 1) : (idx + 1);
      const other = this.microlocations.find(item => item.get('position') === otherIdx);
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
    }
  }
});
