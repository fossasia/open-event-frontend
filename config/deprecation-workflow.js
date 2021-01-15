/* eslint-env browser */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'ember-routing.route-router' },
    { handler: 'silence', matchId: 'ember-views.curly-components.jquery-element' }, // Silencing the jquery warnings until we have moved away from jquery or used native jquery in the app.
    { handler: 'silence', matchId: 'ember-data.evented-api-usage' } // Silencing the Evented-API warnings until we have solved https://github.com/fossasia/open-event-frontend/issues/4024 .
  ]
};
