import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class OauthRoute extends Route {
  queryParams = {
    code     : '',
    provider : ''
  };

  model(queryParams) {
    this.controllerFor('oauth/callback').oauth(queryParams);
  }
}

