import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class SessionsIndex extends Route {
  beforeModel() {
    // We don't want to process or transition in fastboot mode
    // Since this is only an intermediate page
    return this.transitionTo('public.sessions');
  }
}
