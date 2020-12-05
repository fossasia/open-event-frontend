import Service, { inject as service } from '@ember/service';

export default class ErrorHandlerService extends Service {

@service notify;

@service l10n;

genericError(error) {
    const errorStatus =  parseInt(error.errors[0].status);
    switch(errorStatus){
        case 403:
            this.notify.error(this.l10n.t("You are not authorized to access the page."));
            break;
        case 422:
            this.notify.error(this.l10n.t("Some required field is missing or is in wrong format."));
            break;
        case 429:
            this.notify.error(this.l10n.t("There are too many requests. Please try after sometime."));
            break;
        case 401:
            this.notify.error(this.l10n.t("User must be authenticated."));
            break;
        case 409: 
            this.notify.error(this.l10n.t("Oops there is a conflict error"));
            break;
        default:
            this.notify.error(this.l10n.t('Oops something went wrong. Please try again.'));
            break;
    }
}
}