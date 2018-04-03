import EmberObject from '@ember/object';
import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('settings/contact-info-section', 'Integration | Component | settings/contact info section');

var user = EmberObject.create({
  email   : 'xyz@xyz.com',
  contact : '34893485843'
});

test('it renders', function(assert) {
  this.set('user', user);
  this.render(hbs`{{settings/contact-info-section user=user l10n=l10n}}`);
  assert.ok(this.$().html().trim().includes('Email'));
});
