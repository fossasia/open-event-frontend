import Ember from 'ember';

const { Test } = Ember;

export default Test.registerAsyncHelper('login', function(app, assert, email = null, password = null, gotoLoginPage = true) {
  if (gotoLoginPage) {
    visit('/login');
  }
  andThen(function() {
    assert.equal(currentURL(), '/login');
    fillIn('input[name=email]', email !== null ? email : 'opev_test_user@nada.email');
    fillIn('input[name=password]', password !== null ? password : 'opev_test_user');
    click('button[type=submit]');
  });
});
