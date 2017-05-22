import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  notifications : ['The first things left to do here', 'The second things left to do here', 'this is 3rd'],
  countShow : true,
  actions : {
    setCountShow() {
      this.set('countShow', false);
    },
    showPop() {
      this.$(' .notif-i').popup({
        popup : '.popup',
        on    : 'click'
      });
    }
  }
});
