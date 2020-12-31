import Service, { inject as service } from '@ember/service';

export default class ErrorHandlerService extends Service {

  @service notify;

  @service l10n;

  handle(error) {
    const errorStatus =  (error?.errors?.[0]?.status) ? parseInt(error?.errors?.[0]?.status) : error;
    const errorMsg = error?.errors?.[0]?.detail ?? 'Oops something went wrong. Please try again.';
    switch (errorStatus) {
      case 403:
        this.notify.error(this.l10n.tVar(errorMsg));
        break;
      case 429:
        this.notify.error(this.l10n.t('There are too many requests. Please try after sometime.'));
        break;
      case 401:
        this.notify.error(this.l10n.t('User must be User must be logged in to perform this action.'));
        break;
      default:
        this.notify.error(this.l10n.tVar(errorMsg));
        break;
    }
  }
}
