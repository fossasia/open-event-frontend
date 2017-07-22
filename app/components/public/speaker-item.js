import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames  : ['four wide  speaker column'],
  socialLinks : computed(function() {
    return this.get('speaker').getProperties('twitter', 'facebook', 'github', 'linkedin');
  })
});
