import { test } from 'qunit';
import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | public/cfs');

test('visiting / and opening an event and going to call for speakers', function(assert) {
  visit('/');
  andThen(function() {
    click('div.event.card:first > div.content:first > a');
    andThen(function() {
      assert.equal(currentRouteName(), 'public.index');
      click('div.ui.vertical.pointing.menu > a:contains(\'Call for Speakers\')');
      andThen(function() {
        assert.equal(currentRouteName(), 'public.cfs');
      });
    });
  });
});
