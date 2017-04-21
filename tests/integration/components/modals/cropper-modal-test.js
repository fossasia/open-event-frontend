import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('modals/cropper-modal', 'Integration | Component | modals/cropper modal');

test('it renders', function(assert) {
  this.set('isOpen', false);
  this.set('imgData', '');
  this.on('imageCropped', function() { });
  this.render(hbs`{{modals/cropper-modal isOpen=isOpen imgData=imgData onImageCrop=(action 'imageCropped')}}`);
  assert.ok(this.$().html().trim().includes('Crop Image'));
});
