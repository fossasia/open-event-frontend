import Ember from 'ember';
import FormMixin from 'open-event-frontend/mixins/form';
import { timezones } from 'open-event-frontend/utils/dictionary/date-time';

const { Component, computed } = Ember;

export default Component.extend(FormMixin, {

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

  tracks: computed('data.tracks.@each.isDeleted', function() {
    return this.get('data.tracks').filterBy('isDeleted', false);
  }),

  sessionTypes: computed('data.sessionTypes.@each.isDeleted', function() {
    return this.get('data.sessionTypes').filterBy('isDeleted', false);
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
      item.destroyRecord();
    }
  },
  didInsertElement() {
    if (this.get('data.event.speakersCall.content')) {
      this.set('data.event.speakersCall', this.store.createRecord('speakers-call'));
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
