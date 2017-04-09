import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    showAddressView(show = true) {
      this.set('addressViewIsShown', show);
    }
  },

  didRender() {
    this.$('.ui.checkbox').checkbox();
  }
});
