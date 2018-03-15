import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  actions: {
    updateFacebook() {
      if(this.get('facebook'))
        this.sendAction('updateSocialLink', 'facebook', this.get('facebook'));
    },
    updateTwitter() {
      if(this.get('twitter'))
        this.sendAction('updateSocialLink', 'twitter', this.get('twitter'));
    },
    updateInstagram() {
      if(this.get('instagram'))
        this.sendAction('updateSocialLink', 'instagram', this.get('instagram'));
    },
    updateGoogle() {
      if(this.get('google'))
        this.sendAction('updateSocialLink', 'google', this.get('google'));
    }
  }
});
