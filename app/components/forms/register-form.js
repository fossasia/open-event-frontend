import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({

  email     : '',
  password  : '',
  isLoading : false,

  actions: {
    submit() {
      this.set('errorMessage', null);
      this.set('isLoading', true);

      let email = this.get('email');
      let password = this.get('password');

      this.get('loader')
        .post('/users', {
          email,
          password
        })
        .then(data => {
          this.set('session.newUser', data.email);
          this.get('router').transitionTo('login');
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

  didRender() {
    this.$('.ui.form')
      .form({
        inline : true,
        delay  : false,
        fields : {
          email: {
            identifier : 'email',
            rules      : [
              {
                type   : 'email',
                prompt : 'Please enter a valid email address'
              }
            ]
          },
          password: {
            identifier : 'password',
            rules      : [
              {
                type   : 'empty',
                prompt : 'Please enter a password'
              },
              {
                type   : 'minLength[6]',
                prompt : 'Your password must have at least {ruleValue} characters'
              }
            ]
          },
          password_repeat: {
            identifier : 'password_repeat',
            rules      : [
              {
                type   : 'match[password]',
                prompt : 'Passwords do not match'
              }
            ]
          }
        }
      })
    ;
  }
});
