import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | public/copyright item', function(hooks) {
  setupRenderingTest(hooks);

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
    assert.ok(find('*').innerHTML.trim().includes('Public Domain Dedication (CC0)'));
  });
});
