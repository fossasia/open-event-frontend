import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNameBindings: ['style'],

  style: computed('isFeatured', function() {
    const allClasses = this.get('isFeatured') ? 'column eight wide' : 'column four wide';
    return allClasses;
  })
});
