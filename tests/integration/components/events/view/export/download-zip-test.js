import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | events/view/export/download zip', function(hooks) {
  setupIntegrationTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });


  test('it renders', async function(assert) {
    this.actions.startGeneration = function() { };
    this.set('eventExportStatus', '');
    this.set('eventDownloadUrl', '');
    await render(hbs`{{events/view/export/download-zip startGeneration=(action 'startGeneration') eventExportStatus=eventExportStatus eventDownloadUrl=eventDownloadUrl l10n=l10n}}`);
    assert.ok(this.element.innerHTML.trim().includes('Zip'));
  });
});
