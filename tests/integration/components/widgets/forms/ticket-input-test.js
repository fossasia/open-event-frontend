import { test } from 'ember-qunit';
import moduleForComponent from 'open-event-frontend/tests/helpers/component-helper';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('widgets/forms/ticket-input', 'Integration | Component | widgets/forms/ticket input');

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.on('moveTicket', function() { });
  this.on('removeTicket', function() { });
  this.set('ticket', {});

  this.render(hbs`{{widgets/forms/ticket-input ticket=ticket moveTicketUp=(action 'moveTicket' 'up')
                                       moveTicketDown=(action 'moveTicket' 'down')
                                       removeTicket=(action 'removeTicket')}}`);

  assert.ok(this.$().html().trim().includes('ticket_name'));

});
