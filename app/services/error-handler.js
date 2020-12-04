import classic from 'ember-classic-decorator';
import Service from '@ember/service';

@classic
export default class ErrorHandlerService extends Service {

genericError(error) {
    const errorStatus =  parseInt(error.errors[0].status);
    if(errorStatus === 500) {
        return "There is an error error in server.";
    } else if (errorStatus === 403) {
        return "You are not authorized to access the page.";
    } else if (errorStatus === 400) {
        return "The server could not understand the request due to invalid syntax.";
    } else if(errorStatus === 401) {
        return "The client must authenticate itself to get the requested response."
    } else if(errorStatus === 405) {
        return "The request method is known by the server but has been disabled and cannot be used."
    } else if(errorStatus === 409) {
        return "This response is sent when a request conflicts with the current state of the server."
    } else if(errorStatus === 422) {
        return "Unprocessable Entity";
    } else if(errorStatus === 429) {
        return "Too many reuqests.";
    } else {
        return "Opps Something went wrong.";
    }
}
}