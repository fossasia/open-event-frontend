import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | public/index');

test('visiting / and opening an event', function(assert) {
  visit('/');
  andThen(function() {
    click('div.event.card:first > a.content:first');
    andThen(function() {
      assert.equal(currentRouteName(), 'public.index');
    });
  });
});
