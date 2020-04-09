import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class ViewRoute extends Route {
  templateName = 'admin/users/view';
}
