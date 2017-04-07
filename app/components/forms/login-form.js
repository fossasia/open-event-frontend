import Ember from 'ember';

const { Component, Logger } = Ember;

export default Component.extend({

  email    : '',
  password : '',

  actions: {
    submit() {
      let email = this.get('email');
      let password = this.get('password');
      Logger.info(email + password);
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
