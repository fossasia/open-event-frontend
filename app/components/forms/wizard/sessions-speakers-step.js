import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';

const { Component, computed, computed: { alias } } = Ember;

export default Component.extend(FormMixin, {

  event            : alias('data.parentData.event'),
  sessionsSpeakers : alias('data.sessionsSpeakers'),

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      on     : 'blur',
      fields : {

      }
    };
  },

  timezones: computed(function() {
    return timezones;
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
    },
    addItem(type) {
      switch (type) {
        case 'sessionType':
          this.get('data.sessionsSpeakers.sessionTypes').addObject(this.store.createRecord('session-type'));
          break;
        case 'track':
          this.get('data.sessionsSpeakers.tracks').addObject(this.store.createRecord('track'));
          break;
        case 'microlocation':
          this.get('data.sessionsSpeakers.microlocations').addObject(this.store.createRecord('microlocation'));
          break;
      }
    },
    removeItem(item, type) {
      item.unloadRecord();
      this.get(`data.sessionsSpeakers.${type}s`).removeObject(item);
    }
  }
});
