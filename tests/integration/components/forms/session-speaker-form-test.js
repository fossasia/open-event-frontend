import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | forms/session speaker form', function(hooks) {
  setupRenderingTest(hooks);

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

  test('it renders', function(assert) {
    this.set('isSessionSpeaker', true);
    this.set('includeSpeaker', true);
    this.set('fields', fields);
    this.render(hbs`{{forms/session-speaker-form fields=fields includeSpeaker=includeSpeaker isSessionSpeaker=isSessionSpeaker}}`);
    assert.ok(find('*').innerHTML.trim().includes('Speaker detail'));
  });
});
