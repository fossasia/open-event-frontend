import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import destroyApp from '../../../helpers/destroy-app';
import startApp from '../../../helpers/start-app';

moduleForComponent('forms/forgot-password-form', 'Integration | Component | forms/forgot password form', {
  integration: true,
  beforeEach() {
    this.application = startApp();
  },
  afterEach() {
    destroyApp(this.application);
  }
});

test('it renders', function(assert) {
  this.render(hbs`{{forms/forgot-password-form}}`);
  assert.ok(this.$().html().trim().includes('Forgot Password'));
});
