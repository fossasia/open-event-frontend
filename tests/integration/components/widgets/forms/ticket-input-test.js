import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupIntegrationTest } from 'open-event-frontend/tests/helpers/setup-integration-test';
import { render } from '@ember/test-helpers';

module('Integration | Component | widgets/forms/ticket input', function(hooks) {
  setupIntegrationTest(hooks);

  hooks.beforeEach(function() {
    this.actions = {};
    this.send = (actionName, ...args) => this.actions[actionName].apply(this, args);
  });

  test('it renders', async function(assert) {

    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.actions.moveTicket = function() { };
    this.actions.removeTicket = function() { };
    this.set('ticket', {});

    await render(hbs`{{widgets/forms/ticket-input ticket=ticket moveTicketUp=(action 'moveTicket' 'up')
                                         moveTicketDown=(action 'moveTicket' 'down')
                                         removeTicket=(action 'removeTicket')}}`);

    assert.ok(this.element.innerHTML.trim().includes('ticket_name'));

  });
});
