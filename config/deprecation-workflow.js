window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: 'silence', matchId: 'ember-routing.route-router' },
    { handler: 'silence', matchId: 'ember-views.curly-components.jquery-element'}
  ]
};
