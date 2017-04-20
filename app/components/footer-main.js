import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName    : 'footer',
  classNames : ['ui', 'inverted', 'vertical', 'footer', 'segment'],

  didInsertElement() {
    this._super.call(this);
    this.$('.ui.dropdown').dropdown({
      forceSelection: false
    });
  }

});
