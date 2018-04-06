import { find } from '@ember/test-helpers';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | events/overview/event sponsors', function(hooks) {
  setupRenderingTest(hooks);

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
    assert.ok(find('*').innerHTML.trim().includes('Event sponsors'));
  });
});
