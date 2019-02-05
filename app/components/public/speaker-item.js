import Component from '@ember/component';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Component.extend({
  classNames  : ['four wide  speaker column'],
  socialLinks : computed(function() {
    return this.get('speaker').getProperties('twitter', 'facebook', 'github', 'linkedin');
  }),
  didInsertElement() {
    $('.title').popup({
      position: 'bottom center'
    });
  }
});
