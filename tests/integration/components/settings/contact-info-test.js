import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | settings/contact info section', function(hooks) {
  setupRenderingTest(hooks);

  var user = EmberObject.create({
    email   : 'xyz@xyz.com',
    contact : '34893485843'
  });

  test('it renders', function(assert) {
    this.set('user', user);
    this.render(hbs`{{settings/contact-info-section user=user l10n=l10n}}`);
    assert.ok(find('*').innerHTML.trim().includes('Email'));
  });
});
