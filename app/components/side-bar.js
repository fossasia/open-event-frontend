import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  didInsertElement() {
    this._super.call(this);
    this.$('.ui.sidebar')
      .sidebar({ context: this.$() })
      .sidebar('setting', 'transition', 'push')
      .sidebar('attach events', '.ui.sidebar .item')
      .sidebar('attach events', '.ui.sidebar .link')
      .sidebar('attach events', '.open.sidebar')
      .sidebar('attach events', '.ui.sidebar a');
  }
});
