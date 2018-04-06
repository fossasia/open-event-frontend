import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | modals/cropper modal', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', function(assert) {
    this.set('isOpen', false);
    this.set('imgData', '');
    this.actions.imageCropped = function() { };
    this.render(hbs`{{modals/cropper-modal isOpen=isOpen imgData=imgData onImageCrop=(action 'imageCropped')}}`);
    assert.ok(find('*').innerHTML.trim().includes('Crop Image'));
  });
});
