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
          this.get('routing').transitionTo('login');
        })
        .catch(reason => {
          if (reason.hasOwnProperty('code') && reason.code === 401) {
            this.set('errorMessage', this.i18n.t('Your credentials were incorrect.'));
          } else {
            this.set('errorMessage', this.i18n.t('An unexpected error occurred.'));
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
        on     : 'blur',
        fields : {
          email: {
            identifier : 'email',
            rules      : [
              {
                type   : 'email',
                prompt : this.i18n.t('Please enter a valid email address')
              }
            ]
          },
          password: {
            identifier : 'password',
            rules      : [
              {
                type   : 'empty',
                prompt : this.i18n.t('Please enter a password')
              },
              {
                type   : 'minLength[6]',
                prompt : this.i18n.t('Your password must have at least {ruleValue} characters')
              }
            ]
          },
          password_repeat: {
            identifier : 'password_repeat',
            rules      : [
              {
                type   : 'match[password]',
                prompt : this.i18n.t('Passwords do not match')
              }
            ]
          }
        }
      })
    ;
  }
});
