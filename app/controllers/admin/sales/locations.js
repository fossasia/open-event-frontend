import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import AdminSalesMixin from 'open-event-frontend/mixins/admin-sales';

@classic
export default class LocationsController extends Controller.extend(AdminSalesMixin) {}
