import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ExploreController extends Controller {
  queryParams = ['category', 'sub_category', 'event_type', 'start_date', 'end_date', 'location', 'ticket_type', 'cfs', 'event_name', 'is_online', 'must_have_logo', 'must_have_image'];
  event_name = null;
  is_online = null;
  must_have_logo = null;
  must_have_image = null;
  category = null;
  sub_category = null;
  event_type = null;
  start_date = null;
  end_date = null;
  location = null;
  ticket_type = null;
  cfs = null;

  @action
  shareEvent(event) {
    this.set('eventToShare', event);
    this.set('isShareModalOpen', true);
  }

  @action
  clearFilter(filterType) {
    if (filterType === 'event_name') {
      this.set('event_name', null);
    }
    if (filterType === 'is_online') {
      this.set('is_online', null);
    }
    if (filterType === 'must_have_logo') {
      this.set('must_have_logo', null);
    }
    if (filterType === 'must_have_image') {
      this.set('must_have_image', null);
    }
    if (filterType === 'start_date') {
      this.set('startDate', null);
    }
    if (filterType === 'end_date') {
      this.set('endDate', null);
    }
    if (filterType === 'category') {
      this.set('category', null);
    }
    if (filterType === 'sub_category') {
      this.set('sub_category', null);
    }
    if (filterType === 'event_type') {
      this.set('event_type', null);
    }
    if (filterType === 'location') {
      this.set('location', null);
    }
    if (filterType === 'ticket_type') {
      this.set('ticket_type', null);
    }
    if (filterType === 'cfs') {
      this.set('cfs', null);
    }
  }
}
