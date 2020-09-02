import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | modals/cropper modal', function(hooks) {
  setupIntegrationTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {
    this.set('isOpen', false);
    this.set('imgData', '');
    this.actions.imageCropped = function() { };
    await render(hbs`{{modals/cropper-modal isOpen=isOpen imgData=imgData onImageCrop=(action 'imageCropped')}}`);
    assert.ok(this.element.innerHTML.trim().includes('Crop Image'));
  });
});
