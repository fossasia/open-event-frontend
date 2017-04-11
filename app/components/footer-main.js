import Ember from 'ember';

const { Component, on } = Ember;

export default Component.extend({
  tagName    : 'footer',
  classNames : ['ui', 'inverted', 'vertical', 'footer', 'segment'],

  _didInsertElement: on('didInsertElement', function() {
    this.$('.ui.dropdown').dropdown({
      forceSelection: false
    });
  })
});
