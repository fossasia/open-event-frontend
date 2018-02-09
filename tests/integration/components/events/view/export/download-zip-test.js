import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('events/view/export/download-zip', 'Integration | Component | events/view/export/download zip');


test('it renders', function(assert) {
  this.on('startGeneration', function() { });
  this.set('eventExportStatus', '');
  this.set('eventDownloadUrl', '');
  this.render(hbs`{{events/view/export/download-zip startGeneration=(action 'startGeneration') eventExportStatus=eventExportStatus eventDownloadUrl=eventDownloadUrl l10n=l10n}}`);
  assert.ok(this.$().html().trim().includes('Zip'));
});
