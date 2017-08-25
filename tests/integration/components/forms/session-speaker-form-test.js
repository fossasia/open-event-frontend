import { test } from 'ember-qunit';
import Ember from 'ember';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

const { Object: EmberObject, A } = Ember;

moduleForComponent('forms/session-speaker-form', 'Integration | Component | forms/session speaker form');

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
  assert.ok(this.$().html().trim().includes('Speaker detail'));
});
