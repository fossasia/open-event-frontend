import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';

@classic
export default class SpeakersController extends Controller {
    queryParams = ['search'];
    search = null;
    preserveScrollPosition = true;
}
