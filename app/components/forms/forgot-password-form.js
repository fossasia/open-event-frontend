import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  identification : '',
  password       : '',
  isLoading      : false,

  actions: {

    submit() {
      let payload = this.getProperties('identification');

      this.set('errorMessage', null);
      this.set('isLoading', true);

      this.get('loader')
        .post('/forgot-password', payload)
        .then(() => {

        })
        .catch(reason => {
          if (reason.hasOwnProperty('code') && reason.code === 401) {
            this.set('errorMessage', 'Your credentials were incorrect.');
          } else {
            this.set('errorMessage', 'An unexpected error occurred.');
          }
          this.set('isLoading', false);
        });
    }
  },

  didInsertElement() {
    this.$('.ui.form')
      .form({
        inline : true,
        delay  : false,
        fields : {
          identification: {
            identifier : 'email',
            rules      : [
              {
                type   : 'empty',
                prompt : 'Please enter your email ID'
              },
              {
                type   : 'email',
                prompt : 'Please enter a valid email ID'
              }
            ]
          }
        }
      });

    if (this.get('session.newUser')) {
      this.set('newUser', this.get('session.newUser'));
      this.set('identification', this.get('session.newUser'));
      this.set('session.newUser', null);
    }
  }
});
