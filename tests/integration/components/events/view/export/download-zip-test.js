import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | events/view/export/download zip', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });


  test('it renders', function(assert) {
    this.actions.startGeneration = function() { };
    this.set('eventExportStatus', '');
    this.set('eventDownloadUrl', '');
    this.render(hbs`{{events/view/export/download-zip startGeneration=(action 'startGeneration') eventExportStatus=eventExportStatus eventDownloadUrl=eventDownloadUrl l10n=l10n}}`);
    assert.ok(find('*').innerHTML.trim().includes('Zip'));
  });
});
