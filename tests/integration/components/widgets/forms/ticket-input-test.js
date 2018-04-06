import { find } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | widgets/forms/ticket input', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.actions.moveTicket = function() { };
    this.actions.removeTicket = function() { };
    this.set('ticket', {});

    this.render(hbs`{{widgets/forms/ticket-input ticket=ticket moveTicketUp=(action 'moveTicket' 'up')
                                         moveTicketDown=(action 'moveTicket' 'down')
                                         removeTicket=(action 'removeTicket')}}`);

    assert.ok(find('*').innerHTML.trim().includes('ticket_name'));

  });
});
