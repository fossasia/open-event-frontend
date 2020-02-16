import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ErrorRoute extends Route {
  @service('error-handler') errorHandlerService;

  // setupController function receives the error exception as a parameter
  setupController(_controller, error) {
    this.coreErrorHandlerService.handleServerSideError(error);

    super.setupController(...arguments);
  }

}
