import Service from '@ember/service';
import { inject as service } from '@ember/service';

export default class errorHandlerService extends Service {
  @service('fastboot') fastboot;

  handleServerSideError(error) {
    if (!this.fastboot.isFastBoot) {return}

    if (typeof FastBootRaven !== 'undefined') {
      const req = fastboot.request;
      const { protocol, headers } = req;
      const host = req.hostname || req.host || headers.host || '<no host>';
      const originalUrl = (req.originalUrl || req.url || req.path);
      const absoluteUrl = `${protocol}://${host}${originalUrl}`;
      // const userScope = this.userScope; // If you have an user scope you can get from service property here

      FastBootRaven.withScope(function(scope) {
        scope.setTag('url', absoluteUrl);
        scope.setExtra('query_params', req.query_params);
        // scope.setUser(userScope);

        FastBootRaven.captureException(error);
      });
    }
  }
}
