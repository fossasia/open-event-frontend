import { test } from 'ember-qunit';
import Ember from 'ember';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

const { Object: EmberObject, A } = Ember;

moduleForComponent('events/overview/event-sponsors', 'Integration | Component | events/overview/event sponsors');

let column = A(
  [
    EmberObject.create({
      propertyName   : 'logo-url',
      template       : 'components/ui-table/cell/cell-image',
      title          : 'Logo',
      disableSorting : true
    }),
    EmberObject.create({
      propertyName : 'name',
      title        : 'Name'
    }),
    EmberObject.create({
      propertyName   : 'type',
      title          : 'Type',
      disableSorting : true
    }),
    EmberObject.create({
      propertyName   : 'level',
      title          : 'Level',
      disableSorting : true
    }),
    EmberObject.create({
      title          : 'Options',
      template       : 'components/ui-table/cell/cell-sponsor-options',
      disableSorting : true
    })
  ]
);
test('it renders', function(assert) {
  this.set('sponsorsColumn', column);
  this.set('data', []);
  this.render(hbs`{{events/view/overview/event-sponsors columns=sponsorsColumn data=data}}`);
  assert.ok(this.$().html().trim().includes('Event sponsors'));
});
