import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  identification : '',
  password       : '',
  isLoading      : false,

  actions: {

    submit() {
      let credentials = this.getProperties('identification', 'password'),
          authenticator = 'authenticator:jwt';

      this.set('errorMessage', null);
      this.set('isLoading', true);

      this.get('session')
        .authenticate(authenticator, credentials)
        .then(() => {
          this.get('loader').get('/users/me').then(data => {
            this.get('session').set('data.currentUser', data);
            this.get('router').transitionTo('index');
          });
        })
        .catch(reason => {
          console.log(reason);
          if (reason.hasOwnProperty('code') && reason.code === 401) {
            this.set('errorMessage', 'Your credentials were incorrect.');
          } else {
            this.set('errorMessage', 'An unexpected error occurred.');
          }
          this.set('isLoading', false);
        });
    }
  },

  didRender() {
    this.$('.ui.form')
      .form({
        inline : true,
        delay  : false,
        fields : {
          mobile: {
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
          },
          password: {
            identifier : 'password',
            rules      : [
              {
                type   : 'empty',
                prompt : 'Please enter your password'
              }
            ]
          }
        }
      })
    ;
  }
});
