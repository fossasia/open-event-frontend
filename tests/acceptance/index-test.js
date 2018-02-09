// Tests commented till we have our own mock server.

// import { test } from 'qunit';
// import moduleForAcceptance from 'open-event-frontend/tests/helpers/module-for-acceptance';
//
// moduleForAcceptance('Acceptance | index');
//
// test('visiting /', function(assert) {
//   visit('/');
//   andThen(function() {
//     assert.equal(currentURL(), '/');
//   });
// });
//
// test('visiting / and opening an event', function(assert) {
//   visit('/');
//   andThen(function() {
//     click('div.event.card:first > a.content:first');
//     andThen(function() {
//       assert.equal(currentRouteName(), 'public.index');
//     });
//   });
// });
//
// test('visiting / and opening an event share modal', function(assert) {
//   visit('/');
//   andThen(function() {
//     click('div.event.card:first > div.extra.content > span > i');
//     andThen(function() {
//       const $shareModalCopyButton = findWithAssert('.ui.modal button.copy.button');
//       assert.ok($shareModalCopyButton.first().data('clipboard-text') !== null);
//       andThen(function() {
//         click('.ui.modal > i.black.close.icon');
//       });
//     });
//   });
// });
