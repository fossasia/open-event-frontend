import Route from '@ember/routing/route';

export default Route.extend({
  queryParams: {
    code     : '',
    provider : ''
  },
  model(queryParams) {
    this.controllerFor('oauth/callback').oauth(queryParams);
  }
});

