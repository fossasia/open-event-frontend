import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Object: EmberObject } = Ember;

moduleForComponent('public/copyright-item', 'Integration | Component | public/copyright item');

const copyright = EmberObject.create({
  holder     : 'Creative Commons',
  holderUrl  : 'https://creativecommons.org',
  licence    : 'Public Domain Dedication (CC0)',
  licenceUrl : 'https://creativecommons.org/publicdomain/zero/1.0/',
  year       : 2007,
  logoUrl    : 'https://image.ibb.co/gt7q7v/pdd.png'
});

test('it renders', function(assert) {
  this.set('copyright', copyright);
  this.render(hbs`{{public/copyright-item copyright=copyright}}`);
  assert.ok(this.$().html().trim().includes('Public Domain Dedication (CC0)'));
});
