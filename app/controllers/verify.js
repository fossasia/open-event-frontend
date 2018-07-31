import Controller from '@ember/controller';

export default Controller.extend({
  queryParams : ['token'],
  token       : null,
  success     : false,
  error       : null,

  verify(tokenVal) {
    let payload = {
      data: {
        token: tokenVal
      }
    };
    return this.get('loader')
      .post('auth/verify-email', payload)
      .then(() => {
        this.set('success', true);
      })
      .catch(reason => {
        this.set('error', reason);
        this.set('success', false);
      });
  }
});
