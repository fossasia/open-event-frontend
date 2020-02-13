window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'ember-routing.route-router' },
    { handler: 'silence', matchId: 'ember-views.curly-components.jquery-element' } // Depreciating the jquery warnings until we have moved away from jquery or used native jquery in the app.
  ]
};
