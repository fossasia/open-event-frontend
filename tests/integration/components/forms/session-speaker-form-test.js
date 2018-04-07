import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import hbs from 'htmlbars-inline-precompile';
import { render } from '@ember/test-helpers';

module('Integration | Component | forms/session speaker form', function(hooks) {
  setupIntegrationTest(hooks);

  let fields = A(
    [
      EmberObject.create({
        fieldIdentifier : 'title',
        form            : 'session',
        type            : 'text',
        isRequired      : true,
        isIncluded      : true,
        isFixed         : true
      }),
      EmberObject.create({
        fieldIdentifier : 'name',
        form            : 'speaker',
        type            : 'text',
        isRequired      : true,
        isIncluded      : true,
        isFixed         : true
      }),
      EmberObject.create({
        fieldIdentifier : 'email',
        form            : 'speaker',
        type            : 'email',
        isRequired      : true,
        isIncluded      : true,
        isFixed         : true
      })
    ]
  );

  test('it renders', async function(assert) {
    this.set('isSessionSpeaker', true);
    this.set('includeSpeaker', true);
    this.set('fields', fields);
    await render(hbs`{{forms/session-speaker-form fields=fields includeSpeaker=includeSpeaker isSessionSpeaker=isSessionSpeaker}}`);
    assert.ok(this.element.innerHTML.trim().includes('Speaker detail'));
  });
});
