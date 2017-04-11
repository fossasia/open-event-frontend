import Ember from 'ember';
import moment from 'moment';
import { licenses, timezones } from 'open-event-frontend/utils/dictionary';
import FormMixin from 'open-event-frontend/mixins/form';
import { orderBy } from 'lodash';

const { Component, computed } = Ember;

export default Component.extend(FormMixin, {

  currentTimezone: moment.tz.guess(),

  getValidationRules() {
    return {
      inline : true,
      delay  : false,
      fields : {
        identification: {
          identifier : 'license',
          rules      : [
            {
              type   : 'empty',
              prompt : 'Please enter your email ID'
            }
          ]
        },
        password: {
          identifier : 'topic',
          rules      : [
            {
              type   : 'empty',
              prompt : 'Please enter your password'
            }
          ]
        }
      }
    };
  },

  timezones: computed(function() {
    return timezones;
  }),

  licenses: computed(function() {
    return orderBy(licenses, 'name');
  }),

  actions: {
    showAddressView(show = true) {
      this.set('addressViewIsShown', show);
    },
    placeChanged(place) {
      console.log(place);
    }
  }
});
