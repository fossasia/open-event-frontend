import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | public/schedule');

test('visiting / and opening an event and going to schedule', function(assert) {
  visit('/');
  andThen(function() {
    click('div.event.card:first > a.content:first');
    andThen(function() {
      assert.equal(currentRouteName(), 'public.index');
      click('div.ui.vertical.pointing.menu > a:contains(\'Schedule\')');
      andThen(function() {
        assert.equal(currentRouteName(), 'public.schedule');
      });
    });
  });
});
