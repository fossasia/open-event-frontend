import Ember from 'ember';
import moment from 'moment';

const { Component } = Ember;

export default Component.extend({

  timezones       : moment.tz.names(),
  currentTimezone : moment.tz.guess(),

  actions: {
    showAddressView(show = true) {
      this.set('addressViewIsShown', show);
    },
    placeChanged(place) {
      console.log(place);
    }
  },

  didRender() {
    this.$('.ui.checkbox').checkbox();
  },

  didInsertElement() {
    this.$('select.dropdown').dropdown({
      forceSelection: false
    });
  }
});
